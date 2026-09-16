import { LEADERSHIP } from "../data/platform";
import { SectionHeader } from "./ui";

export function Leadership() {
  return (
    <section id="leadership" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="05"
          eyebrow="Technical leadership"
          title={<>Platform work is a <span className="accent">people</span> problem.</>}
          desc="The systems only stay reliable if the team around them is growing, aligned, and able to move without asking permission."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {LEADERSHIP.map((l, i) => (
            <div key={l.index} className={`reveal reveal-d${(i % 3) + 1} panel ticks flex flex-col rounded-xl p-6`}>
              <span className="font-mono text-[10.5px] tracking-[0.16em] text-[var(--orange)]">{l.index}</span>
              <h3 className="t-h3 mt-3">{l.title}</h3>
              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-[var(--muted)]">{l.desc}</p>
              <ul className="mt-5 space-y-2 border-t border-[var(--line-soft)] pt-4">
                {l.points.map((p) => (
                  <li key={p} className="flex gap-2.5 font-mono text-[11.5px] leading-relaxed text-[var(--ink-soft)]">
                    <span className="text-[var(--orange)]">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
