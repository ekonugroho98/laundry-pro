"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwissFormFieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children:
    | ReactNode
    | ((props: { id: string; "aria-invalid": boolean }) => ReactNode);
  className?: string;
};

export function SwissFormField({
  label,
  description,
  error,
  required,
  children,
  className,
}: SwissFormFieldProps) {
  const id = useId();
  const hasError = !!error;

  const rendered =
    typeof children === "function"
      ? children({ id, "aria-invalid": hasError })
      : children;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? (
        <label
          htmlFor={typeof children === "function" ? id : undefined}
          className="swiss-eyebrow flex items-center gap-1 text-[rgb(var(--swiss-muted))]"
        >
          {label}
          {required ? (
            <span className="text-[rgb(var(--swiss-accent))]" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div>{rendered}</div>

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-1 text-xs text-[rgb(var(--swiss-accent))]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-3 w-3 flex-none">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>{error}</span>
        </p>
      ) : description ? (
        <p className="text-xs text-[rgb(var(--swiss-muted))]">{description}</p>
      ) : null}
    </div>
  );
}
