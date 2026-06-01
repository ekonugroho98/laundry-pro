"use client";

import { useState, type ReactNode } from "react";
import { SwissModal } from "./modal";
import { SwissButton } from "./button";

type Tone = "default" | "destructive";

type SwissConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: Tone;
};

export function SwissConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
}: SwissConfirmDialogProps) {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    try {
      setBusy(true);
      await onConfirm();
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <SwissModal open={open} onClose={busy ? () => {} : onClose}>
      <div className="flex items-start gap-3">
        <div
          className={
            tone === "destructive"
              ? "flex h-9 w-9 flex-none items-center justify-center border border-[rgb(var(--swiss-accent))] text-[rgb(var(--swiss-accent))]"
              : "flex h-9 w-9 flex-none items-center justify-center border border-[rgb(var(--swiss-rule))] text-[rgb(var(--swiss-ink))]"
          }
        >
          {tone === "destructive" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h2 className="swiss-headline text-base text-[rgb(var(--swiss-ink))]">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-[rgb(var(--swiss-muted))]">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2 border-t border-[rgb(var(--swiss-rule))] pt-4">
        <SwissButton variant="ghost" onClick={onClose} disabled={busy}>
          {cancelLabel}
        </SwissButton>
        <SwissButton
          variant={tone === "destructive" ? "destructive" : "primary"}
          loading={busy}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </SwissButton>
      </div>
    </SwissModal>
  );
}
