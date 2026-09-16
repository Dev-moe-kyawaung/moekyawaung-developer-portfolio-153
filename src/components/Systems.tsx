import { SYSTEMS } from "../data/platform";
import { SectionHeader, Chip } from "./ui";

export function Systems() {
  return (
    <section id="systems" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="02"
          eyebrow="Selected systems"
          title={<>Three problems worth <span className="accent">writing down.</span></>}
          desc="Context, constraint, and what actually shipped — including the parts that were unglamorous on purpose."
        />

        <div className="space-y-4">
          {SYSTEMS.map((s, i) => (
            <article
              key={s.id}
              className={`reveal reveal-d${(i % 3) + 1} panel ticks rounded-xl p-6 md:p-8`}
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr] lg:gap-10">
                {/* left: identity + outcomes */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10.5px] text-[var(--orange)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="microlabel">{s.window}</span>
                  </div>
                  <h3 className="t-h3 mt-3">{s.name}</h3>
                  <p className="mt-1.5 font-mono text-[11px] text-[var(--cyan)]">{s.role}</p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {s.outcome.map((o) => (
                      <div key={o.label} className="rounded border border-[var(--line)] bg-[rgba(255,107,53,0.05)] p-2.5">
                        <div className="font-display text-[15px] font-semibold text-[var(--orange)]">{o.value}</div>
                        <div className="mt-0.5 font-mono text-[9px] uppercase leading-tight tracking-[0.06em] text-[var(--muted)]">
                          {o.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.stack.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>

                {/* right: narrative */}
                <div className="space-y-4">
                  <div>
                    <h4 className="microlabel">Context</h4>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--muted)]">{s.context}</p>
                  </div>
                  <div>
                    <h4 className="microlabel text-[var(--orange)]">The problem</h4>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ink-soft)]">{s.problem}</p>
                  </div>
                  <div>
                    <h4 className="microlabel">Approach</h4>
                    <ul className="mt-2 space-y-2">
                      {s.approach.map((a, k) => (
                        <li key={k} className="flex gap-3 text-[13.5px] leading-relaxed text-[var(--ink-soft)]">
                          <span className="mt-0.5 font-mono text-[10px] text-[var(--orange)]">
                            {String(k + 1).padStart(2, "0")}
                          </span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
