"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Step = {
  label: ReactNode;
  description?: ReactNode;
};

type Orientation = "horizontal" | "vertical" | "responsive";

type SwissStepperProps = {
  steps: Step[];
  current: number;
  className?: string;
  orientation?: Orientation;
};

export function SwissStepper({
  steps,
  current,
  className,
  orientation = "horizontal",
}: SwissStepperProps) {
  const responsive = orientation === "responsive";
  const baseList =
    orientation === "vertical"
      ? "flex flex-col gap-4"
      : orientation === "horizontal"
        ? "flex w-full items-start"
        : "flex flex-col gap-4 sm:flex sm:w-full sm:flex-row sm:items-start sm:gap-0";

  return (
    <ol className={cn(baseList, className)}>
      {steps.map((s, i) => {
        const completed = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;

        const itemClass =
          orientation === "vertical"
            ? "flex items-start gap-3"
            : orientation === "horizontal"
              ? "flex flex-1 items-start gap-2"
              : "flex items-start gap-3 sm:flex-1 sm:gap-2";

        return (
          <li key={i} className={itemClass}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center swiss-mono text-xs font-medium transition-colors duration-100",
                  completed && "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]",
                  active && "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))] border border-[rgb(var(--swiss-ink))]",
                  !completed && !active && "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-muted))] border border-[rgb(var(--swiss-rule))]",
                )}
              >
                {completed ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {!isLast && (orientation === "vertical" || responsive) ? (
                <div
                  className={cn(
                    "my-1 h-8 w-px bg-[rgb(var(--swiss-rule))]",
                    responsive && "sm:hidden",
                  )}
                />
              ) : null}
            </div>

            <div
              className={cn(
                "min-w-0 flex-1",
                orientation === "horizontal" ? "mt-0.5 pr-2" : "pb-4",
                responsive && "sm:mt-0.5 sm:pb-0 sm:pr-2",
              )}
            >
              <div
                className={cn(
                  "swiss-eyebrow",
                  active ? "text-[rgb(var(--swiss-ink))]" : "text-[rgb(var(--swiss-muted))]",
                )}
              >
                {s.label}
              </div>
              {s.description ? (
                <div className="mt-0.5 text-[10px] text-[rgb(var(--swiss-muted))]">
                  {s.description}
                </div>
              ) : null}
            </div>

            {!isLast && (orientation === "horizontal" || responsive) ? (
              <div
                className={cn(
                  "mt-3.5 h-px flex-1 bg-[rgb(var(--swiss-rule))]",
                  responsive && "hidden sm:block",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
