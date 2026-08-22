import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Screen container: gives every route the same app-screen entrance and padding. */
export function Page({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 240, damping: 28, mass: 0.7 }}
      className={cn(
        "mx-auto w-full max-w-5xl px-4 pt-4 pb-36 sm:px-6 sm:pb-40",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
