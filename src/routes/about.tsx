import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code2, Compass, Puzzle } from "lucide-react";
import { useState } from "react";

import { SectionHeading } from "@/components/neu";
import { Page } from "@/components/page";
import { about } from "@/data/portfolio";
import { useStagger } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gaurav Khetwal" },
      {
        name: "description",
        content:
          "How Gaurav Khetwal works: developer, product thinker and problem solver, with a process built on understand, design, build, validate and improve.",
      },
      { property: "og:title", content: "About — Gaurav Khetwal" },
      {
        property: "og:description",
        content: "Developer, product thinker, problem solver — and the process behind the work.",
      },
    ],
  }),
  component: AboutScreen,
});

const icons = { code: Code2, compass: Compass, puzzle: Puzzle } as const;

function AboutScreen() {
  const { container, item } = useStagger();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Page>
      <SectionHeading eyebrow="About" title="Developer, product thinker, problem solver." lead={about.intro} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-5 md:grid-cols-3"
      >
        {about.identities.map((identity) => {
          const Icon = icons[identity.icon];
          return (
            <motion.article
              key={identity.title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              tabIndex={0}
              className="group rounded-3xl bg-background p-6 neu-interactive"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-background text-primary neu-inset">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold">{identity.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{identity.body}</p>
            </motion.article>
          );
        })}
      </motion.div>

      <section className="mt-14">
        <h2 className="font-mono text-xs tracking-[0.28em] text-primary uppercase">
          How the work happens
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Five steps, repeated in small loops rather than one long march.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
          <ul className="flex gap-2 overflow-x-auto rounded-2xl bg-background p-2 neu-inset lg:flex-col lg:overflow-visible">
            {about.process.map((phase, i) => {
              const active = i === activeStep;
              return (
                <li key={phase.step} className="shrink-0 lg:w-full">
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    aria-pressed={active}
                    className={cn(
                      "relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors neu-focus",
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="process-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-background neu-sm"
                      />
                    ) : null}
                    <span className="relative z-10 font-mono text-[11px] opacity-70">
                      {phase.step}
                    </span>
                    <span className="relative z-10">{phase.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="rounded-3xl bg-background p-7 neu"
          >
            <p className="font-mono text-5xl font-bold text-primary/25">
              {about.process[activeStep]!.step}
            </p>
            <h3 className="mt-4 text-2xl font-bold">{about.process[activeStep]!.title}</h3>
            <p className="mt-3 text-base text-muted-foreground text-pretty">
              {about.process[activeStep]!.body}
            </p>
          </motion.div>
        </div>
      </section>
    </Page>
  );
}
