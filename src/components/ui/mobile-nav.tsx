"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { SwissDrawer } from "./drawer";
import { cn } from "@/lib/cn";

type MobileNavContextValue = {
  close: () => void;
};

const MobileNavContext = createContext<MobileNavContextValue | null>(null);

export function useSwissMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx)
    throw new Error("useSwissMobileNav must be used inside <SwissMobileNav>");
  return ctx;
}

type SwissMobileNavProps = {
  children: ReactNode;
  className?: string;
  side?: "left" | "right";
};

export function SwissMobileNav({
  children,
  className,
  side = "left",
}: SwissMobileNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-10 w-10 items-center justify-center transition-colors duration-100",
          "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))] hover:border-[rgb(var(--swiss-rule-strong))]",
          "text-[rgb(var(--swiss-ink))]",
          className,
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <MobileNavContext.Provider value={{ close }}>
        <SwissDrawer open={open} onClose={close} side={side} size="sm">
          {children}
        </SwissDrawer>
      </MobileNavContext.Provider>
    </>
  );
}
