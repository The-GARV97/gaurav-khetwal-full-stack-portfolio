import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, ImageIcon, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { NeuButton, NeuChip } from "@/components/neu";
import type { Project } from "@/data/portfolio";

const caseFields = ["challenge", "solution", "outcome"] as const;
const caseLabels: Record<(typeof caseFields)[number], string> = {
  challenge: "The challenge",
  solution: "The solution",
  outcome: "The outcome",
};

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/25 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="relative m-0 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] bg-background neu-lg outline-none sm:m-4 sm:rounded-[2rem]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/60 p-5 sm:p-7">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                  {project.year}
                </p>
                <h2 id="project-detail-title" className="mt-2 text-2xl font-bold sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
              </div>
              <NeuButton size="icon" onClick={onClose} aria-label="Close project details">
                <X className="size-5" aria-hidden="true" />
              </NeuButton>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7">
              <p className="text-base text-pretty">{project.description}</p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-background p-4 neu-inset">
                  <dt className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    Role
                  </dt>
                  <dd className="mt-1.5 text-sm">{project.role}</dd>
                </div>
                <div className="rounded-2xl bg-background p-4 neu-inset">
                  <dt className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    Stack
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <NeuChip key={tech}>{tech}</NeuChip>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-4">
                {caseFields.map((field, i) => (
                  <motion.section
                    key={field}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                    className="rounded-2xl bg-background p-5 neu-sm"
                  >
                    <h3 className="font-mono text-[11px] tracking-widest text-primary uppercase">
                      {caseLabels[field]}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground text-pretty">
                      {project[field]}
                    </p>
                  </motion.section>
                ))}
              </div>

              <section className="mt-6">
                <h3 className="font-mono text-[11px] tracking-widest text-primary uppercase">
                  Screenshots
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((shot) => (
                    <figure
                      key={shot.caption}
                      className="flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl bg-background text-center neu-inset"
                    >
                      <ImageIcon className="size-6 text-muted-foreground" aria-hidden="true" />
                      <figcaption className="px-4 font-mono text-[11px] text-muted-foreground">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-border/60 p-5 sm:p-7">
              <NeuButton
                variant="primary"
                onClick={() => window.open(project.demoUrl, "_blank", "noopener")}
              >
                Live demo
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </NeuButton>
              <NeuButton onClick={() => window.open(project.sourceUrl, "_blank", "noopener")}>
                <Github className="size-4" aria-hidden="true" />
                Source code
              </NeuButton>
              <p className="w-full font-mono text-[11px] text-muted-foreground">
                Links are placeholders — replace them in src/data/portfolio.ts
              </p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
