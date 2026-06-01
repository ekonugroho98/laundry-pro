"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RadioOption<T extends string> = {
  value: T;
  label: ReactNode;
  description?: string;
};

type SwissRadioGroupProps<T extends string> = {
  value: T;
  onChange: (next: T) => void;
  options: RadioOption<T>[];
  className?: string;
  orientation?: "vertical" | "horizontal";
};

export function SwissRadioGroup<T extends string>({
  value,
  onChange,
  options,
  className,
  orientation = "vertical",
}: SwissRadioGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        orientation === "vertical" ? "flex flex-col gap-2.5" : "flex flex-wrap gap-3",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <label
            key={opt.value}
            className="inline-flex cursor-pointer items-start gap-2.5"
          >
            <button
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative mt-0.5 flex h-[16px] w-[16px] flex-none items-center justify-center rounded-full transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--swiss-ink))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--swiss-paper))]",
                active
                  ? "border border-[rgb(var(--swiss-ink))]"
                  : "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
              )}
            >
              {active ? (
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--swiss-ink))]" />
              ) : null}
            </button>
            <span className="flex flex-col">
              <span className="text-sm leading-tight text-[rgb(var(--swiss-ink))]">{opt.label}</span>
              {opt.description ? (
                <span className="text-xs text-[rgb(var(--swiss-muted))]">{opt.description}</span>
              ) : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
