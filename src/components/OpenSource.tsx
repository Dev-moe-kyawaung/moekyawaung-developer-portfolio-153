import { OSS, WRITING, IDENTITY } from "../data/platform";
import { SectionHeader, ArrowUpRight, GithubMark } from "./ui";

export function OpenSource() {
  return (
    <section id="writing" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="06"
          eyebrow="Open source & writing"
          title={<>Proof of work, profiles, and <span className="accent">public traces.</span></>}
          desc="Selected repositories, current builds, and profile surfaces that show how I publish, experiment, and keep learning in public."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <h3 className="microlabel mb-3">Selected repositories</h3>
            <div className="space-y-3">
              {OSS.map((r, i) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`reveal reveal-d${(i % 3) + 1} panel group block rounded-xl p-5 transition-colors hover:border-[var(--orange-line)]`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 font-mono text-[13px] font-medium text-[var(--ink)] group-hover:text-[var(--orange)]">
                      <GithubMark className="h-3.5 w-3.5 text-[var(--muted)]" />
                      {r.name}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{r.desc}</p>
                  <div className="mt-3 flex items-center gap-4 font-mono text-[10.5px] text-[var(--muted)]">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: r.lang === "Go" ? "#00add8" : r.lang === "Rust" ? "#dea584" : r.lang === "Kotlin" ? "#7f52ff" : "#3178c6" }}
                      />
                      {r.lang}
                    </span>
                    <span>★ {r.stars.toLocaleString()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="microlabel mb-3">Profiles, writing & live surfaces</h3>
            <div className="panel rounded-xl">
              {WRITING.map((w, i) => (
                <a
                  key={w.title}
                  href={w.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center gap-4 border-b border-[var(--line-soft)] p-4 transition-colors last:border-0 hover:bg-[rgba(255,107,53,0.05)] ${i === 0 ? "rounded-t-xl" : ""}`}
                >
                  <span className="w-16 shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--orange)]">
                    {w.type}
                  </span>
                  <span className="flex-1 text-[13.5px] leading-snug text-[var(--ink-soft)] group-hover:text-[var(--ink)]">
                    {w.title}
                  </span>
                  <span className="hidden shrink-0 font-mono text-[10px] text-[var(--muted)] sm:block">{w.venue}</span>
                  <span className="shrink-0 font-mono text-[10px] text-[var(--muted)]">{w.year}</span>
                </a>
              ))}
            </div>

            <div className="reveal mt-4 rounded-xl border border-[var(--line)] bg-[rgba(8,18,34,0.45)] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--orange)]">extended profile</div>
              <a
                href={IDENTITY.gravatar}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-between gap-3 text-[13px] text-[var(--ink)] hover:text-[var(--orange)]"
              >
                <span>Gravatar profile & connected social accounts</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
