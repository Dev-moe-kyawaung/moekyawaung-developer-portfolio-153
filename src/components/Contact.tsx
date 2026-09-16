import { Mail, Phone } from "lucide-react";
import { IDENTITY, NAV } from "../data/platform";
import { ArrowUpRight, GithubMark, LinkedinMark } from "./ui";

const CHANNELS = [
  { label: "Email", value: IDENTITY.email, href: `mailto:${IDENTITY.email}`, Icon: Mail },
  { label: "Phone", value: IDENTITY.phone, href: `tel:${IDENTITY.phone.replace(/\s+/g, "")}`, Icon: Phone },
  { label: "GitHub", value: "Dev-moe-kyawaung", href: IDENTITY.github, Icon: GithubMark },
  { label: "LinkedIn", value: "moe-kyaw-aung-2653093a1", href: IDENTITY.linkedin, Icon: LinkedinMark },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal panel ticks relative overflow-hidden rounded-xl p-7 md:p-12">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
            aria-hidden="true"
            style={{ background: "radial-gradient(circle, rgba(255,107,53,0.16), transparent 70%)" }}
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-[var(--orange)]">07</span>
                <span className="h-px w-8 bg-[var(--orange-line)]" aria-hidden="true" />
                <span className="microlabel">Contact</span>
              </div>
              <h2 className="t-h2 mt-4">Let&apos;s talk about scale, systems, and what you&apos;re building next.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--ink-soft)]">
                I&apos;m open to senior and staff engineering opportunities across backend,
                platform, mobile infrastructure, and secure product systems. If the work needs
                reliability, architecture clarity, and long-term maintainability, I&apos;d love to talk.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-[var(--muted)]">
                <span>{IDENTITY.location}</span>
                <span className="text-[var(--ok)]">● {IDENTITY.availability}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {CHANNELS.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" || label === "Phone" ? undefined : "_blank"}
                  rel={label === "Email" || label === "Phone" ? undefined : "noreferrer"}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-[var(--line)] bg-[rgba(8,18,34,0.5)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--orange-line)] hover:bg-[var(--orange-soft)]"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded border border-[var(--line)]">
                      <Icon className="h-4 w-4 text-[var(--orange)]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--muted)]">
                        {label}
                      </span>
                      <span className="block truncate text-[13.5px] text-[var(--ink)]">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="py-10">
          <div className="rule mb-6" />
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="text-center md:text-left">
              <span className="font-display text-[14px] font-semibold text-[var(--ink)]">{IDENTITY.name}</span>
              <p className="mt-1 font-mono text-[10px] text-[var(--muted)]">
                © 2026 · {IDENTITY.role} · sample metrics + personalized profile links
              </p>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </section>
  );
}
