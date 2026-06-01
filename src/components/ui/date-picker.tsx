"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type SwissDatePickerProps = {
  value: Date | null;
  onChange: (next: Date) => void;
  placeholder?: string;
  className?: string;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function SwissDatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: SwissDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(value ?? new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const days = useMemo(() => buildMonth(view), [view]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex h-11 w-full items-center justify-between px-3 text-sm",
          "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))]",
          "border border-[rgb(var(--swiss-rule))]",
          "transition-colors duration-100 hover:border-[rgb(var(--swiss-rule-strong))]",
          "focus:outline-none focus:border-[rgb(var(--swiss-ink))]",
        )}
      >
        <span className={cn("swiss-mono text-[13px]", value ? "text-[rgb(var(--swiss-ink))]" : "text-[rgb(var(--swiss-muted))]")}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[rgb(var(--swiss-muted))]">
          <rect x="3" y="4" width="18" height="18" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "absolute left-0 z-40 mt-1 w-72 p-3",
              "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
            )}
          >
            <div className="mb-3 flex items-center justify-between border-b border-[rgb(var(--swiss-rule))] pb-2">
              <button
                type="button"
                onClick={() => setView(addMonths(view, -1))}
                className="flex h-7 w-7 items-center justify-center swiss-mono text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))] transition-colors"
                aria-label="Previous month"
              >
                ‹
              </button>
              <span className="swiss-mono text-sm text-[rgb(var(--swiss-ink))]">
                {MONTHS[view.getMonth()]} {view.getFullYear()}
              </span>
              <button
                type="button"
                onClick={() => setView(addMonths(view, 1))}
                className="flex h-7 w-7 items-center justify-center swiss-mono text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))] transition-colors"
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7">
              {DAYS.map((d, i) => (
                <div
                  key={i}
                  className="text-center swiss-eyebrow"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {days.map((d, i) => {
                const inMonth = d.getMonth() === view.getMonth();
                const isSelected =
                  value &&
                  d.getFullYear() === value.getFullYear() &&
                  d.getMonth() === value.getMonth() &&
                  d.getDate() === value.getDate();
                const isToday = isSameDay(d, new Date());
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onChange(d);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex h-8 items-center justify-center swiss-mono text-xs transition-colors duration-100",
                      !inMonth && "text-[rgb(var(--swiss-muted))] opacity-50",
                      inMonth && !isSelected && "text-[rgb(var(--swiss-ink-2))] hover:bg-[rgb(var(--swiss-paper-2))]",
                      isSelected && "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]",
                      isToday && !isSelected && "border border-[rgb(var(--swiss-ink))]",
                    )}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function buildMonth(view: Date): Date[] {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startOffset = first.getDay();
  const start = new Date(first);
  start.setDate(start.getDate() - startOffset);
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function addMonths(d: Date, n: number): Date {
  const next = new Date(d);
  next.setMonth(next.getMonth() + n);
  return next;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
