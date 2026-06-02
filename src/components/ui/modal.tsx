"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type SwissModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  hideCloseButton?: boolean;
};

export function SwissModal({
  open,
  onClose,
  children,
  className,
  hideCloseButton,
}: SwissModalProps) {
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

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 bg-[rgb(var(--swiss-ink)/0.4)]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 4, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "relative z-10 w-full max-w-md p-6",
              "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
              className,
            )}
          >
            <div className="relative z-10">{children}</div>
            {hideCloseButton ? null : (
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
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
