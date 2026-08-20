import { motion, useReducedMotion } from "framer-motion";
import { Braces, Cpu, Database, GitBranch, Server, Zap } from "lucide-react";

const orbit = [
  { icon: Braces, label: "UI layer", x: "8%", y: "12%", delay: 0 },
  { icon: Server, label: "API layer", x: "78%", y: "6%", delay: 0.4 },
  { icon: Database, label: "Data layer", x: "84%", y: "62%", delay: 0.8 },
  { icon: GitBranch, label: "Version control", x: "2%", y: "66%", delay: 1.2 },
  { icon: Zap, label: "Edge runtime", x: "44%", y: "86%", delay: 1.6 },
];

const codeLines: { indent: number; tokens: { text: string; tone: string }[] }[] = [
  {
    indent: 0,
    tokens: [
      { text: "async function", tone: "text-primary" },
      { text: " solve", tone: "text-foreground" },
      { text: "(problem) {", tone: "text-muted-foreground" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "const", tone: "text-primary" },
      { text: " model = ", tone: "text-foreground" },
      { text: "understand", tone: "text-accent" },
      { text: "(problem);", tone: "text-muted-foreground" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "const", tone: "text-primary" },
      { text: " plan  = ", tone: "text-foreground" },
      { text: "design", tone: "text-accent" },
      { text: "(model);", tone: "text-muted-foreground" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "return", tone: "text-primary" },
      { text: " ship", tone: "text-accent" },
      { text: "(plan).", tone: "text-muted-foreground" },
      { text: "then", tone: "text-accent" },
      { text: "(improve);", tone: "text-muted-foreground" },
    ],
  },
  { indent: 0, tokens: [{ text: "}", tone: "text-muted-foreground" }] },
];

export function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      {/* recessed grid canvas */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-background grid-canvas neu-inset-deep" />

      {/* rotating ring */}
      <motion.div
        className="absolute inset-8 rounded-full border border-dashed border-foreground/15"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-16 rounded-full border border-foreground/10"
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* centre code card */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.2 }}
        className="absolute top-1/2 left-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-background p-4 neu-lg"
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-destructive/70" />
          <span className="size-2 rounded-full bg-accent/80" />
          <span className="size-2 rounded-full bg-success/80" />
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">solve.ts</span>
        </div>
        <pre className="overflow-hidden font-mono text-[11px] leading-relaxed sm:text-xs">
          <code>
            {codeLines.map((line, i) => (
              <motion.span
                key={i}
                className="block whitespace-pre"
                initial={reduced ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.35 }}
              >
                {"  ".repeat(line.indent)}
                {line.tokens.map((t, j) => (
                  <span key={j} className={t.tone}>
                    {t.text}
                  </span>
                ))}
              </motion.span>
            ))}
            <motion.span
              className="inline-block h-3 w-1.5 translate-y-0.5 bg-primary"
              animate={reduced ? {} : { opacity: [1, 0.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </code>
        </pre>
      </motion.div>

      {/* floating stack nodes */}
      {orbit.map(({ icon: Icon, label, x, y, delay }) => (
        <motion.div
          key={label}
          className="absolute flex items-center gap-2 rounded-xl bg-background px-2.5 py-2 neu-sm"
          style={{ left: x, top: y }}
          initial={reduced ? false : { opacity: 0, scale: 0.7 }}
          animate={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1, y: [0, -9, 0] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.4, delay: 0.3 + delay * 0.2 },
                  scale: { duration: 0.4, delay: 0.3 + delay * 0.2 },
                  y: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay },
                }
          }
        >
          <Icon className="size-3.5 text-primary" />
          <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
        </motion.div>
      ))}

      {/* status pill */}
      <motion.div
        className="absolute right-2 bottom-3 flex items-center gap-2 rounded-xl bg-background px-3 py-2 neu-sm"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <Cpu className="size-3.5 text-success" />
        <span className="font-mono text-[10px] text-muted-foreground">build: passing</span>
      </motion.div>
    </div>
  );
}
