"use client";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Crumb = {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
};

type SwissBreadcrumbProps = {
  items: Crumb[];
  className?: string;
};

export function SwissBreadcrumb({ items, className }: SwissBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("inline-flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-2 swiss-mono text-[12px]">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          const inner = (
            <span
              className={cn(
                "transition-colors duration-100",
                last
                  ? "text-[rgb(var(--swiss-ink))]"
                  : "text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))]",
              )}
            >
              {it.label}
            </span>
          );
          return (
            <Fragment key={i}>
              <li>
                {last ? (
                  <span aria-current="page">{inner}</span>
                ) : it.href ? (
                  <Link href={it.href}>{inner}</Link>
                ) : it.onClick ? (
                  <button type="button" onClick={it.onClick}>
                    {inner}
                  </button>
                ) : (
                  inner
                )}
              </li>
              {!last ? (
                <li className="text-[rgb(var(--swiss-muted))]" aria-hidden>
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
