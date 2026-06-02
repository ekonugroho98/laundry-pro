"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Side = "right" | "left" | "bottom";

type SwissDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: Side;
  size?: "sm" | "md" | "lg";
  className?: string;
};

type MotionVars = { x?: string | number; y?: string | number };

const sideStyles: Record<Side, { panel: string; from: MotionVars; to: MotionVars; border: string }> = {
  right: { panel: "top-0 right-0 h-full", from: { x: "100%" }, to: { x: 0 }, border: "border-l" },
  left: { panel: "top-0 left-0 h-full", from: { x: "-100%" }, to: { x: 0 }, border: "border-r" },
  bottom: {
    panel: "bottom-0 left-0 right-0",
    from: { y: "100%" },
    to: { y: 0 },
    border: "border-t",
  },
};

const sizeStyles = {
  right: {
    sm: "w-80 max-w-[calc(100vw-2rem)]",
    md: "w-96 max-w-[calc(100vw-2rem)]",
    lg: "w-[28rem] max-w-[calc(100vw-2rem)]",
  },
  left: {
    sm: "w-80 max-w-[calc(100vw-2rem)]",
    md: "w-96 max-w-[calc(100vw-2rem)]",
    lg: "w-[28rem] max-w-[calc(100vw-2rem)]",
  },
  bottom: { sm: "h-1/3", md: "h-1/2", lg: "h-2/3" },
};

export function SwissDrawer({
  open,
  onClose,
  children,
  side = "right",
  size = "md",
  className,
}: SwissDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const cfg = sideStyles[side];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            aria-label="Close drawer"
            onClick={onClose}
            className="absolute inset-0 bg-[rgb(var(--swiss-ink)/0.3)]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={cfg.from}
            animate={cfg.to}
            exit={cfg.from}
            transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute z-10 overflow-hidden",
              cfg.panel,
              cfg.border,
              "border-[rgb(var(--swiss-rule-strong))]",
              side === "bottom"
                ? `${sizeStyles.bottom[size]} w-full`
                : sizeStyles[side][size],
              "bg-[rgb(var(--swiss-paper))]",
              className,
            )}
          >
            <div className="relative z-10 flex h-full flex-col overflow-y-auto p-6">
              {children}
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center text-[rgb(var(--swiss-muted))] transition-colors duration-100 hover:text-[rgb(var(--swiss-ink))]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
