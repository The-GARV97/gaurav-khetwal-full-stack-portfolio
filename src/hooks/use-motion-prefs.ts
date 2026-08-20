import { useReducedMotion } from "framer-motion";

/** Press/hover feedback that disappears entirely under reduced-motion. */
export function usePress() {
  const reduced = useReducedMotion();
  if (reduced) return {};
  return {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { type: "spring" as const, stiffness: 420, damping: 28 },
  };
}

/** Staggered reveal container/child variants that flatten under reduced-motion. */
export function useStagger(delay = 0) {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: reduced ? {} : { staggerChildren: 0.07, delayChildren: delay },
    },
  };

  const item = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring" as const, stiffness: 260, damping: 26 },
        },
      };

  return { container, item, reduced };
}
