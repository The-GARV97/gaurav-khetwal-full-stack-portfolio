import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { NeuButton } from "@/components/neu";
import { useTheme } from "@/components/theme-provider";
import { profile } from "@/data/portfolio";

export function TopBar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const reduced = useReducedMotion();

  return (
    <motion.header
      initial={reduced ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="sticky top-0 z-40 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
    >
      <Link
        to="/"
        className="flex items-center gap-3 rounded-xl neu-focus"
        aria-label={`${profile.name} — home`}
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-background font-display text-sm font-bold text-primary neu-sm">
          {profile.initials}
        </span>
        <span className="hidden sm:block">
          <span className="block font-display text-sm font-semibold">{profile.name}</span>
          <span className="block font-mono text-[11px] text-muted-foreground">{profile.role}</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 rounded-xl bg-background px-3 py-2 font-mono text-[11px] text-muted-foreground neu-sm sm:inline-flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {profile.status}
        </span>

        <NeuButton
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "dark"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mounted ? theme : "placeholder"}
              initial={reduced ? false : { rotate: -70, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { rotate: 70, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.22 }}
              className="flex"
            >
              {theme === "dark" ? (
                <Sun className="size-5" aria-hidden="true" />
              ) : (
                <Moon className="size-5" aria-hidden="true" />
              )}
            </motion.span>
          </AnimatePresence>
        </NeuButton>
      </div>
    </motion.header>
  );
}
