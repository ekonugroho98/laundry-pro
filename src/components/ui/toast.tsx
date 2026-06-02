"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type ToastTone = "neutral" | "success" | "error" | "info";

type ToastAction = {
  label: string;
  onClick: () => void;
};

type Toast = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
  action?: ToastAction;
  duration?: number;
};

type ToastContextValue = {
  push: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneIcon: Record<ToastTone, string> = {
  neutral: "·",
  success: "✓",
  error: "!",
  info: "i",
};

const toneLabel: Record<ToastTone, string> = {
  neutral: "INFO",
  success: "OK",
  error: "ERROR",
  info: "INFO",
};

export function SwissToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((curr) => curr.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((curr) => [...curr, { ...t, id }]);
      const duration = t.duration ?? 3500;
      if (duration !== Infinity) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-end justify-end gap-2 p-4 sm:p-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              role="status"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={cn(
                "pointer-events-auto flex w-80 max-w-full items-start gap-3 p-3",
                "bg-[rgb(var(--swiss-paper))] border",
                t.tone === "error"
                  ? "border-[rgb(var(--swiss-accent))]"
                  : "border-[rgb(var(--swiss-rule-strong))]",
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 flex-none items-center justify-center swiss-mono text-xs font-medium",
                  t.tone === "error"
                    ? "bg-[rgb(var(--swiss-accent))] text-[rgb(var(--swiss-paper))]"
                    : "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]",
                )}
              >
                {toneIcon[t.tone]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="swiss-eyebrow">{toneLabel[t.tone]}</span>
                </div>
                <div className="mt-0.5 text-sm font-medium text-[rgb(var(--swiss-ink))] truncate">
                  {t.title}
                </div>
                {t.description ? (
                  <div className="text-xs text-[rgb(var(--swiss-muted))]">{t.description}</div>
                ) : null}
              </div>
              {t.action ? (
                <button
                  type="button"
                  onClick={() => {
                    t.action?.onClick();
                    dismiss(t.id);
                  }}
                  className="self-center swiss-mono text-[11px] uppercase tracking-wide text-[rgb(var(--swiss-ink))] hover:underline"
                >
                  {t.action.label}
                </button>
              ) : null}
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => dismiss(t.id)}
                className="self-start text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))] transition-colors duration-100"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useSwissToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useSwissToast must be used within SwissToastProvider");
  return ctx;
}

export type { Toast, ToastTone, ToastAction };
