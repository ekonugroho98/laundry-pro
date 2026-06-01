"use client";

import { motion } from "motion/react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tab = {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
};

type SwissTabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (next: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/**
 * Swiss Tabs — UNDERLINE indicator (1px ink), distinct from Bento's filled box.
 * No background track. Bottom hairline rule defines the row.
 */
export function SwissTabs({
  tabs,
  value,
  onChange,
  orientation = "horizontal",
  className,
}: SwissTabsProps) {
  const layoutId = useId();
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "relative inline-flex gap-6",
        orientation === "horizontal"
          ? "flex-row border-b border-[rgb(var(--swiss-rule))]"
          : "flex-col border-l border-[rgb(var(--swiss-rule))] pl-4",
        className,
      )}
    >
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={cn(
              "relative inline-flex items-center gap-2 swiss-mono text-[12px] py-2.5 transition-colors duration-100",
              active
                ? "text-[rgb(var(--swiss-ink))]"
                : "text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink-2))]",
            )}
          >
            {/* Swiss signature: 1px underline indicator */}
            {active ? (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className={cn(
                  "absolute bg-[rgb(var(--swiss-ink))]",
                  orientation === "horizontal"
                    ? "-bottom-px left-0 right-0 h-px"
                    : "-left-4 top-0 bottom-0 w-px",
                )}
              />
            ) : null}
            {t.icon ? (
              <span className="flex h-4 w-4 items-center justify-center">
                {t.icon}
              </span>
            ) : null}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
