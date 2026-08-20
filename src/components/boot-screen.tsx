import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { profile } from "@/data/portfolio";

const steps = ["mounting runtime", "loading modules", "hydrating interface"];

export function BootScreen() {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const ticks = steps.map((_, i) => window.setTimeout(() => setStep(i + 1), 220 * (i + 1)));
    const end = window.setTimeout(() => setDone(true), 1100);
    return () => {
      ticks.forEach(window.clearTimeout);
      window.clearTimeout(end);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {done ? null : (
        <motion.div
          key="boot"
          role="status"
          aria-live="polite"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="flex size-20 items-center justify-center rounded-3xl bg-background font-display text-xl font-bold text-primary neu-lg"
          >
            {profile.initials}
          </motion.div>

          <div className="h-1.5 w-44 overflow-hidden rounded-full bg-background neu-inset">
            <motion.div
              initial={{ width: "5%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-full rounded-full bg-primary"
            />
          </div>

          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            {steps[Math.min(step, steps.length - 1)]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
