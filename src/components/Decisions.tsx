import { ADRS } from "../data/platform";
import { SectionHeader } from "./ui";

const STATUS_CLS: Record<string, string> = {
  Accepted: "border-[rgba(74,222,128,0.35)] bg-[rgba(74,222,128,0.08)] text-[var(--ok)]",
  Revisited: "border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.08)] text-[var(--warn)]",
  Superseded: "border-[var(--line)] bg-white/[0.02] text-[var(--muted)]",
};

export function Decisions() {
  return (
    <section id="decisions" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="03"
          eyebrow="Architecture decisions"
          title={<>The trade-off is the <span className="accent">decision.</span></>}
          desc="Lightweight ADRs from real platforms. Every one of these had a defensible alternative — that's what makes it a decision rather than a default."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {ADRS.map((adr, i) => (
            <article
              key={adr.id}
              className={`reveal reveal-d${(i % 3) + 1} panel ticks flex flex-col rounded-xl p-6`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--orange)]">{adr.id}</span>
                <span className={`rounded border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] ${STATUS_CLS[adr.status]}`}>
                  {adr.status}
                </span>
              </div>

              <h3 className="t-h3 mt-3 text-[17px] leading-snug">{adr.title}</h3>

              <dl className="mt-5 flex-1 space-y-3.5">
                <div>
                  <dt className="microlabel">Context</dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{adr.context}</dd>
                </div>
                <div>
                  <dt className="microlabel text-[var(--cyan)]">Decision</dt>
                  <dd className="mt-1 text-[13.5px] leading-relaxed text-[var(--ink-soft)]">{adr.decision}</dd>
                </div>
                <div>
                  <dt className="microlabel">Consequences</dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{adr.consequences}</dd>
                </div>
              </dl>

              <div className="mt-5 rounded border border-[var(--orange-line)] bg-[var(--orange-soft)] px-3 py-2.5">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--orange)]">
                  Trade-off
                </span>
                <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-[var(--ink-soft)]">
                  {adr.tradeoff}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
