import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { ARCH_NODES, ARCH_EDGES, type ArchNode } from "../data/platform";

/* ---------------------------------------------------------------------------
 * Interactive isometric cloud-architecture scene.
 * Low-poly by design: 7 rounded boxes, 8 lines, 8 flow dots, one grid.
 * Labels are DOM (drei <Html>) so they stay crisp and legible at any zoom.
 * Only mounted when the environment supports it — see useEnv().can3D.
 * ------------------------------------------------------------------------- */

const ORANGE = "#ff6b35";
const KIND_COLOR: Record<string, string> = {
  client: "#4ea8de",
  edge: ORANGE,
  compute: ORANGE,
  cache: "#6f9fcc",
  async: "#6f9fcc",
  data: "#8db6dc",
  observe: "#4ea8de",
};

/** Convert a node's grid position into a world vector at a given height. */
function nodeVec(n: ArchNode, y: number) {
  return new THREE.Vector3(n.pos[0], y, n.pos[1]);
}

function Node({
  node,
  selected,
  hovered,
  onSelect,
  onHover,
  animate,
}: {
  node: ArchNode;
  selected: boolean;
  hovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const base = KIND_COLOR[node.kind] ?? "#6f9fcc";
  const active = selected || hovered;
  const color = selected ? ORANGE : base;

  useFrame((state, delta) => {
    if (!group.current) return;
    // lift the node slightly when active; ease back when not
    const targetY = active ? 0.34 : 0;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 6, delta);
    if (animate && selected) {
      // very subtle breathing on the selected node only
      const t = state.clock.elapsedTime;
      group.current.position.y += Math.sin(t * 2) * 0.012;
    }
  });

  return (
    <group ref={group} position={[node.pos[0], 0, node.pos[1]]}>
      {/* pedestal plate — reads as a footprint on the blueprint */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.85, 1.85]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.2 : 0.07} />
      </mesh>

      {/* the block */}
      <RoundedBox
        args={[1.25, node.h, 1.25]}
        radius={0.09}
        smoothness={3}
        position={[0, node.h / 2 + 0.03, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "";
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 0.55 : hovered ? 0.3 : 0.12}
          roughness={0.42}
          metalness={0.25}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* crown line — a drafting highlight on the top face */}
      <mesh position={[0, node.h + 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.52, 0.6, 4]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.85 : 0.35} />
      </mesh>

      {/* DOM label — crisp at every zoom, and mirrors the accessible list */}
      <Html position={[0, node.h + 0.62, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div
          className="select-none whitespace-nowrap text-center"
          style={{ transform: "translateY(-4px)" }}
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: selected ? ORANGE : "#cfdcec", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
          >
            {node.label}
          </div>
          {active && (
            <div className="mt-0.5 font-mono text-[9px]" style={{ color: "#8aa3bf" }}>
              {node.metric.value}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function Edges({ animate, selectedId }: { animate: boolean; selectedId: string | null }) {
  const byId = useMemo(() => Object.fromEntries(ARCH_NODES.map((n) => [n.id, n])), []);
  const segments = useMemo(
    () =>
      ARCH_EDGES.map(([a, b]) => {
        const na = byId[a];
        const nb = byId[b];
        const from = nodeVec(na, na.h * 0.55);
        const to = nodeVec(nb, nb.h * 0.55);
        return { a, b, from, to };
      }),
    [byId]
  );

  return (
    <group>
      {segments.map((s, i) => {
        const lit = selectedId === s.a || selectedId === s.b;
        return (
          <Line
            key={i}
            points={[s.from, s.to]}
            color={lit ? ORANGE : "#3f6d99"}
            lineWidth={lit ? 1.8 : 1}
            transparent
            opacity={lit ? 0.9 : 0.42}
            dashed={false}
          />
        );
      })}
      {animate && <FlowDots segments={segments} selectedId={selectedId} />}
    </group>
  );
}

function FlowDots({
  segments,
  selectedId,
}: {
  segments: { a: string; b: string; from: THREE.Vector3; to: THREE.Vector3 }[];
  selectedId: string | null;
}) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    segments.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      // stagger each dot so traffic looks continuous rather than synchronised
      const p = (t * 0.32 + i * 0.17) % 1;
      m.position.lerpVectors(s.from, s.to, p);
      const lit = selectedId === s.a || selectedId === s.b;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = lit ? 1 : 0.55;
    });
  });

  return (
    <>
      {segments.map((s, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <sphereGeometry args={[0.062, 8, 8]} />
          <meshBasicMaterial
            color={selectedId === s.a || selectedId === s.b ? ORANGE : "#7fc4f5"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  );
}

/** Blueprint ground plane + grid. */
function Ground() {
  return (
    <group position={[0, -0.02, 0]}>
      <gridHelper args={[40, 40, "#24486e", "#152b45"]} />
    </group>
  );
}

/** Gentle pointer parallax on the whole model (skipped when motion is reduced). */
function Rig({ animate, children }: { animate: boolean; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Aim the isometric camera at the centre of the model once on mount.
  useEffect(() => {
    camera.lookAt(0, 0.3, 0);
  }, [camera]);

  useFrame((state, delta) => {
    if (!group.current || !animate) return;
    const tx = state.pointer.x * 0.12;
    const ty = -state.pointer.y * 0.06;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, tx, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, ty, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

export default function IsoArchitecture({
  selectedId,
  onSelect,
  animate = true,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  animate?: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Canvas
      orthographic
      camera={{ position: [11, 9, 11], zoom: 68, near: -100, far: 200 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 10, 4]} intensity={1.1} />
      <directionalLight position={[-6, 5, -6]} intensity={0.35} color="#4ea8de" />

      <Rig animate={animate}>
        <Ground />
        <Edges animate={animate} selectedId={selectedId} />
        {ARCH_NODES.map((n) => (
          <Node
            key={n.id}
            node={n}
            selected={selectedId === n.id}
            hovered={hovered === n.id}
            onSelect={onSelect}
            onHover={setHovered}
            animate={animate}
          />
        ))}
      </Rig>
    </Canvas>
  );
}
