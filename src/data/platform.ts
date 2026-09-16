/* ==========================================================================
 *  PLATFORM PORTFOLIO — single source of truth
 *  All content below is SAMPLE DATA, clearly labelled. Replace with your own.
 *  Every section (hero, architecture explorer, case studies, ADRs, reliability
 *  dashboard, leadership, OSS/writing, contact) reads from this file.
 * ======================================================================== */

/* -------------------------------- identity -------------------------------- */
export const IDENTITY = {
  name: "မိုးကျော်အောင် · Moe Kyaw Aung",
  role: "Senior Backend & Platform Engineer",
  headline: "I design platforms that stay up when everything else doesn't.",
  positioning:
    "Senior engineer focused on high-scale reliability, secure APIs, and platform systems that help product teams move faster. My background spans Android, backend integrations, Firebase, REST APIs, CI/CD, and the distributed-system thinking needed to grow those foundations into dependable platforms.",
  availability: "Open to Senior / Staff platform roles",
  location: "Tachileik, Myanmar 🇲🇲 ↔ Bangkok, Thailand 🇹🇭",
  email: "hello@moekyawaung.dev",
  github: "https://github.com/Dev-moe-kyawaung",
  linkedin: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1",
  resumeUrl: "#contact",
  phone: "+95 9 889 000 889",
  profileImage: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  gravatar: "https://gravatar.com/moekyawaung13721",
  currentProject: "MoekyawTranslator — AI Translation App",
  certifications: "40+ certs · Google Developers Launchpad · Programming Hub collections",
  philosophy: "Code with culture. Build with purpose.",
  languages: ["Burmese 🇲🇲", "English 🌐", "Kotlin ☕"],
};

export const NAV = [
  { label: "Architecture", href: "#architecture" },
  { label: "Systems", href: "#systems" },
  { label: "Decisions", href: "#decisions" },
  { label: "Reliability", href: "#reliability" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------ impact metrics ----------------------------- */
export const IMPACT = [
  { value: "10+", label: "years in production systems", sub: "backend · platform · SRE" },
  { value: "1.2B", label: "requests / day at peak", sub: "sample metric" },
  { value: "99.98%", label: "platform availability", sub: "trailing 12 months" },
  { value: "-46%", label: "infra cost per transaction", sub: "over 3 quarters" },
];

/* =======================  ARCHITECTURE EXPLORER  ==========================
 * Positions are on an isometric grid (x = left→right, z = back→front).
 * `note` fields are the engineering notes revealed on click.
 * ======================================================================== */
export type NodeKind = "client" | "edge" | "compute" | "async" | "cache" | "data" | "observe";

export type ArchNode = {
  id: string;
  label: string;
  short: string;
  kind: NodeKind;
  /** [x, z] on the iso grid; height is derived from `h` */
  pos: [number, number];
  h: number;
  primary?: boolean;
  tech: string[];
  note: string;
  bullets: string[];
  metric: { value: string; label: string };
};

export const ARCH_NODES: ArchNode[] = [
  {
    id: "client",
    label: "Client apps",
    short: "Web · mobile · partner SDKs",
    kind: "client",
    pos: [-5.2, 0.2],
    h: 0.7,
    tech: ["TypeScript", "gRPC-Web", "OpenAPI"],
    note:
      "Three first-party surfaces and a partner SDK all speak to one versioned contract. Clients never talk to services directly — that boundary is what lets the backend change shape without a coordinated release.",
    bullets: [
      "Contract-first: OpenAPI + protobuf generate typed clients in CI.",
      "Backwards compatibility enforced by a schema-diff gate on every PR.",
      "Client-side retry budgets prevent stampedes when the edge degrades.",
    ],
    metric: { value: "4", label: "client surfaces on one contract" },
  },
  {
    id: "edge",
    label: "API gateway",
    short: "Auth · routing · rate limits",
    kind: "edge",
    pos: [-2.3, 0.2],
    h: 0.95,
    primary: true,
    tech: ["Envoy", "OPA", "JWT", "mTLS"],
    note:
      "The gateway is the only public surface. It terminates TLS, authenticates, authorises via policy-as-code, and enforces per-tenant quotas before a request ever reaches a service.",
    bullets: [
      "OPA policy bundles ship independently of services — security fixes in minutes.",
      "Per-tenant token buckets stop one noisy customer degrading the fleet.",
      "mTLS inside the mesh; no service trusts a caller by network position alone.",
    ],
    metric: { value: "p99 12ms", label: "gateway overhead" },
  },
  {
    id: "services",
    label: "Microservices",
    short: "Bounded contexts · gRPC",
    kind: "compute",
    pos: [0.8, 0],
    h: 1.15,
    primary: true,
    tech: ["Go", "gRPC", "Kubernetes", "Temporal"],
    note:
      "Eleven services split along bounded contexts, not org chart. Each owns its data, exposes gRPC internally, and is deployable independently behind flags.",
    bullets: [
      "Ownership model: one team, one service, one on-call rotation.",
      "Long-running flows run on Temporal — no hand-rolled saga state machines.",
      "Every service ships with SLOs, dashboards, and runbooks from the template.",
    ],
    metric: { value: "11", label: "independently deployable services" },
  },
  {
    id: "cache",
    label: "Cache tier",
    short: "Read-through · tenant-scoped",
    kind: "cache",
    pos: [0.8, -3.0],
    h: 0.65,
    tech: ["Redis Cluster", "Ristretto"],
    note:
      "A two-level cache: in-process for hot keys, Redis for the shared tier. The hard part was never speed — it was invalidation we could reason about.",
    bullets: [
      "Versioned cache keys per tenant; writes bump the version, no fan-out purge.",
      "Negative caching with jittered TTLs to blunt thundering herds.",
      "Cache is an optimisation, never a source of truth — every path works cold.",
    ],
    metric: { value: "94%", label: "hit rate, steady state" },
  },
  {
    id: "queue",
    label: "Event backbone",
    short: "Durable · exactly-once effects",
    kind: "async",
    pos: [0.8, 3.0],
    h: 0.7,
    tech: ["Kafka", "Schema Registry", "CDC"],
    note:
      "Everything that doesn't need an answer right now becomes an event. The backbone decouples write paths from the slow, chatty, failure-prone work behind them.",
    bullets: [
      "Idempotency keys + a dedupe table give exactly-once *effects* on at-least-once delivery.",
      "Schema registry with compatibility checks — a bad producer can't break consumers.",
      "Dead-letter queues are triaged weekly, not silently accumulated.",
    ],
    metric: { value: "180k/s", label: "sustained event throughput" },
  },
  {
    id: "database",
    label: "Data layer",
    short: "Primary · replicas · OLAP",
    kind: "data",
    pos: [3.9, 1.6],
    h: 1.0,
    tech: ["PostgreSQL", "Vitess", "ClickHouse"],
    note:
      "Sharded Postgres for transactional truth, read replicas for scale-out reads, ClickHouse for analytics. Migrations are online, reversible, and boring by design.",
    bullets: [
      "Expand/contract migrations only — no lock-the-table deploys, ever.",
      "Row-level tenancy plus per-tenant encryption keys for isolation.",
      "PITR tested by monthly restore drills, not assumed from a config flag.",
    ],
    metric: { value: "< 90s", label: "verified restore drill" },
  },
  {
    id: "observe",
    label: "Observability",
    short: "Traces · metrics · SLOs",
    kind: "observe",
    pos: [3.9, -1.9],
    h: 0.85,
    tech: ["OpenTelemetry", "Prometheus", "Grafana", "Loki"],
    note:
      "One trace-id joins logs, metrics, and traces. If an engineer needs three tabs and a guess to answer 'why is this slow', the platform has failed them.",
    bullets: [
      "OTel auto-instrumentation in the service template — observability is opt-out.",
      "Alerts fire on SLO burn rate, not raw CPU — pages correlate with user pain.",
      "Every incident produces a dashboard change or it isn't finished.",
    ],
    metric: { value: "-63%", label: "mean time to detect" },
  },
];

/** Directed connections between nodes for the isometric explorer. */
export const ARCH_EDGES: [string, string][] = [
  ["client", "edge"],
  ["edge", "services"],
  ["services", "cache"],
  ["services", "queue"],
  ["services", "database"],
  ["queue", "database"],
  ["services", "observe"],
  ["edge", "observe"],
];

/* ------------------------------ case studies ------------------------------ */
export type System = {
  id: string;
  name: string;
  role: string;
  window: string;
  context: string;
  problem: string;
  approach: string[];
  outcome: { value: string; label: string }[];
  stack: string[];
};

export const SYSTEMS: System[] = [
  {
    id: "meridian",
    name: "Meridian — multi-region write path",     // TODO: replace
    role: "Tech lead · 6 engineers",
    window: "2024 – 2025",
    context:
      "A payments platform pinned to a single region. One cloud AZ event meant a full outage, and regulators were asking pointed questions about recovery objectives.",
    problem:
      "Move to active-active across two regions without a rewrite, without double-charging anyone, and without a maintenance window the business would never approve.",
    approach: [
      "Introduced a per-tenant home region with async replication and explicit, testable failover — not magic multi-master.",
      "Made every write idempotent behind a request key so retries across regions could never double-apply.",
      "Built a failover game-day harness; we practised the switch monthly until it was boring.",
    ],
    outcome: [
      { value: "38s", label: "regional failover, measured" },
      { value: "0", label: "double-charge incidents" },
      { value: "99.99%", label: "availability post-migration" },
    ],
    stack: ["Go", "PostgreSQL", "Vitess", "Kafka", "Kubernetes", "Terraform"],
  },
  {
    id: "atlas",
    name: "Atlas — event backbone replatform",       // TODO: replace
    role: "Staff engineer · cross-team",
    window: "2023 – 2024",
    context:
      "Nine teams had grown nine different ways of doing async work: cron tables, ad-hoc webhooks, and three incompatible queue wrappers. Debugging a flow meant reading nine codebases.",
    problem:
      "Consolidate onto one event backbone that teams would actually adopt, while a business-critical batch pipeline kept running untouched.",
    approach: [
      "Shipped a paved-road client library first — adoption came from it being easier, not mandated.",
      "Schema registry with CI compatibility gates so producers can't break downstream consumers.",
      "Migrated flows one at a time behind dual-write + shadow-read verification.",
    ],
    outcome: [
      { value: "9 → 1", label: "async patterns in the org" },
      { value: "180k/s", label: "sustained throughput" },
      { value: "-71%", label: "async-related incidents" },
    ],
    stack: ["Kafka", "Go", "Protobuf", "Temporal", "OpenTelemetry"],
  },
  {
    id: "sentry",
    name: "Sentinel — zero-trust service mesh",       // TODO: replace
    role: "Senior engineer · platform + security",
    window: "2022 – 2023",
    context:
      "Internal services trusted each other by network position. A single compromised pod would have had a very good day, and an audit was three months out.",
    problem:
      "Introduce workload identity and least-privilege service-to-service auth across 40+ deployments without stalling every product team for a quarter.",
    approach: [
      "Rolled out mTLS in permissive mode first, measured real traffic, then enforced per-namespace.",
      "Moved authorisation to policy-as-code (OPA) so security could ship rules without a service release.",
      "Automated certificate rotation — the failure mode of manual rotation is always an outage at 3am.",
    ],
    outcome: [
      { value: "100%", label: "internal traffic on mTLS" },
      { value: "0", label: "rollout-caused incidents" },
      { value: "< 5min", label: "policy change to enforced" },
    ],
    stack: ["Envoy", "OPA", "SPIFFE", "Kubernetes", "Vault"],
  },
];

/* --------------------------- architecture decisions ------------------------ */
export type ADR = {
  id: string;
  title: string;
  status: "Accepted" | "Superseded" | "Revisited";
  context: string;
  decision: string;
  consequences: string;
  tradeoff: string;
};

export const ADRS: ADR[] = [
  {
    id: "ADR-014",
    title: "Exactly-once effects over exactly-once delivery",
    status: "Accepted",
    context:
      "Teams kept asking for exactly-once delivery from the broker. It doesn't exist in the way people mean, and pretending it does pushes correctness bugs into the future.",
    decision:
      "Accept at-least-once delivery. Make every consumer idempotent with a request key and a dedupe table scoped to the tenant.",
    consequences:
      "Consumers carry a little more state and a dedupe write. In exchange, retries, replays, and rebalances stop being incidents.",
    tradeoff: "Slightly higher write cost per event · dramatically simpler failure reasoning",
  },
  {
    id: "ADR-021",
    title: "Sharded Postgres instead of a distributed SQL engine",
    status: "Accepted",
    context:
      "We needed horizontal write scale. The obvious move was a NewSQL engine, but our team's operational depth was overwhelmingly in Postgres.",
    decision:
      "Shard Postgres with Vitess-style routing, keeping the operational model, tooling, and mental model the team already had.",
    consequences:
      "Cross-shard transactions are constrained and we design around them. On-call stays effective because nobody is learning a new database during an incident.",
    tradeoff: "Less elegant distributed semantics · far lower operational risk",
  },
  {
    id: "ADR-027",
    title: "SLO burn-rate alerts, not resource alerts",
    status: "Revisited",
    context:
      "Pager volume was high and trust was low. Most pages were CPU or memory thresholds that no user ever felt.",
    decision:
      "Alert on multi-window SLO burn rate. Resource metrics stay on dashboards for diagnosis but never page.",
    consequences:
      "Page volume dropped sharply and every remaining page correlates with real user impact. Revisited in 2025 to add a slow-burn ticket tier.",
    tradeoff: "Some slow degradations surface later · on-call trust restored",
  },
  {
    id: "ADR-033",
    title: "Paved road over platform mandate",
    status: "Accepted",
    context:
      "A previous platform rollout was mandated top-down, widely resented, and quietly worked around by half the org.",
    decision:
      "Ship the platform as a genuinely better default — templates, libraries, and docs — and let adoption be voluntary until it's the obvious choice.",
    consequences:
      "Adoption took two quarters instead of one, but it stuck, and teams contributed improvements back instead of routing around us.",
    tradeoff: "Slower initial adoption · durable, willing adoption",
  },
];

/* --------------------------- reliability dashboard ------------------------- */
/** SAMPLE DATA — 12 weeks of p50/p95/p99 API latency in milliseconds. */
export const LATENCY_SERIES = [
  { week: "W1", p50: 42, p95: 180, p99: 410 },
  { week: "W2", p50: 44, p95: 186, p99: 425 },
  { week: "W3", p50: 41, p95: 172, p99: 388 },
  { week: "W4", p50: 55, p95: 240, p99: 610 },
  { week: "W5", p50: 39, p95: 165, p99: 352 },
  { week: "W6", p50: 37, p95: 158, p99: 331 },
  { week: "W7", p50: 36, p95: 151, p99: 318 },
  { week: "W8", p50: 35, p95: 148, p99: 305 },
  { week: "W9", p50: 34, p95: 142, p99: 290 },
  { week: "W10", p50: 33, p95: 139, p99: 281 },
  { week: "W11", p50: 32, p95: 134, p99: 268 },
  { week: "W12", p50: 31, p95: 130, p99: 259 },
];

/** SAMPLE DATA — deployments per week across the platform. */
export const DEPLOY_SERIES = [
  { week: "W1", deploys: 38 }, { week: "W2", deploys: 41 }, { week: "W3", deploys: 44 },
  { week: "W4", deploys: 29 }, { week: "W5", deploys: 52 }, { week: "W6", deploys: 58 },
  { week: "W7", deploys: 61 }, { week: "W8", deploys: 66 }, { week: "W9", deploys: 71 },
  { week: "W10", deploys: 74 }, { week: "W11", deploys: 78 }, { week: "W12", deploys: 83 },
];

/** SAMPLE DATA — uptime sparkline, % per month. */
export const UPTIME_SERIES = [
  { m: "Apr", up: 99.99 }, { m: "May", up: 99.97 }, { m: "Jun", up: 99.99 },
  { m: "Jul", up: 99.94 }, { m: "Aug", up: 99.99 }, { m: "Sep", up: 100 },
  { m: "Oct", up: 99.98 }, { m: "Nov", up: 99.99 }, { m: "Dec", up: 99.99 },
];

export const SLOS = [
  { name: "API availability", target: 99.95, actual: 99.98, budget: 41, unit: "%" },
  { name: "Checkout p99 latency", target: 500, actual: 259, budget: 78, unit: "ms" },
  { name: "Event delivery freshness", target: 60, actual: 18, budget: 86, unit: "s" },
  { name: "Job success rate", target: 99.9, actual: 99.94, budget: 62, unit: "%" },
];

export const DORA = [
  { label: "Deployment frequency", value: "83 / week", note: "elite" },
  { label: "Lead time for change", value: "2.4 hrs", note: "elite" },
  { label: "Change failure rate", value: "3.1%", note: "elite" },
  { label: "Mean time to restore", value: "18 min", note: "elite" },
];

export const INCIDENTS = [
  {
    id: "INC-2418",
    title: "Cache stampede after a routine deploy",
    severity: "SEV-2",
    duration: "31 min",
    learning:
      "A cold cache plus synchronised TTLs meant every pod requested the same keys at once. We added TTL jitter and a single-flight guard — and made cold-start load a standing item in load tests.",
  },
  {
    id: "INC-2506",
    title: "Slow consumer created unbounded lag",
    severity: "SEV-3",
    duration: "2 hr 10 min",
    learning:
      "One consumer's p99 regression quietly built a six-hour backlog because we alerted on error rate, not lag. Consumer lag is now a first-class SLI with its own burn-rate alert.",
  },
  {
    id: "INC-2533",
    title: "Migration lock during peak traffic",
    severity: "SEV-2",
    duration: "12 min",
    learning:
      "An index build took a lock we assumed it wouldn't. Every migration now runs through an expand/contract linter in CI that rejects blocking DDL outright.",
  },
];

/* ----------------------------- team leadership ----------------------------- */
export const LEADERSHIP = [
  {
    index: "01",
    title: "Mentoring & growth",
    desc: "Twelve engineers mentored, four promoted to senior. I run weekly design office hours where anyone can bring a half-formed idea and leave with a plan.",
    points: ["Weekly design office hours", "Structured promo support", "Review as teaching, not gatekeeping"],
  },
  {
    index: "02",
    title: "Roadmaps & strategy",
    desc: "I turn a vague reliability mandate into a sequenced, fundable plan — with the trade-offs written down so leadership can disagree with the reasoning, not just the outcome.",
    points: ["Quarterly platform roadmaps", "ADRs for every load-bearing choice", "Cost-per-transaction as a roadmap metric"],
  },
  {
    index: "03",
    title: "Team enablement",
    desc: "The best platform work makes other teams faster. Golden-path templates, self-serve infrastructure, and docs written for the engineer at 3am.",
    points: ["Service template with SLOs built in", "Self-serve environments", "Runbooks tested during game days"],
  },
];

/* ---------------------------- open source & writing ------------------------ */
export const OSS = [
  { name: "PulseSync Android", desc: "Senior-level Android architecture example with modular design, Firebase backend ideas, offline-first thinking, and CI/CD discipline.", lang: "Kotlin", stars: 380, url: "https://github.com/Dev-moe-kyawaung/pulsesync-android" },
  { name: "video-player", desc: "Media-focused app work demonstrating product polish, UX flow, and practical app delivery patterns.", lang: "Kotlin", stars: 146, url: "https://github.com/moekyawaung-tech/video-player" },
  { name: "social-dashboard", desc: "Dashboard-style product surface that reflects systems thinking around analytics, state, and scalable UI structure.", lang: "TypeScript", stars: 191, url: "https://github.com/moekyawaung-tech/social-dashboard" },
];

export const WRITING = [
  { type: "Profile", title: "Gravatar verified profile & connected accounts", venue: "Gravatar", year: "2026", url: "https://gravatar.com/moekyawaung13721" },
  { type: "Project", title: "MoekyawTranslator — AI Translation App", venue: "current build", year: "2026", url: "https://moekyawaungmybio.lovable.app/" },
  { type: "Portfolio", title: "Developer profile collection", venue: "GitHub Pages", year: "2026", url: "https://moekyawaung-tech.github.io/" },
  { type: "Channel", title: "Professional LinkedIn profile", venue: "LinkedIn", year: "2026", url: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" },
];
