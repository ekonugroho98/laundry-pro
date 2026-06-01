"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Trend = "up" | "down" | "flat";

type SwissStatCardProps = {
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
  caption?: ReactNode;
  className?: string;
};

const trendSymbol: Record<Trend, string> = {
  up: "↑",
  down: "↓",
  flat: "—",
};

export function SwissStatCard({
  label,
  value,
  delta,
  trend = "flat",
  caption,
  className,
}: SwissStatCardProps) {
  return (
    <div
      className={cn(
        "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))]",
        "border border-[rgb(var(--swiss-rule))]",
        "p-6 flex flex-col gap-3",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[rgb(var(--swiss-rule))] pb-2">
        <span className="swiss-eyebrow">{label}</span>
        {delta ? (
          <span className="swiss-mono text-[11px] text-[rgb(var(--swiss-muted))]">
            {trendSymbol[trend]} {delta}
          </span>
        ) : null}
      </div>
      <div className="swiss-display swiss-fig text-5xl">{value}</div>
      {caption ? (
        <div className="swiss-mono text-[11px] text-[rgb(var(--swiss-muted))] mt-auto pt-2 border-t border-[rgb(var(--swiss-rule))]">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
