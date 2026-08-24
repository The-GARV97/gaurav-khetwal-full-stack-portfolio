import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { NeuChip, SectionHeading } from "@/components/neu";
import { Page } from "@/components/page";
import { ProjectDetail } from "@/components/project-detail";
import { projects, type Project } from "@/data/portfolio";
import { useStagger } from "@/hooks/use-motion-prefs";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Gaurav Khetwal" },
      {
        name: "description",
        content:
          "Selected case studies from Gaurav Khetwal: the challenge, the solution and the outcome behind each full-stack project.",
      },
      { property: "og:title", content: "Work — Gaurav Khetwal" },
      {
        property: "og:description",
        content: "Case studies with challenge, solution, stack and outcome for each project.",
      },
    ],
  }),
  component: WorkScreen,
});

function WorkScreen() {
  const { container, item } = useStagger();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Page>
      <SectionHeading
        eyebrow="Work"
        title="Case studies, front to back."
        lead="Media platforms, commerce products and production-ready business websites. Open a case study for the challenge, architecture, implementation and outcome."
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.article key={project.id} variants={item}>
            <motion.button
              type="button"
              onClick={() => setSelected(project)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              aria-haspopup="dialog"
              className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-background p-6 text-left neu-interactive"
            >
              {project.image ? (
                <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden border-b border-border/50 bg-muted p-3 pb-0 sm:p-4 sm:pb-0">
                  <div className="mb-2 flex items-center gap-1.5 px-1" aria-hidden="true">
                    <span className="size-2 rounded-full bg-red-400/80" />
                    <span className="size-2 rounded-full bg-amber-400/80" />
                    <span className="size-2 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 h-2 flex-1 rounded-full bg-foreground/5" />
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl ring-1 ring-foreground/10 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.65)]">
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-10">
                      <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-white/75 uppercase">
                        Built with
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech) => (
                          <li
                            key={`${project.id}-image-${tech}`}
                            className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                    {project.year}
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{project.title}</h2>
                </div>
                <span className="flex size-9 items-center justify-center rounded-xl bg-background text-primary neu-inset">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
              <p className="mt-4 flex-1 text-sm text-muted-foreground text-pretty">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <li key={tech}>
                    <NeuChip>{tech}</NeuChip>
                  </li>
                ))}
                {project.stack.length > 4 ? (
                  <li>
                    <NeuChip>+{project.stack.length - 4}</NeuChip>
                  </li>
                ) : null}
              </ul>

              <span className="mt-5 font-mono text-[11px] tracking-widest text-primary uppercase">
                Open case study
              </span>
            </motion.button>
          </motion.article>
        ))}
      </motion.div>

      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </Page>
  );
}
