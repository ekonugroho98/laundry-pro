"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DockItem = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

type SwissDockProps = {
  items: DockItem[];
  className?: string;
};

/**
 * Swiss Dock — flat horizontal toolbar of square cells separated by hairlines.
 * No magnification animation — restraint is the point.
 */
export function SwissDock({ items, className }: SwissDockProps) {
  return (
    <div
      className={cn(
        "inline-flex items-stretch border border-[rgb(var(--swiss-rule-strong))] bg-[rgb(var(--swiss-paper))]",
        className,
      )}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          aria-label={item.label}
          onClick={item.onClick}
          className={cn(
            "relative flex h-11 w-11 items-center justify-center text-[rgb(var(--swiss-ink-2))] transition-colors duration-100 hover:bg-[rgb(var(--swiss-paper-2))] hover:text-[rgb(var(--swiss-ink))]",
            i > 0 && "border-l border-[rgb(var(--swiss-rule))]",
          )}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
