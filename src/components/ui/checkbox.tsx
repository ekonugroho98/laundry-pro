"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwissCheckboxProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function SwissCheckbox({
  checked,
  onChange,
  label,
  description,
  disabled,
  className,
}: SwissCheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex items-start gap-2.5",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 flex h-[16px] w-[16px] flex-none items-center justify-center transition-colors duration-100",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--swiss-ink))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--swiss-paper))]",
          checked
            ? "bg-[rgb(var(--swiss-ink))] border border-[rgb(var(--swiss-ink))]"
            : "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 text-[rgb(var(--swiss-paper))]"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : null}
      </button>
      {(label || description) && (
        <span className="flex flex-col">
          {label ? <span className="text-sm leading-tight text-[rgb(var(--swiss-ink))]">{label}</span> : null}
          {description ? (
            <span className="text-xs text-[rgb(var(--swiss-muted))]">{description}</span>
          ) : null}
        </span>
      )}
    </label>
  );
}
