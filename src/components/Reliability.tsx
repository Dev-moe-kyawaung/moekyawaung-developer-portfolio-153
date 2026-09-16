import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { LATENCY_SERIES, DEPLOY_SERIES, UPTIME_SERIES, SLOS, DORA, INCIDENTS } from "../data/platform";
import { SectionHeader } from "./ui";

const AXIS = { stroke: "rgba(120,165,215,0.18)" };
const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#0d1f36",
    border: "1px solid rgba(120,165,215,0.2)",
    borderRadius: 8,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
  },
  labelStyle: { color: "#eaf0f8" },
  itemStyle: { color: "#b9c8dc" },
};

function Card({
  title,
  meta,
  children,
  className = "",
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`panel ticks rounded-xl p-5 ${className}`}>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[14px] font-semibold text-[var(--ink)]">{title}</h3>
        {meta && <span className="font-mono text-[10px] text-[var(--muted)]">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

export function Reliability() {
  return (
    <section id="reliability" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="04"
          eyebrow="Reliability dashboard"
          title={<>Numbers I&apos;m <span className="accent">accountable</span> to.</>}
          desc="SLOs, latency, delivery cadence, and what incidents taught us. Sample data, presented the way I'd present it to a leadership review."
        />

        {/* ---- SLO strip ---- */}
        <div className="reveal mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SLOS.map((s) => (
            <div key={s.name} className="panel rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[12px] leading-snug text-[var(--ink-soft)]">{s.name}</span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--ok)]">met</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[20px] font-semibold text-[var(--ink)]">
                  {s.actual}
                  <span className="text-[12px] text-[var(--muted)]">{s.unit}</span>
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  target {s.target}{s.unit}
                </span>
              </div>
              {/* error-budget bar */}
              <div className="mt-3">
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
                  <span>error budget</span>
                  <span>{s.budget}% left</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[rgba(120,165,215,0.12)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.budget}%`,
                      background: s.budget > 50 ? "var(--ok)" : s.budget > 25 ? "var(--warn)" : "var(--orange)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- charts ---- */}
        <div className="grid gap-3 lg:grid-cols-3">
          <Card title="API latency percentiles" meta="12 weeks · ms" className="reveal lg:col-span-2">
            <div className="h-[230px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LATENCY_SERIES} margin={{ top: 5, right: 6, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g99" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff6b35" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#ff6b35" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g95" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ea8de" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#4ea8de" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,165,215,0.1)" vertical={false} />
                  <XAxis dataKey="week" axisLine={AXIS} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip {...TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="p99" stroke="#ff6b35" strokeWidth={2} fill="url(#g99)" />
                  <Area type="monotone" dataKey="p95" stroke="#4ea8de" strokeWidth={1.6} fill="url(#g95)" />
                  <Area type="monotone" dataKey="p50" stroke="#7d92ad" strokeWidth={1.2} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex gap-4 font-mono text-[10px] text-[var(--muted)]">
              <span><span className="mr-1.5 inline-block h-1.5 w-3 rounded-sm bg-[#ff6b35]" />p99</span>
              <span><span className="mr-1.5 inline-block h-1.5 w-3 rounded-sm bg-[#4ea8de]" />p95</span>
              <span><span className="mr-1.5 inline-block h-1.5 w-3 rounded-sm bg-[#7d92ad]" />p50</span>
            </div>
          </Card>

          <Card title="Uptime" meta="9 months · %" className="reveal reveal-d1">
            <div className="flex items-baseline gap-2">
              <span className="t-stat text-[var(--ok)]">99.98%</span>
              <span className="font-mono text-[10px] text-[var(--muted)]">trailing avg</span>
            </div>
            <div className="mt-3 h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={UPTIME_SERIES} margin={{ top: 5, right: 6, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,165,215,0.1)" vertical={false} />
                  <XAxis dataKey="m" axisLine={AXIS} tickLine={false} />
                  <YAxis domain={[99.9, 100]} axisLine={false} tickLine={false} />
                  <Tooltip {...TOOLTIP_STYLE} />
                  <Line type="monotone" dataKey="up" stroke="#4ade80" strokeWidth={2} dot={{ r: 2.5, fill: "#4ade80" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Deployment frequency" meta="12 weeks · deploys" className="reveal">
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEPLOY_SERIES} margin={{ top: 5, right: 6, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,165,215,0.1)" vertical={false} />
                  <XAxis dataKey="week" axisLine={AXIS} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip {...TOOLTIP_STYLE} cursor={{ fill: "rgba(255,107,53,0.07)" }} />
                  <Bar dataKey="deploys" fill="#ff6b35" radius={[3, 3, 0, 0]} maxBarSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="DORA metrics" meta="current quarter" className="reveal reveal-d1 lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DORA.map((d) => (
                <div key={d.label} className="rounded border border-[var(--line)] p-3">
                  <div className="font-display text-[16px] font-semibold text-[var(--ink)]">{d.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-[var(--muted)]">{d.label}</div>
                  <span className="mt-2 inline-block rounded border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.08)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ok)]">
                    {d.note}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ---- incident learnings ---- */}
        <div className="mt-10">
          <h3 className="reveal microlabel mb-4">Incident learnings — what changed afterwards</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {INCIDENTS.map((inc, i) => (
              <div key={inc.id} className={`reveal reveal-d${(i % 3) + 1} panel rounded-xl p-5`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--muted)]">{inc.id}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded border border-[var(--orange-line)] bg-[var(--orange-soft)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--orange)]">
                      {inc.severity}
                    </span>
                    <span className="font-mono text-[9.5px] text-[var(--muted)]">{inc.duration}</span>
                  </div>
                </div>
                <h4 className="mt-3 text-[14px] font-medium leading-snug text-[var(--ink)]">{inc.title}</h4>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{inc.learning}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="reveal mt-6 font-mono text-[10px] text-[var(--muted)]">
          All figures on this dashboard are illustrative sample data.
        </p>
      </div>
    </section>
  );
}
