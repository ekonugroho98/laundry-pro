"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type DropdownItem = {
  label: string;
  onSelect?: () => void;
  icon?: ReactNode;
  destructive?: boolean;
  separatorAfter?: boolean;
};

type SwissDropdownProps = {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
};

export function SwissDropdown({
  trigger,
  items,
  align = "start",
  className,
}: SwissDropdownProps) {
  const [open, setOpen] = useState(false);
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

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "absolute z-40 mt-1 min-w-[12rem] py-1",
              "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
              align === "end" ? "right-0" : "left-0",
              className,
            )}
          >
            {items.map((item, i) => (
              <div key={i}>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    item.onSelect?.();
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-1.5 text-sm transition-colors duration-100",
                    "hover:bg-[rgb(var(--swiss-paper-2))]",
                    item.destructive
                      ? "text-[rgb(var(--swiss-accent))]"
                      : "text-[rgb(var(--swiss-ink))]",
                  )}
                >
                  {item.icon ? (
                    <span className="flex h-4 w-4 items-center justify-center text-[rgb(var(--swiss-muted))]">
                      {item.icon}
                    </span>
                  ) : null}
                  {item.label}
                </button>
                {item.separatorAfter ? (
                  <div className="my-1 h-px bg-[rgb(var(--swiss-rule))]" />
                ) : null}
              </div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
