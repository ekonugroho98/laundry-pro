"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type AccordionItem = {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
};

type SwissAccordionProps = {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
};

export function SwissAccordion({
  items,
  multiple,
  defaultOpen = [],
  className,
}: SwissAccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const toggle = (v: string) => {
    setOpen((curr) => {
      if (curr.includes(v)) return curr.filter((x) => x !== v);
      return multiple ? [...curr, v] : [v];
    });
  };

  return (
    <div
      className={cn(
        "border-y border-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      {items.map((it, i) => {
        const isOpen = open.includes(it.value);
        return (
          <div
            key={it.value}
            className={cn(
              i !== 0 && "border-t border-[rgb(var(--swiss-rule))]",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(it.value)}
              className="flex w-full items-center justify-between gap-3 px-1 py-4 text-left text-sm text-[rgb(var(--swiss-ink))] transition-colors duration-100 hover:bg-[rgb(var(--swiss-paper-2))]"
            >
              <span className="font-medium">{it.trigger}</span>
              <span className="swiss-mono text-[rgb(var(--swiss-muted))] flex-none w-4 text-center">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="px-1 pb-5 text-sm leading-relaxed text-[rgb(var(--swiss-muted))]">
                    {it.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
