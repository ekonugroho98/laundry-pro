"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwissEmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SwissEmptyState({
  icon,
  title,
  description,
  action,
  className,
}: SwissEmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
        "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center border border-[rgb(var(--swiss-rule))] text-[rgb(var(--swiss-muted))]">
        {icon ?? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </svg>
        )}
      </div>
      <div>
        <div className="swiss-headline text-sm text-[rgb(var(--swiss-ink))]">{title}</div>
        {description ? (
          <div className="mt-1 max-w-sm text-xs text-[rgb(var(--swiss-muted))]">{description}</div>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
