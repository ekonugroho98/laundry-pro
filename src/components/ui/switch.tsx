"use client";

import { cn } from "@/lib/cn";

type SwissSwitchProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function SwissSwitch({
  checked,
  onChange,
  label,
  disabled,
  className,
}: SwissSwitchProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-3",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-10 transition-colors duration-100",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--swiss-ink))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--swiss-paper))]",
          checked
            ? "bg-[rgb(var(--swiss-ink))]"
            : "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 transition-[left] duration-100",
            checked
              ? "left-[1.375rem] bg-[rgb(var(--swiss-paper))]"
              : "left-0.5 bg-[rgb(var(--swiss-ink))]",
          )}
        />
      </button>
      {label ? <span className="text-sm text-[rgb(var(--swiss-ink))]">{label}</span> : null}
    </label>
  );
}
