"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type SelectOption<T extends string> = {
  value: T;
  label: ReactNode;
  description?: string;
};

type SwissSelectProps<T extends string> = {
  value: T | null;
  onChange: (next: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
};

export function SwissSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder = "Select…",
  searchable,
  disabled,
  className,
}: SwissSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = query
    ? options.filter((o) =>
        String(o.label).toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "relative flex h-11 w-full items-center justify-between px-3 text-sm",
          "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))]",
          "border border-[rgb(var(--swiss-rule))]",
          "transition-colors duration-100 hover:border-[rgb(var(--swiss-rule-strong))]",
          "focus:outline-none focus:border-[rgb(var(--swiss-ink))]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        <span className={cn("truncate", selected ? "text-[rgb(var(--swiss-ink))]" : "text-[rgb(var(--swiss-muted))]")}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("h-4 w-4 text-[rgb(var(--swiss-muted))] transition-transform", open && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "absolute left-0 right-0 z-40 mt-1 max-h-72 overflow-hidden",
              "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
            )}
          >
            <div className="relative z-10">
              {searchable ? (
                <div className="border-b border-[rgb(var(--swiss-rule))] p-2">
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActive(0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setActive((a) => Math.min(a + 1, filtered.length - 1));
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setActive((a) => Math.max(a - 1, 0));
                      } else if (e.key === "Enter") {
                        e.preventDefault();
                        if (filtered[active]) {
                          onChange(filtered[active].value);
                          setOpen(false);
                          setQuery("");
                        }
                      }
                    }}
                    placeholder="Search…"
                    className="w-full bg-transparent px-2 py-1.5 text-sm text-[rgb(var(--swiss-ink))] placeholder:text-[rgb(var(--swiss-muted))] focus:outline-none"
                  />
                </div>
              ) : null}
              <ul className="max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <li className="px-3 py-4 text-center text-xs text-[rgb(var(--swiss-muted))]">
                    No options
                  </li>
                ) : (
                  filtered.map((opt, i) => {
                    const isActive = i === active;
                    const isSelected = opt.value === value;
                    return (
                      <li key={opt.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => {
                            onChange(opt.value);
                            setOpen(false);
                            setQuery("");
                          }}
                          className={cn(
                            "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors duration-100",
                            isActive ? "bg-[rgb(var(--swiss-paper-2))]" : "",
                            isSelected ? "text-[rgb(var(--swiss-ink))] font-medium" : "text-[rgb(var(--swiss-ink-2))]",
                          )}
                        >
                          <span className="flex flex-col">
                            <span>{opt.label}</span>
                            {opt.description ? (
                              <span className="text-xs text-[rgb(var(--swiss-muted))]">{opt.description}</span>
                            ) : null}
                          </span>
                          {isSelected ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          ) : null}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
