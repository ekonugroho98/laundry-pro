"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type Side = "top" | "bottom" | "left" | "right";

type SwissPopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  side?: Side;
  align?: "start" | "center" | "end";
  className?: string;
};

const sidePositions: Record<Side, string> = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
  right: "left-full ml-2",
};

const alignPositions: Record<Side, Record<"start" | "center" | "end", string>> = {
  top: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  bottom: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  left: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
  right: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
};

export function SwissPopover({
  trigger,
  children,
  side = "bottom",
  align = "center",
  className,
}: SwissPopoverProps) {
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
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            initial={{ opacity: 0, y: side === "bottom" ? -2 : 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === "bottom" ? -2 : 2 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "absolute z-50 min-w-[14rem] p-4",
              "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
              sidePositions[side],
              alignPositions[side][align],
              className,
            )}
          >
            <div className="relative z-10">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
