"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "primary" | "ghost" | "outline" | "destructive";
type Size = "sm" | "md" | "lg";

type SwissButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
  loading?: boolean;
};

const variantStyles: Record<Variant, string> = {
  default: [
    "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))]",
    "border border-[rgb(var(--swiss-rule))]",
    "hover:border-[rgb(var(--swiss-rule-strong))]",
  ].join(" "),
  primary: [
    "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]",
    "border border-[rgb(var(--swiss-ink))]",
    "hover:bg-[rgb(var(--swiss-ink-2))]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[rgb(var(--swiss-ink))]",
    "hover:bg-[rgb(var(--swiss-paper-2))]",
  ].join(" "),
  outline: [
    "bg-transparent text-[rgb(var(--swiss-ink))]",
    "border border-[rgb(var(--swiss-rule-strong))]",
    "hover:bg-[rgb(var(--swiss-paper-2))]",
  ].join(" "),
  destructive: [
    "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-accent))]",
    "border border-[rgb(var(--swiss-accent))]",
    "hover:bg-[rgb(var(--swiss-accent)/0.06)]",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "h-7 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-[15px]",
};

export const SwissButton = forwardRef<HTMLButtonElement, SwissButtonProps>(
  function SwissButton(
    { className, variant = "default", size = "md", children, loading, disabled, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-colors duration-100",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--swiss-ink))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--swiss-paper))]",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
