"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "info" | "success" | "warning" | "error";

type SwissBannerProps = {
  tone?: Tone;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
};

const toneIcon: Record<Tone, ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  ),
};

const toneLabel: Record<Tone, string> = {
  info: "INFO",
  success: "OK",
  warning: "WARN",
  error: "ERROR",
};

const toneAccent: Record<Tone, string> = {
  info: "text-[rgb(var(--swiss-ink))]",
  success: "text-[rgb(var(--swiss-ink))]",
  warning: "text-[rgb(var(--swiss-ink))]",
  error: "text-[rgb(var(--swiss-accent))]",
};

export function SwissBanner({
  tone = "info",
  title,
  description,
  action,
  onDismiss,
  className,
}: SwissBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-4 p-4",
        "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))]",
        tone === "error" && "border-[rgb(var(--swiss-accent))]",
        className,
      )}
    >
      <div className={cn("flex h-7 w-7 flex-none items-center justify-center", toneAccent[tone])}>
        {toneIcon[tone]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="swiss-eyebrow">{toneLabel[tone]}</span>
          <span className="h-px flex-1 bg-[rgb(var(--swiss-rule))]" />
        </div>
        <div className="mt-1.5 text-sm font-medium text-[rgb(var(--swiss-ink))]">{title}</div>
        {description ? (
          <div className="mt-1 text-xs text-[rgb(var(--swiss-muted))]">{description}</div>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="flex h-6 w-6 flex-none items-center justify-center text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))] transition-colors duration-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
