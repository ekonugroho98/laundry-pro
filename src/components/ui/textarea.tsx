"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SwissTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const SwissTextarea = forwardRef<
  HTMLTextAreaElement,
  SwissTextareaProps
>(function SwissTextarea({ className, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "relative w-full resize-y px-3 py-3 text-sm",
        "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))]",
        "border border-[rgb(var(--swiss-rule))]",
        "placeholder:text-[rgb(var(--swiss-muted))]",
        "transition-colors duration-100",
        "hover:border-[rgb(var(--swiss-rule-strong))]",
        "focus:outline-none focus:border-[rgb(var(--swiss-ink))]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
});
