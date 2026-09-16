import { useEffect, useState } from "react";
import { NAV, IDENTITY } from "../data/platform";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-[var(--line)] bg-[rgba(8,18,34,0.86)] backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${IDENTITY.name} — home`}>
          <span className="grid h-8 w-8 place-items-center rounded border border-[var(--orange-line)] bg-[var(--orange-soft)]">
            <span className="font-mono text-[12px] font-bold text-[var(--orange)]">M</span>
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-[var(--ink)] sm:block">
            {IDENTITY.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative font-mono text-[11.5px] uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--ink)] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[var(--orange)] after:transition-all hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded border border-[var(--orange-line)] bg-[var(--orange-soft)] px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.1em] text-[var(--orange)] transition-colors hover:bg-[rgba(255,107,53,0.18)] sm:inline-flex"
          >
            Contact
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded border border-[var(--line)] text-[var(--ink)] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="space-y-1.5">
              <span className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-b border-[var(--line)] bg-[rgba(8,18,34,0.97)] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-2">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--line-soft)] py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-soft)] last:border-0"
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
