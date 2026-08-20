/**
 * Centralised content for the portfolio.
 * Everything the site renders is edited from this single file.
 */

export const profile = {
  name: "Gaurav Khetwal",
  role: "Full-Stack Developer",
  initials: "GK",
  headline: "I turn complex problems into clear, useful software.",
  subheadline:
    "Full-stack developer working across product thinking, interface craft and the systems underneath — from the first sketch to the deployed service.",
  status: "Open to new projects",
  // PLACEHOLDER — replace with real details.
  location: "India (Remote-friendly) — placeholder",
  email: "hello@example.com",
  socials: [
    { label: "GitHub", handle: "@placeholder", url: "https://github.com/" },
    { label: "LinkedIn", handle: "/in/placeholder", url: "https://linkedin.com/" },
    { label: "X", handle: "@placeholder", url: "https://x.com/" },
  ],
} as const;

export const about = {
  intro:
    "I build software end to end. That means I care as much about the shape of a database table as I do about how a button feels when it is pressed.",
  identities: [
    {
      title: "Developer",
      body: "Comfortable across the stack: typed frontends, HTTP layers, data models, background work and the deploy pipeline that ties them together.",
      icon: "code",
    },
    {
      title: "Product thinker",
      body: "I start from the job the software has to do. Scope is a design decision, and saying no to the wrong feature is part of the work.",
      icon: "compass",
    },
    {
      title: "Problem solver",
      body: "I like the messy middle — ambiguous requirements, legacy edge cases, performance that fell off a cliff. Reduce, isolate, fix, document.",
      icon: "puzzle",
    },
  ],
  process: [
    {
      step: "01",
      title: "Understand",
      body: "Map the real problem, the constraints and who is affected before touching an editor.",
    },
    {
      step: "02",
      title: "Design",
      body: "Sketch the flow and the data model together. Interfaces and schemas are the same conversation.",
    },
    {
      step: "03",
      title: "Build",
      body: "Small, reviewable increments. Typed boundaries, readable naming, no cleverness without a reason.",
    },
    {
      step: "04",
      title: "Validate",
      body: "Test the risky paths, use the thing myself, and check it against the problem from step one.",
    },
    {
      step: "05",
      title: "Improve",
      body: "Measure, remove friction, delete what nobody uses, and leave the codebase easier to change.",
    },
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  stack: string[];
  challenge: string;
  solution: string;
  outcome: string;
  screenshots: { caption: string }[];
  demoUrl: string;
  sourceUrl: string;
  accent: "primary" | "accent" | "success";
};

/**
 * PLACEHOLDER PROJECTS.
 * Replace the copy and links below with real case studies.
 * No clients, metrics or achievements are implied here.
 */
export const projects: Project[] = [
  {
    id: "project-alpha",
    title: "Project Alpha",
    tagline: "Placeholder — realtime collaboration workspace",
    description:
      "Placeholder case study for a collaborative workspace where several people edit structured documents at the same time.",
    role: "Placeholder — full-stack developer (solo)",
    year: "Placeholder year",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSockets"],
    challenge:
      "Placeholder — describe the core difficulty here, e.g. keeping concurrent edits consistent without locking the whole document.",
    solution:
      "Placeholder — describe the approach taken, e.g. a server-authoritative event log with optimistic client updates and conflict reconciliation.",
    outcome:
      "Placeholder — describe what shipped and what you learned. Do not add invented metrics.",
    screenshots: [
      { caption: "Placeholder screenshot — workspace view" },
      { caption: "Placeholder screenshot — document editor" },
      { caption: "Placeholder screenshot — activity timeline" },
    ],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "primary",
  },
  {
    id: "project-beta",
    title: "Project Beta",
    tagline: "Placeholder — data pipeline and dashboard",
    description:
      "Placeholder case study for an ingestion pipeline that normalises messy third-party data and exposes it through a queryable dashboard.",
    role: "Placeholder — backend and data layer",
    year: "Placeholder year",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    challenge:
      "Placeholder — describe the difficulty, e.g. inconsistent upstream schemas and unpredictable batch sizes.",
    solution:
      "Placeholder — describe the approach, e.g. schema-on-read validation, idempotent jobs and a retry queue.",
    outcome: "Placeholder — describe the result in plain terms.",
    screenshots: [
      { caption: "Placeholder screenshot — pipeline monitor" },
      { caption: "Placeholder screenshot — query builder" },
    ],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "accent",
  },
  {
    id: "project-gamma",
    title: "Project Gamma",
    tagline: "Placeholder — developer tooling CLI",
    description:
      "Placeholder case study for a command-line tool that scaffolds and validates service configuration across environments.",
    role: "Placeholder — full-stack developer",
    year: "Placeholder year",
    stack: ["TypeScript", "Node.js", "SQLite", "GitHub Actions"],
    challenge: "Placeholder — describe the problem the tool exists to solve.",
    solution: "Placeholder — describe the design of the tool and its guarantees.",
    outcome: "Placeholder — describe the current state of the project.",
    screenshots: [
      { caption: "Placeholder screenshot — CLI output" },
      { caption: "Placeholder screenshot — config diff" },
    ],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "success",
  },
  {
    id: "project-delta",
    title: "Project Delta",
    tagline: "Placeholder — mobile-first booking flow",
    description:
      "Placeholder case study for a booking experience designed mobile-first with offline-tolerant form state.",
    role: "Placeholder — frontend and API integration",
    year: "Placeholder year",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Supabase"],
    challenge: "Placeholder — describe the constraint, e.g. flaky mobile connectivity.",
    solution: "Placeholder — describe the approach, e.g. resumable local draft state.",
    outcome: "Placeholder — describe the outcome without inventing numbers.",
    screenshots: [{ caption: "Placeholder screenshot — booking step" }],
    demoUrl: "#",
    sourceUrl: "#",
    accent: "primary",
  },
];

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  icon: string;
  items: { name: string; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    summary: "Interfaces that stay fast and legible as they grow.",
    icon: "layout",
    items: [
      { name: "React", note: "Composition, state boundaries, suspense" },
      { name: "TypeScript", note: "Strict types at module edges" },
      { name: "Tailwind CSS", note: "Token-driven design systems" },
      { name: "Framer Motion", note: "Purposeful interface motion" },
      { name: "Accessibility", note: "Keyboard paths and semantics" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "Services with clear contracts and predictable failure modes.",
    icon: "server",
    items: [
      { name: "Node.js", note: "HTTP services and background jobs" },
      { name: "REST & RPC", note: "Versioned, validated interfaces" },
      { name: "Python", note: "Data-shaped services and scripting" },
      { name: "Auth", note: "Sessions, tokens, row-level rules" },
      { name: "Validation", note: "Schema-first with Zod" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    summary: "Modelling data so the queries you need stay simple.",
    icon: "database",
    items: [
      { name: "PostgreSQL", note: "Relational modelling, indexes, RLS" },
      { name: "SQL", note: "Joins, window functions, migrations" },
      { name: "Redis", note: "Caching and rate limiting" },
      { name: "SQLite", note: "Local-first and embedded storage" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    summary: "The everyday workbench.",
    icon: "wrench",
    items: [
      { name: "Git", note: "Small commits, readable history" },
      { name: "Vite", note: "Fast builds and dev feedback" },
      { name: "Testing", note: "Vitest and Playwright flows" },
      { name: "Docker", note: "Reproducible local environments" },
    ],
  },
  {
    id: "product",
    title: "Product Thinking",
    summary: "Deciding what deserves to be built.",
    icon: "compass",
    items: [
      { name: "Scoping", note: "Cut to the smallest useful version" },
      { name: "User flows", note: "Map the path before the pixels" },
      { name: "Prioritisation", note: "Trade-offs made explicit" },
      { name: "Writing", note: "Docs, specs and clear commit messages" },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    summary: "Shipping repeatedly without drama.",
    icon: "rocket",
    items: [
      { name: "CI/CD", note: "GitHub Actions pipelines" },
      { name: "Edge runtimes", note: "Serverless functions and workers" },
      { name: "Observability", note: "Logs, traces and error reporting" },
      { name: "Environments", note: "Config separation and secrets" },
    ],
  },
];

export const terminalLines: { prompt: string; output: string[] }[] = [
  {
    prompt: "whoami",
    output: ["gaurav — full-stack developer"],
  },
  {
    prompt: "cat stack.json",
    output: [
      "{",
      '  "frontend": ["react", "typescript", "tailwind"],',
      '  "backend":  ["node", "python", "rest"],',
      '  "data":     ["postgres", "redis", "sql"],',
      '  "deploy":   ["docker", "ci/cd", "edge"]',
      "}",
    ],
  },
  {
    prompt: "./run-process.sh",
    output: [
      "understand → design → build → validate → improve",
      "status: ready for the next problem",
    ],
  },
];

export const contactMeta = {
  heading: "Start a conversation",
  body: "Tell me what you are building and where it is stuck. I read everything that comes through here.",
  // PLACEHOLDERS — replace with real contact details.
  details: [
    { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
    { label: "Location", value: "India (Remote-friendly) — placeholder", href: null },
    { label: "GitHub", value: "github.com/placeholder", href: "https://github.com/" },
    { label: "LinkedIn", value: "linkedin.com/in/placeholder", href: "https://linkedin.com/" },
  ] as { label: string; value: string; href: string | null }[],
};

export const navItems = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/about", label: "About", icon: "user" },
  { to: "/work", label: "Work", icon: "layers" },
  { to: "/skills", label: "Skills", icon: "terminal" },
  { to: "/contact", label: "Contact", icon: "mail" },
] as const;
