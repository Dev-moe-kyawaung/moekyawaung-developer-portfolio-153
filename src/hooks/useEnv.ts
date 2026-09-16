import { useEffect, useState } from "react";

export type Env = {
  /** Desktop, fine pointer, WebGL available, motion allowed → mount the 3D explorer. */
  can3D: boolean;
  reducedMotion: boolean;
  isTouch: boolean;
};

function webgl(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function read(): Env {
  if (typeof window === "undefined") return { can3D: false, reducedMotion: false, isTouch: false };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const wide = window.innerWidth >= 900;
  const cores = (navigator.hardwareConcurrency ?? 8) >= 4;
  return {
    can3D: fine && !coarse && wide && !reduced && cores && webgl(),
    reducedMotion: reduced,
    isTouch: coarse && !fine,
  };
}

/** Capability detection for the architecture explorer. */
export function useEnv(): Env {
  const [env, setEnv] = useState<Env>(read);
  useEffect(() => {
    const update = () => setEnv(read());
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pt = window.matchMedia("(pointer: coarse)");
    rm.addEventListener("change", update);
    pt.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      rm.removeEventListener("change", update);
      pt.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return env;
}

/** Scroll reveal: adds `.in` to `.reveal` elements entering the viewport. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
