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
        lead="Every card opens a full breakdown: role, stack, the challenge, the approach and what came out of it. The entries below are clearly marked placeholders."
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
              className="flex h-full w-full cursor-pointer flex-col rounded-3xl bg-background p-6 text-left neu-interactive"
            >
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
