"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon?: ReactNode;
  group?: string;
  onSelect: () => void;
};

type SwissCommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  commands: Command[];
  placeholder?: string;
};

export function SwissCommandPalette({
  open,
  onClose,
  commands,
  placeholder = "Type a command or search…",
}: SwissCommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group?.toLowerCase().includes(q) ||
        c.hint?.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of filtered) {
      const k = c.group ?? "General";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(c);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-[rgb(var(--swiss-ink)/0.4)]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -2, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className={cn(
              "relative z-10 w-full max-w-lg overflow-hidden",
              "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
            )}
          >
            <div className="flex items-center gap-3 border-b border-[rgb(var(--swiss-rule))] px-4 py-3">
              <SearchIcon className="h-4 w-4 text-[rgb(var(--swiss-muted))]" />
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
                    filtered[active]?.onSelect();
                    onClose();
                  }
                }}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm text-[rgb(var(--swiss-ink))] placeholder:text-[rgb(var(--swiss-muted))] focus:outline-none"
              />
              <kbd className="px-1.5 py-0.5 swiss-mono text-[10px] text-[rgb(var(--swiss-muted))] border border-[rgb(var(--swiss-rule))]">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-[rgb(var(--swiss-muted))]">
                  No results.
                </div>
              ) : (
                grouped.map(([group, list]) => (
                  <div key={group} className="border-b border-[rgb(var(--swiss-rule))] last:border-b-0">
                    <div className="px-3 pt-3 pb-1 swiss-eyebrow">
                      {group}
                    </div>
                    {list.map((c) => {
                      const idx = filtered.indexOf(c);
                      const isActive = idx === active;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => {
                            c.onSelect();
                            onClose();
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors duration-100",
                            isActive
                              ? "bg-[rgb(var(--swiss-paper-2))] text-[rgb(var(--swiss-ink))]"
                              : "text-[rgb(var(--swiss-ink-2))]",
                          )}
                        >
                          {c.icon ? (
                            <span className="flex h-5 w-5 items-center justify-center text-[rgb(var(--swiss-muted))]">
                              {c.icon}
                            </span>
                          ) : null}
                          <span className="flex-1">{c.label}</span>
                          {c.hint ? (
                            <span className="swiss-mono text-xs text-[rgb(var(--swiss-muted))]">{c.hint}</span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
