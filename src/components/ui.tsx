import type { ReactNode } from "react";

export function SectionHeader({
  index,
  eyebrow,
  title,
  desc,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
}) {
  return (
    <div className="reveal mb-10 md:mb-14 max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10.5px] tracking-[0.18em] text-[var(--orange)]">{index}</span>
        <span className="h-px w-8 bg-[var(--orange-line)]" aria-hidden="true" />
        <span className="microlabel">{eyebrow}</span>
      </div>
      <h2 className="t-h2 mt-4">{title}</h2>
      {desc && <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">{desc}</p>}
    </div>
  );
}

export function Panel({
  children,
  className = "",
  ticks,
}: {
  children: ReactNode;
  className?: string;
  ticks?: boolean;
}) {
  return (
    <div className={`panel shadow-card rounded-xl ${ticks ? "ticks" : ""} ${className}`}>{children}</div>
  );
}

export function Chip({ children, tone = "line" }: { children: ReactNode; tone?: "line" | "orange" | "cyan" }) {
  const cls =
    tone === "orange"
      ? "border-[var(--orange-line)] bg-[var(--orange-soft)] text-[var(--orange)]"
      : tone === "cyan"
      ? "border-[rgba(78,168,222,0.3)] bg-[rgba(78,168,222,0.08)] text-[var(--cyan)]"
      : "border-[var(--line)] bg-white/[0.02] text-[var(--muted)]";
  return (
    <span className={`inline-flex items-center rounded border px-2.5 py-1 font-mono text-[10.5px] leading-none ${cls}`}>
      {children}
    </span>
  );
}

export function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="panel ticks rounded-xl p-5">
      <div className="t-stat">{value}</div>
      <div className="mt-2 text-[12.5px] leading-snug text-[var(--ink-soft)]">{label}</div>
      {sub && <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{sub}</div>}
    </div>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function GithubMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.66.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
