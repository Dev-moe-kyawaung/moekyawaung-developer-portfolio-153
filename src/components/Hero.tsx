import { ArrowRight } from "lucide-react";
import { IDENTITY } from "../data/platform";
import { ArchitectureExplorer } from "./ArchitectureExplorer";
import { Chip } from "./ui";

const FOCUS = [
  "Mobile → Backend foundations",
  "Firebase · REST APIs · Platform thinking",
  "Security · Reliability · CI/CD",
  "AI / ML integrations",
];

export function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-32">
      <div
        className="blueprint-grid pointer-events-none absolute inset-x-0 top-0 h-[920px]"
        aria-hidden="true"
        style={{
          maskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px]"
        aria-hidden="true"
        style={{ background: "radial-gradient(60% 45% at 20% 10%, rgba(255,107,53,0.09), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* ---- copy ---- */}
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded border border-[var(--orange-line)] bg-[var(--orange-soft)] px-3 py-1.5">
                <span className="pulse h-1.5 w-1.5 rounded-full bg-[var(--orange)]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
                  {IDENTITY.availability}
                </span>
              </span>
              <span className="microlabel">{IDENTITY.role}</span>
            </div>

            <h1 className="t-display mt-7">
              {IDENTITY.headline.split("stay up")[0]}
              <span className="accent">stay up</span>
              {IDENTITY.headline.split("stay up")[1]}
            </h1>

            <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-[var(--ink-soft)]">
              {IDENTITY.positioning}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {IDENTITY.languages.map((lang) => (
                <Chip key={lang} tone="orange">{lang}</Chip>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#systems"
                className="group inline-flex items-center gap-2 rounded bg-[var(--orange)] px-5 py-3 font-mono text-[12px] uppercase tracking-[0.1em] font-semibold text-[#131313] transition-transform hover:-translate-y-0.5"
              >
                Selected systems
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#reliability"
                className="inline-flex items-center gap-2 rounded border border-[var(--line)] px-5 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-soft)] transition-colors hover:border-[var(--orange-line)] hover:text-[var(--orange)]"
              >
                Reliability record
              </a>
            </div>
          </div>

          {/* ---- profile card ---- */}
          <aside className="reveal panel ticks rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-[var(--orange-line)] bg-[var(--panel-2)] shrink-0">
                <img
                  src={IDENTITY.profileImage}
                  alt={IDENTITY.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <div className="font-display text-[20px] font-semibold leading-tight text-[var(--ink)]">
                  {IDENTITY.name}
                </div>
                <div className="mt-1 text-[13px] text-[var(--ink-soft)]">{IDENTITY.location}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--orange)]">
                  {IDENTITY.currentProject}
                </div>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-[var(--muted)]">
              {IDENTITY.philosophy} Building across Android, backend integrations, Firebase,
              security, and product systems — with a growing focus on scalable platform design.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {FOCUS.map((item) => (
                <div key={item} className="rounded border border-[var(--line)] bg-[rgba(8,18,34,0.45)] px-3 py-2 font-mono text-[10.5px] text-[var(--ink-soft)]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded border border-[var(--orange-line)] bg-[var(--orange-soft)] px-3 py-2.5">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--orange)]">credentials</div>
              <div className="mt-1 text-[12.5px] text-[var(--ink-soft)]">{IDENTITY.certifications}</div>
            </div>
          </aside>
        </div>

        <div id="architecture" className="mt-14 scroll-mt-24 md:mt-16">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-[var(--orange)]">01</span>
                <span className="h-px w-8 bg-[var(--orange-line)]" aria-hidden="true" />
                <span className="microlabel">Reference architecture</span>
              </div>
              <h2 className="t-h3 mt-3">A platform I&apos;d build today — explore any component.</h2>
            </div>
            <span className="hidden shrink-0 font-mono text-[10px] text-[var(--muted)] md:block">sample topology</span>
          </div>

          <ArchitectureExplorer />
        </div>
      </div>
    </section>
  );
}
