import { IMPACT } from "../data/platform";
import { StatCard } from "./ui";

export function Impact() {
  return (
    <section aria-label="Impact metrics" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal rule mb-8" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {IMPACT.map((m, i) => (
            <div key={m.label} className={`reveal reveal-d${(i % 3) + 1}`}>
              <StatCard value={m.value} label={m.label} sub={m.sub} />
            </div>
          ))}
        </div>
        <p className="reveal mt-4 font-mono text-[10px] text-[var(--muted)]">
          Sample metrics shown for demonstration — replace with your own verified numbers.
        </p>
      </div>
    </section>
  );
}
