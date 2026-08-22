import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Database, LayoutGrid, Rocket, Server, Wrench } from "lucide-react";
import { useState } from "react";

import { NeuChip, SectionHeading } from "@/components/neu";
import { Page } from "@/components/page";
import { TerminalPanel } from "@/components/terminal-panel";
import { skillGroups } from "@/data/portfolio";
import { useStagger } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Gaurav Khetwal" },
      {
        name: "description",
        content:
          "Frontend, backend, databases, tools, product thinking and deployment capabilities of full-stack developer Gaurav Khetwal.",
      },
      { property: "og:title", content: "Skills — Gaurav Khetwal" },
      {
        property: "og:description",
        content: "A full-stack capability map, from interface craft to deployment.",
      },
    ],
  }),
  component: SkillsScreen,
});

const icons = {
  layout: LayoutGrid,
  server: Server,
  database: Database,
  wrench: Wrench,
  compass: Compass,
  rocket: Rocket,
} as const;

function SkillsScreen() {
  const { container, item } = useStagger();
  const [open, setOpen] = useState<string>(skillGroups[0]!.id);

  return (
    <Page>
      <SectionHeading
        eyebrow="Skills"
        title="A capability map, not a scoreboard."
        lead="Percentages on a bar never told anyone anything. Here is what each area actually involves in practice."
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => {
          const Icon = icons[group.icon as keyof typeof icons];
          const expanded = open === group.id;
          return (
            <motion.section key={group.id} variants={item} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl bg-background p-6 transition-shadow duration-300",
                  expanded ? "neu-inset" : "neu",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? "" : group.id)}
                  aria-expanded={expanded}
                  aria-controls={`skills-${group.id}`}
                  className="flex w-full cursor-pointer items-start gap-4 text-left neu-focus"
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl bg-background transition-colors",
                      expanded ? "text-primary neu-sm" : "text-muted-foreground neu-inset",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-semibold">{group.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {group.summary}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.ul
                      id={`skills-${group.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 space-y-2.5">
                        {group.items.map((skill, i) => (
                          <motion.li
                            key={skill.name}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 * i }}
                            className="flex items-center justify-between gap-3 rounded-xl bg-background px-3 py-2.5 neu-sm"
                          >
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-right font-mono text-[10px] text-muted-foreground">
                              {skill.note}
                            </span>
                          </motion.li>
                        ))}
                      </div>
                    </motion.ul>
                  ) : (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 flex flex-wrap gap-1.5"
                    >
                      {group.items.map((skill) => (
                        <li key={skill.name}>
                          <NeuChip>{skill.name}</NeuChip>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          );
        })}
      </motion.div>

      <section className="mt-14">
        <h2 className="mb-5 font-mono text-xs tracking-[0.28em] text-primary uppercase">
          Shell view
        </h2>
        <TerminalPanel />
      </section>
    </Page>
  );
}
