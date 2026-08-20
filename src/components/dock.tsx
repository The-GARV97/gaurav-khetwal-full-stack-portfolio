import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Home, Layers, Mail, TerminalSquare, User } from "lucide-react";

import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const icons = {
  home: Home,
  user: User,
  layers: Layers,
  terminal: TerminalSquare,
  mail: Mail,
} as const;

export function Dock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <motion.ul
        initial={reduced ? false : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.15 }}
        className="pointer-events-auto flex items-end gap-1 rounded-[1.75rem] bg-background/95 p-2 neu-lg backdrop-blur-xl sm:gap-2 sm:p-2.5"
      >
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          const active = pathname === item.to;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium tracking-tight transition-colors neu-focus sm:h-16 sm:w-[4.5rem] sm:text-[11px]",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="dock-active"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                    className="absolute inset-0 rounded-2xl bg-background neu-inset"
                  />
                ) : null}
                <motion.span
                  className="relative z-10 flex flex-col items-center gap-1"
                  whileHover={reduced ? undefined : { y: -3 }}
                  whileTap={reduced ? undefined : { scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.4 : 1.9} aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.span>
                {active ? (
                  <motion.span
                    layoutId="dock-dot"
                    transition={
                      reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                    }
                    className="absolute -bottom-0.5 z-10 h-1 w-1 rounded-full bg-primary"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
