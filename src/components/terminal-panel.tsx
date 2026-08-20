import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { terminalLines } from "@/data/portfolio";

type Row = { kind: "prompt" | "output"; text: string };

function buildRows(): Row[] {
  const rows: Row[] = [];
  for (const block of terminalLines) {
    rows.push({ kind: "prompt", text: block.prompt });
    for (const line of block.output) rows.push({ kind: "output", text: line });
  }
  return rows;
}

export function TerminalPanel() {
  const reduced = useReducedMotion();
  const rows = useMemo(buildRows, []);
  const [visible, setVisible] = useState(reduced ? rows.length : 0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      setVisible(rows.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStarted(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, rows.length]);

  useEffect(() => {
    if (!started || reduced) return;
    if (visible >= rows.length) return;
    const timer = window.setTimeout(() => setVisible((v) => v + 1), 260);
    return () => window.clearTimeout(timer);
  }, [started, visible, rows.length, reduced]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl bg-background p-1.5 neu-lg"
      aria-label="Terminal preview of the developer profile"
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-accent/80" />
        <span className="size-2.5 rounded-full bg-success/80" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">
          gaurav@portfolio — zsh
        </span>
      </div>

      <div className="min-h-[16rem] rounded-xl bg-background p-4 font-mono text-xs leading-6 neu-inset sm:text-[13px]">
        {rows.slice(0, visible).map((row, i) => (
          <motion.div
            key={i}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-pre-wrap"
          >
            {row.kind === "prompt" ? (
              <span>
                <span className="text-success">➜</span>{" "}
                <span className="text-primary">~/portfolio</span>{" "}
                <span className="text-foreground">{row.text}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">{row.text}</span>
            )}
          </motion.div>
        ))}
        {visible >= rows.length ? (
          <div>
            <span className="text-success">➜</span>{" "}
            <span className="text-primary">~/portfolio</span>{" "}
            <motion.span
              className="inline-block h-3.5 w-2 translate-y-0.5 bg-foreground"
              animate={reduced ? {} : { opacity: [1, 0.1, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
