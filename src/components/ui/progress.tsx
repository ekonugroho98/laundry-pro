"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type SwissProgressProps = {
  value: number;
  className?: string;
  /** Tone — accent uses the swiss accent, ink (default) uses paper-on-ink. */
  tone?: "ink" | "accent";
};

const toneFill: Record<NonNullable<SwissProgressProps["tone"]>, string> = {
  ink: "bg-[rgb(var(--swiss-ink))]",
  accent: "bg-[rgb(var(--swiss-accent))]",
};

export function SwissProgress({
  value,
  className,
  tone = "ink",
}: SwissProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-1 w-full overflow-hidden bg-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className={cn("h-full", toneFill[tone])}
      />
    </div>
  );
}
