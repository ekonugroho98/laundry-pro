"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SwissInputProps = InputHTMLAttributes<HTMLInputElement>;

export const SwissInput = forwardRef<HTMLInputElement, SwissInputProps>(
  function SwissInput({ className, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "relative h-11 w-full px-3 text-sm",
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
  },
);
