import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";

import { HeroVisual } from "@/components/hero-visual";
import { NeuChip } from "@/components/neu";
import { Page } from "@/components/page";
import { profile } from "@/data/portfolio";
import { useStagger } from "@/hooks/use-motion-prefs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gaurav Khetwal — Full-Stack Developer" },
      {
        name: "description",
        content:
          "Gaurav Khetwal builds custom web applications, enterprise platforms, e-commerce systems, SaaS products and REST APIs from interface to production.",
      },
      { property: "og:title", content: "Gaurav Khetwal — Full-Stack Developer" },
      {
        property: "og:description",
        content: "Full-stack developer building complete custom software systems.",
      },
    ],
  }),
  component: HomeScreen,
});

const highlights = ["Laravel", "PHP", "React", "Next.js", "Angular", "MySQL"];

function HomeScreen() {
  const { container, item } = useStagger(0.05);

  return (
    <Page className="pt-6 sm:pt-10">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-xl bg-background px-3 py-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase neu-sm"
          >
            <span className="size-1.5 rounded-full bg-success" />
            {profile.role}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl leading-[1.05] font-bold text-balance sm:text-5xl md:text-6xl"
          >
            <span className="block text-gradient">{profile.name}</span>
            <span className="mt-3 block text-2xl leading-tight font-semibold text-foreground sm:text-3xl md:text-[2.5rem]">
              {profile.headline}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base text-muted-foreground text-pretty"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/work"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-background px-7 text-base font-semibold text-primary ring-1 ring-primary/25 ring-inset neu-interactive"
            >
              View work
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-background px-7 text-base font-medium neu-interactive"
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              Start a conversation
            </Link>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex flex-wrap gap-2">
            {highlights.map((tech) => (
              <li key={tech}>
                <NeuChip>{tech}</NeuChip>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 24 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </Page>
  );
}
