"use client";

import { cn } from "@/lib/cn";

type Status = "online" | "offline" | "away" | "busy";

const statusStyles: Record<Status, string> = {
  online: "bg-[rgb(var(--swiss-ink))]",
  offline: "bg-transparent border border-[rgb(var(--swiss-rule-strong))]",
  away: "bg-[rgb(var(--swiss-muted))]",
  busy: "bg-[rgb(var(--swiss-accent))]",
};

const statusLabels: Record<Status, string> = {
  online: "Online",
  offline: "Offline",
  away: "Away",
  busy: "Busy",
};

type Size = "sm" | "md" | "lg";
const sizeStyles: Record<Size, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

type SwissStatusDotProps = {
  status?: Status;
  size?: Size;
  pulse?: boolean;
  className?: string;
  label?: string;
};

export function SwissStatusDot({
  status = "online",
  size = "md",
  pulse,
  className,
  label,
}: SwissStatusDotProps) {
  return (
    <span
      role="status"
      aria-label={label ?? statusLabels[status]}
      className={cn(
        "relative inline-flex flex-none items-center justify-center rounded-full",
        sizeStyles[size],
        statusStyles[status],
        className,
      )}
    >
      {pulse && status === "online" ? (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--swiss-ink))] opacity-50" />
      ) : null}
    </span>
  );
}
