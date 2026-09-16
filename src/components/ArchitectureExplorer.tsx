import { lazy, Suspense, useState } from "react";
import { ARCH_NODES, type ArchNode } from "../data/platform";
import { useEnv } from "../hooks/useEnv";
import { Chip } from "./ui";

// The WebGL scene is the heaviest asset on the page — load it on demand.
const IsoArchitecture = lazy(() => import("../scenes/IsoArchitecture"));

/* -------------------------------------------------------------------------
 * Architecture explorer
 *  · Desktop + motion allowed → interactive isometric 3D scene
 *  · Mobile / reduced-motion / no-WebGL → static blueprint card grid
 * Both paths share one selection state, one notes panel, and one keyboard
 * selector rail, so every visitor can reach identical content.
 * ----------------------------------------------------------------------- */

function NotesPanel({ node }: { node: ArchNode }) {
  return (
    <div className="panel ticks rounded-xl p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="microlabel">{node.kind}</span>
          <h3 className="t-h3 mt-1.5">{node.label}</h3>
        </div>
        <div className="text-right">
          <div className="font-display text-[17px] font-semibold text-[var(--orange)]">{node.metric.value}</div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {node.metric.label}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-[var(--ink-soft)]">{node.note}</p>

      <ul className="mt-4 space-y-2 border-t border-[var(--line-soft)] pt-4">
        {node.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-[12.5px] leading-relaxed text-[var(--muted)]">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[var(--orange)]" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {node.tech.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </div>
  );
}

/** Static fallback: the same topology as a readable blueprint card grid. */
function CardFallback({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="blueprint-grid rounded-xl border border-[var(--line)] p-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ARCH_NODES.map((n) => {
          const active = n.id === selectedId;
          return (
            <button
              key={n.id}
              onClick={() => onSelect(n.id)}
              aria-pressed={active}
              className={`rounded-lg border p-3 text-left transition-colors ${
                active
                  ? "border-[var(--orange-line)] bg-[var(--orange-soft)]"
                  : "border-[var(--line)] bg-[rgba(13,31,54,0.6)] hover:border-[var(--muted)]"
              }`}
            >
              <div
                className={`font-mono text-[10px] uppercase tracking-[0.12em] ${
                  active ? "text-[var(--orange)]" : "text-[var(--muted)]"
                }`}
              >
                {n.kind}
              </div>
              <div className="mt-1 text-[13px] font-medium text-[var(--ink)]">{n.label}</div>
              <div className="mt-0.5 text-[11px] leading-snug text-[var(--muted)]">{n.short}</div>
            </button>
          );
        })}
      </div>
      <p className="mt-3 px-1 font-mono text-[10px] text-[var(--muted)]">
        Static view — the interactive 3D model loads on larger screens with motion enabled.
      </p>
    </div>
  );
}

export function ArchitectureExplorer() {
  const env = useEnv();
  const [selectedId, setSelectedId] = useState<string>("services");
  const selected = ARCH_NODES.find((n) => n.id === selectedId) ?? ARCH_NODES[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
      {/* ---------------- viewport ---------------- */}
      <div>
        <div className="relative overflow-hidden rounded-xl border border-[var(--line)]">
          {/* blueprint backdrop is always present, behind the canvas */}
          <div className="blueprint-grid absolute inset-0" aria-hidden="true" />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, rgba(255,107,53,0.07), transparent 70%)",
            }}
          />

          {env.can3D ? (
            <div className="relative aspect-[16/11] w-full">
              <Suspense
                fallback={
                  <div className="absolute inset-0 grid place-items-center font-mono text-[11px] text-[var(--muted)]">
                    initialising model…
                  </div>
                }
              >
                <IsoArchitecture
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  animate={!env.reducedMotion}
                />
              </Suspense>

              {/* viewport chrome */}
              <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
                <span className="pulse h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  reference architecture · live
                </span>
              </div>
              <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9.5px] text-[var(--muted)]">
                click a component
              </div>
            </div>
          ) : (
            <div className="relative p-3">
              <CardFallback selectedId={selectedId} onSelect={setSelectedId} />
            </div>
          )}
        </div>

        {/* selector rail — keyboard + touch parity with clicking the 3D model */}
        <div className="mt-3" role="group" aria-label="Architecture components">
          <div className="flex flex-wrap gap-1.5">
            {ARCH_NODES.map((n) => {
              const active = n.id === selectedId;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  aria-pressed={active}
                  className={`rounded border px-2.5 py-1.5 font-mono text-[10.5px] transition-colors ${
                    active
                      ? "border-[var(--orange-line)] bg-[var(--orange-soft)] text-[var(--orange)]"
                      : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink-soft)]"
                  }`}
                >
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------- notes ---------------- */}
      <div aria-live="polite">
        <NotesPanel node={selected} />
      </div>
    </div>
  );
}
