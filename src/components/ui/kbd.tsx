"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwissKbdProps = {
  children: ReactNode;
  className?: string;
};

export function SwissKbd({ children, className }: SwissKbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center px-1 swiss-mono text-[10px] font-medium",
        "bg-[rgb(var(--swiss-paper-2))] text-[rgb(var(--swiss-ink-2))]",
        "border border-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
