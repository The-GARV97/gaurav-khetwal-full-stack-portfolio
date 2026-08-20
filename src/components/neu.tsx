import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { usePress } from "@/hooks/use-motion-prefs";

/** Raised neumorphic surface. */
export const NeuSurface = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("rounded-2xl bg-background neu", className)}
      {...props}
    />
  ),
);
NeuSurface.displayName = "NeuSurface";

/** Recessed neumorphic well — used for inputs, terminals and code panes. */
export const NeuWell = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("rounded-2xl bg-background neu-inset", className)}
      {...props}
    />
  ),
);
NeuWell.displayName = "NeuWell";

type NeuButtonProps = HTMLMotionProps<"button"> & {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
};

const variantClass: Record<NonNullable<NeuButtonProps["variant"]>, string> = {
  default: "bg-background text-foreground neu-interactive",
  primary:
    "bg-background text-primary neu-interactive ring-1 ring-inset ring-primary/25 font-semibold",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground neu-focus",
};

const sizeClass: Record<NonNullable<NeuButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-13 px-7 text-base rounded-2xl",
  icon: "size-11 rounded-xl",
};

export const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const press = usePress();
    return (
      <motion.button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 font-medium tracking-tight select-none disabled:cursor-not-allowed disabled:opacity-60",
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        {...press}
        {...props}
      />
    );
  },
);
NeuButton.displayName = "NeuButton";

export function NeuChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-background px-2.5 py-1 font-mono text-[11px] tracking-tight text-muted-foreground neu-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-xs tracking-[0.28em] text-primary uppercase">{eyebrow}</p>
      <h1 className="text-3xl font-bold text-balance sm:text-4xl md:text-5xl">{title}</h1>
      {lead ? <p className="mt-4 text-base text-muted-foreground text-pretty">{lead}</p> : null}
    </header>
  );
}
