"use client";

import { cn } from "@/lib/cn";

type Size = "xs" | "sm" | "md" | "lg";

const sizeStyles: Record<Size, string> = {
  xs: "h-3 w-3 border-[1.5px]",
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[3px]",
};

type SwissSpinnerProps = {
  size?: Size;
  className?: string;
  label?: string;
};

export function SwissSpinner({
  size = "sm",
  className,
  label = "Loading",
}: SwissSpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block animate-spin rounded-full",
        "border-[rgb(var(--swiss-ink))] border-r-transparent border-t-transparent",
        sizeStyles[size],
        className,
      )}
    />
  );
}
