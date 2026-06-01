"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type Side = "top" | "bottom" | "left" | "right";

type SwissTooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: Side;
  className?: string;
  multiline?: boolean;
  maxWidth?: number | string;
};

const sidePositions: Record<Side, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const sideOffsets: Record<Side, { x: number; y: number }> = {
  top: { x: 0, y: 4 },
  bottom: { x: 0, y: -4 },
  left: { x: 4, y: 0 },
  right: { x: -4, y: 0 },
};

export function SwissTooltip({
  content,
  children,
  side = "top",
  className,
  multiline,
  maxWidth = 200,
}: SwissTooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={id}>{children}</span>
      <AnimatePresence>
        {open ? (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, ...sideOffsets[side] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...sideOffsets[side] }}
            transition={{ duration: 0.1 }}
            style={
              multiline
                ? {
                    maxWidth:
                      typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
                  }
                : undefined
            }
            className={cn(
              "pointer-events-none absolute z-[60] px-2 py-1 swiss-mono text-[11px]",
              multiline ? "whitespace-normal" : "whitespace-nowrap",
              // Swiss tooltip: inverted ink fill, sharp corners.
              "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]",
              sidePositions[side],
              className,
            )}
          >
            <span className="relative z-10 block">{content}</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
