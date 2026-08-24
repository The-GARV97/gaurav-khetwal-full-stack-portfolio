/**
 * Centralised content for the portfolio.
 * Everything the site renders is edited from this single file.
 */

export const profile = {
  name: "Gaurav Khetwal",
  role: "Full-Stack Developer",
  initials: "GK",
  headline: "I build complete software systems, not just screens.",
  subheadline:
    "I design and build custom web applications, enterprise platforms, e-commerce experiences, SaaS products, REST APIs and data-driven systems from interface and architecture through production deployment.",
  status: "Open to new projects",
  location: "India (Remote-friendly)",
  socials: [
    { label: "GitHub", handle: "@The-GARV97", url: "https://github.com/The-GARV97" },
  ],
} as const;

export const about = {
  intro:
    "I work across the complete software lifecycle: UI and frontend development, backend architecture, databases, integrations, performance, Linux infrastructure and production deployment. I enjoy translating complex business requirements into scalable, maintainable software.",
  identities: [
    {
      title: "Full-stack engineer",
      body: "I follow a feature through the UI, frontend, REST API, business logic, database, queues and infrastructure so every layer works as one system.",
      icon: "code",
    },
    {
      title: "Business problem solver",
      body: "I model the real workflow first, then shape the data relationships, API boundaries and interface around the way the business actually operates.",
      icon: "compass",
    },
    {
      title: "Production engineer",
      body: "Development does not end locally. I debug runtime compatibility, queues, database performance, Linux services, restricted servers and deployment environments.",
      icon: "puzzle",
    },
  ],
  process: [
    {
      step: "01",
      title: "Understand",
      body: "Map the business requirement, users, workflow, constraints and the result the system must produce.",
    },
    {
      step: "02",
      title: "Architect",
      body: "Design the data relationships, API boundaries, permissions and infrastructure before complexity becomes expensive.",
    },
    {
      step: "03",
      title: "Build",
      body: "Develop reusable interfaces, centralized business logic and modular services in reviewable increments.",
    },
    {
      step: "04",
      title: "Optimize",
      body: "Trace bottlenecks across queries, queues, memory and runtime layers, then fix the root cause rather than the symptom.",
    },
    {
      step: "05",
      title: "Deploy",
      body: "Prepare the environment, dependencies, workers, storage, monitoring and verification needed for production.",
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
  image?: string;
  screenshots: { caption: string }[];
  demoUrl: string;
  sourceUrl: string;
  accent: "primary" | "accent" | "success";
};

export const projects: Project[] = [
  {
    id: "voice-of-bharat",
    title: "Voice of Bharat",
    tagline: "Digital news and media platform",
    description:
      "A responsive news portal designed to deliver national and regional stories through structured categories, multimedia articles and fast mobile reading.",
    role: "Web application development and content-platform engineering",
    year: "News & media",
    stack: ["React", "Next.js", "Tailwind CSS", "CMS Integration", "SEO", "Schema Markup"],
    challenge:
      "The publication required rapid content delivery, category-based navigation, multimedia support, mobile accessibility and strong article discovery through search and social channels.",
    solution:
      "Developed a Next.js news experience with server-rendered pages, CMS-driven updates, category organization, optimized media delivery, social sharing and structured article markup.",
    outcome:
      "Delivered a fast, search-oriented publishing platform supporting real-time updates, multimedia reporting and a mobile-first reader experience.",
    image: "/projects/voice-of-bharat.png",
    screenshots: [
      { caption: "Breaking news and category-led homepage" },
      { caption: "Multimedia article reading experience" },
      { caption: "Search and social-ready content structure" },
    ],
    demoUrl: "https://voiceofbharat.live/",
    sourceUrl: "#",
    accent: "primary",
  },
  {
    id: "goonj-entertainment",
    title: "Goonj Entertainment",
    tagline: "Live entertainment booking platform",
    description:
      "A modern digital platform for showcasing artists, coordinating event enquiries and accelerating bookings for weddings, corporate events and live concerts.",
    role: "Frontend development, booking experience and deployment",
    year: "Events & entertainment",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp Business API", "SEO", "Vercel"],
    challenge:
      "The business needed professional artist portfolios, fast client communication and an efficient quotation workflow for high-value entertainment bookings.",
    solution:
      "Built an optimized Next.js platform with multimedia artist profiles, event categorization, instant WhatsApp enquiries, quotation generation, testimonials and search-friendly content.",
    outcome:
      "Created a mobile-responsive booking experience that makes artist discovery clearer, client response immediate and quotation handling more efficient.",
    image: "/projects/goonj-entertainment.png",
    screenshots: [
      { caption: "Artist discovery and multimedia portfolios" },
      { caption: "Event categories and entertainment services" },
      { caption: "WhatsApp booking and quotation workflow" },
    ],
    demoUrl: "https://goonjentertainment.com/",
    sourceUrl: "#",
    accent: "success",
  },
  {
    id: "joota-junction",
    title: "Joota Junction",
    tagline: "AI-assisted footwear e-commerce",
    description:
      "A premium multi-brand footwear storefront with product discovery, intelligent shopping assistance and a responsive purchase journey.",
    role: "E-commerce development and AI-assisted shopping experience",
    year: "E-commerce & retail",
    stack: ["React", "Next.js", "Cloudinary", "Payment Gateway", "AI Integration", "Vercel"],
    challenge:
      "A catalogue spanning premium footwear brands needed simple filtering, responsive product browsing, optimized imagery, secure checkout and more useful recommendation support.",
    solution:
      "Built a Next.js commerce experience with an AI shopping assistant, more than 87 catalogue items, brand and category filters, Cloudinary image delivery, payment integration and responsive product flows.",
    outcome:
      "Created a faster product-discovery experience combining a structured multi-brand catalogue, optimized media and personalized shopping assistance.",
    image: "/projects/joota-junction.png",
    screenshots: [
      { caption: "Multi-brand footwear catalogue and filters" },
      { caption: "AI shopping assistant and recommendations" },
      { caption: "Responsive product and checkout experience" },
    ],
    demoUrl: "https://joota-junciton.vercel.app/",
    sourceUrl: "#",
    accent: "accent",
  },
  {
    id: "candron",
    title: "Candron",
    tagline: "Industrial power engineering platform",
    description:
      "A modern corporate and product platform for a Canadian manufacturer of custom-engineered switchgear, switchboards, transformers and control panels.",
    role: "Frontend development, product architecture and responsive experience",
    year: "Energy & manufacturing",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "SEO"],
    challenge:
      "A complex catalogue of electrical distribution equipment, services and industry applications needed to feel credible, easy to navigate and accessible across devices.",
    solution:
      "Structured the experience around product families and engineering capabilities, then built responsive pages with technical content, purposeful motion and clear routes into consultation and quotation workflows.",
    outcome:
      "Created a polished digital foundation that communicates Candron's in-house engineering and manufacturing capabilities while making technical product discovery more approachable.",
    image: "/projects/candron-laptop.png",
    screenshots: [
      { caption: "Engineering-led corporate homepage" },
      { caption: "Power distribution product catalogue" },
      { caption: "Industry applications and consultation journey" },
    ],
    demoUrl: "https://candron-next.vercel.app/",
    sourceUrl: "#",
    accent: "primary",
  },
  {
    id: "nama-pharma",
    title: "Nama Pharma",
    tagline: "Full-stack wellness e-commerce platform",
    description:
      "A production-oriented e-commerce experience combining an animated React storefront with a Laravel commerce backend, administration, payments and operational workflows.",
    role: "Full-stack development, UX, commerce backend and deployment",
    year: "E-commerce",
    stack: ["React", "Laravel", "PHP", "MySQL", "Sanctum", "Razorpay", "Framer Motion", "Three.js"],
    challenge:
      "The storefront needed premium visual storytelling while supporting real products, customers, orders, payments, permissions and production operations.",
    solution:
      "Built a responsive React experience backed by Laravel APIs, Sanctum authentication, role-based administration, Razorpay integration, activity logging and production-ready commerce workflows.",
    outcome:
      "Created a connected storefront and backend foundation covering the customer journey and the operational system behind it.",
    image: "/projects/nama-pharma-laptop.png",
    screenshots: [
      { caption: "Responsive product and brand experience" },
      { caption: "Checkout, account and order journey" },
      { caption: "Laravel administration and commerce operations" },
    ],
    demoUrl: "https://namapharma.in/",
    sourceUrl: "#",
    accent: "success",
  },
  {
    id: "paarth",
    title: "Paarth",
    tagline: "Modern business capability platform",
    description:
      "A founder-led education experience that connects marketing, AI and business leadership through practical frameworks, cohort learning and real-world execution.",
    role: "Frontend development, motion design and interactive experience",
    year: "Education & capability",
    stack: ["React", "Vite", "Tailwind CSS", "GSAP", "Lenis", "React Three Fiber", "Three.js"],
    challenge:
      "A broad curriculum spanning marketing, AI, leadership and operations needed to feel cohesive, premium and substantially different from a conventional course website.",
    solution:
      "Built a responsive editorial experience with structured learning pillars, program and admissions journeys, immersive motion, smooth scrolling and interactive visual layers that support the brand's systems-led positioning.",
    outcome:
      "Created a distinctive digital platform that explains the learning model clearly, gives each discipline room to breathe and guides prospective learners toward the flagship program.",
    image: "/projects/paarth.png",
    screenshots: [
      { caption: "Editorial capability-led homepage" },
      { caption: "Marketing, AI and leadership learning pillars" },
      { caption: "Flagship program and admissions journey" },
    ],
    demoUrl: "https://joinpaarth.com/",
    sourceUrl: "#",
    accent: "accent",
  },
  {
    id: "disha-clarity",
    title: "Disha Clarity",
    tagline: "Interactive business clarity toolkit",
    description:
      "A practical business workspace that turns proven frameworks into diagnostics, guided journeys, calculators, worksheets and a personal action plan.",
    role: "Full-stack product development, UX and decision-tool architecture",
    year: "Business tools & learning",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Local Storage", "Interactive Tools"],
    challenge:
      "Business owners and students often consume useful theory without a clear path for applying it to the specific problem in front of them.",
    solution:
      "Designed a ledger-style application with a five-minute health checkup, problem-led journeys, interactive calculators, execution worksheets, learning tracks, a knowledge bank and a browser-saved action plan.",
    outcome:
      "Turned a large framework library into a focused self-guided product where every route leads toward a concrete decision, number or next action.",
    image: "/projects/disha-clarity.png",
    screenshots: [
      { caption: "Business health checkup and guided diagnosis" },
      { caption: "Calculators, frameworks and learning journeys" },
      { caption: "Private browser-saved action plan" },
    ],
    demoUrl: "https://dishaclarity.com/",
    sourceUrl: "#",
    accent: "success",
  },
  {
    id: "ayubalance",
    title: "Ayubalance",
    tagline: "API-driven health commerce application",
    description:
      "A health and wellness storefront evolved from lightweight PHP endpoints toward a Laravel-powered commerce architecture for F60 products.",
    role: "Backend migration, API integration and commerce engineering",
    year: "Platform modernization",
    stack: ["Laravel", "React", "PHP", "MySQL", "Sanctum", "Razorpay", "Redis", "AWS S3"],
    challenge:
      "A lightweight API layer needed to grow into a maintainable backend supporting session authentication, products, checkout, orders, payments, subscriptions and administration.",
    solution:
      "Planned and implemented a phased Laravel migration with product-data mapping, REST contracts, Sanctum sessions, server-backed checkout, Razorpay verification, role permissions and deployment configuration.",
    outcome:
      "Established a scalable backend direction that connects F60 product experiences with real commerce and administration workflows.",
    image: "/projects/ayubalance-laptop.png",
    screenshots: [
      { caption: "F60 product catalogue and responsive storefront" },
      { caption: "Server-backed checkout and payment flow" },
      { caption: "Orders, subscriptions and administration" },
    ],
    demoUrl: "https://ayubalance.vercel.app/",
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
    title: "Frontend Engineering",
    summary: "Responsive, interactive interfaces for modern and enterprise applications.",
    icon: "layout",
    items: [
      { name: "React", note: "Applications, SaaS and commerce" },
      { name: "Next.js", note: "SSR, content and commerce platforms" },
      { name: "Angular", note: "Enterprise applications" },
      { name: "TypeScript", note: "Typed frontend systems" },
      { name: "Tailwind CSS", note: "Responsive design systems" },
      { name: "Framer Motion / GSAP", note: "Purposeful interaction" },
      { name: "HTML5 / CSS3", note: "Accessible web interfaces" },
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    summary: "Business logic, APIs, authentication and background processing.",
    icon: "server",
    items: [
      { name: "Laravel / PHP", note: "Enterprise apps and REST APIs" },
      { name: "Node.js", note: "Runtime and tooling" },
      { name: "REST APIs", note: "Reusable service boundaries" },
      { name: "Sanctum", note: "Session authentication" },
      { name: "Queues / Horizon", note: "Background processing" },
      { name: "Permissions", note: "Roles and policy-driven access" },
    ],
  },
  {
    id: "databases",
    title: "Database Engineering",
    summary: "Relational models, reporting queries, caching and production administration.",
    icon: "database",
    items: [
      { name: "MySQL", note: "Applications and administration" },
      { name: "MongoDB", note: "Flexible marketplace data" },
      { name: "PostgreSQL", note: "SaaS and scalable systems" },
      { name: "SQL", note: "Queries, optimization and reports" },
      { name: "Redis", note: "Caching and queues" },
      { name: "Migrations", note: "Versioned data structures" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    summary: "Software designed around complex operational and compliance workflows.",
    icon: "wrench",
    items: [
      { name: "Business workflows", note: "Operations, rules and reporting" },
      { name: "Approvals", note: "Roles, states and exceptions" },
      { name: "Excel processing", note: "Large imports and exports" },
      { name: "Document generation", note: "PHPWord and wkhtmltopdf" },
      { name: "Admin platforms", note: "Operations and reporting" },
    ],
  },
  {
    id: "product",
    title: "Product & Commerce",
    summary: "Custom systems shaped around actual business requirements.",
    icon: "compass",
    items: [
      { name: "Custom web apps", note: "Portals, dashboards and tools" },
      { name: "E-commerce", note: "Catalogues, orders and payments" },
      { name: "SaaS architecture", note: "Modules, tenants and roles" },
      { name: "Payment integration", note: "Checkout and verification" },
      { name: "CMS platforms", note: "News and multimedia publishing" },
      { name: "AI-assisted commerce", note: "Discovery and recommendations" },
      { name: "Workflow design", note: "Business rules before screens" },
    ],
  },
  {
    id: "deployment",
    title: "Production Engineering",
    summary: "Infrastructure, compatibility and delivery beyond local development.",
    icon: "rocket",
    items: [
      { name: "Linux", note: "Production environments" },
      { name: "Apache / Nginx", note: "Web servers and proxying" },
      { name: "Supervisor", note: "Queue workers" },
      { name: "AWS / S3", note: "Cloud and object storage" },
      { name: "Composer / npm", note: "Dependency management" },
      { name: "Git", note: "Version control and delivery" },
    ],
  },
];

export const terminalLines: { prompt: string; output: string[] }[] = [
  {
    prompt: "whoami",
    output: ["gaurav — full-stack developer · custom software engineer"],
  },
  {
    prompt: "skills --matrix",
    output: [
      "frontend  react · angular · typescript · tailwind",
      "backend   laravel · php · node · rest APIs",
      "data      mysql · postgresql · redis · sql",
      "infra     linux · nginx · supervisor · aws",
    ],
  },
  {
    prompt: "ls ./projects",
    output: [
      "voice-of-bharat/  goonj-entertainment/  joota-junction/",
      "candron/  nama-pharma/  paarth/",
      "disha-clarity/  ayubalance/",
    ],
  },
  {
    prompt: "echo $ENGINEERING_MODE",
    output: ["BUILD → DEBUG → OPTIMIZE → DEPLOY"],
  },
];

export const contactMeta = {
  heading: "Have a system to build?",
  body: "Custom web application, enterprise workflow, e-commerce platform, SaaS product or REST API: share the requirement and where the difficult part is.",
  details: [
    { label: "Location", value: "India (Remote-friendly)", href: null },
    { label: "GitHub", value: "github.com/The-GARV97", href: "https://github.com/The-GARV97" },
  ] as { label: string; value: string; href: string | null }[],
};

export const navItems = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/about", label: "About", icon: "user" },
  { to: "/work", label: "Work", icon: "layers" },
  { to: "/skills", label: "Skills", icon: "terminal" },
  { to: "/contact", label: "Contact", icon: "mail" },
] as const;
