"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "ink" | "outline" | "mono" | "accent";

const toneStyles: Record<Tone, string> = {
  ink: "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))] px-2 py-0.5 text-[11px] uppercase tracking-wide font-medium",
  outline: "border border-[rgb(var(--swiss-rule-strong))] text-[rgb(var(--swiss-ink-2))] bg-transparent px-2 py-0.5 text-[11px]",
  mono: "swiss-mono text-[11px] text-[rgb(var(--swiss-muted))]",
  accent: "border border-[rgb(var(--swiss-accent))] text-[rgb(var(--swiss-accent))] bg-transparent px-2 py-0.5 text-[11px] uppercase tracking-wide font-medium",
};

export function SwissBadge({
  className,
  tone = "outline",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", toneStyles[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}
