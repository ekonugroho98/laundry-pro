"use client";

import { cn } from "@/lib/cn";

export type SwissSegmentedOption = { value: string; label: string };

type SwissSegmentedProps = {
  options: SwissSegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * Swiss segmented — outline container divided by vertical hairlines.
 * Active segment is flat ink fill, no slide animation. Instant swap.
 */
export function SwissSegmented({ options, value, onChange, className }: SwissSegmentedProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-stretch border border-[rgb(var(--swiss-rule-strong))]",
        className,
      )}
    >
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "swiss-mono px-3 py-1.5 text-[12px] transition-colors duration-100",
              i > 0 && "border-l border-[rgb(var(--swiss-rule-strong))]",
              active
                ? "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]"
                : "text-[rgb(var(--swiss-ink-2))] hover:bg-[rgb(var(--swiss-paper-2))]",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
