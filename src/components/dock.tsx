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
        className="pointer-events-auto relative flex items-end gap-1 rounded-full p-1.5 neu-lg gradient-stroke sm:gap-1.5 sm:p-2"
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
                  "group relative flex h-13 w-14 flex-col items-center justify-center gap-1 rounded-full text-[10px] font-medium tracking-tight transition-colors neu-focus sm:h-14 sm:w-[4.5rem] sm:text-[11px]",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active ? (
                  <>
                    <motion.span
                      layoutId="dock-active"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in oklab, var(--grad-cyan) 32%, transparent), color-mix(in oklab, var(--grad-violet) 34%, transparent) 55%, color-mix(in oklab, var(--grad-magenta) 30%, transparent))",
                        boxShadow:
                          "0 0 30px -6px color-mix(in oklab, var(--grad-violet) 75%, transparent), inset 0 0 0 1px var(--glass-stroke-strong)",
                      }}
                    />
                    <motion.span
                      layoutId="dock-glow"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                      }
                      className="absolute -bottom-1 h-1.5 w-8 rounded-full blur-[3px]"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--grad-cyan), var(--grad-magenta))",
                      }}
                    />
                  </>
                ) : null}
                <motion.span
                  className="relative z-10 flex flex-col items-center gap-1"
                  {...(reduced
                    ? {}
                    : {
                        whileHover: { y: -3 },
                        whileTap: { scale: 0.92 },
                        transition: { type: "spring" as const, stiffness: 420, damping: 24 },
                      })}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.3 : 1.8} aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.span>
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
