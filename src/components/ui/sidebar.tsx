"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SidebarItem = {
  label: string;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
};

type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

type SwissSidebarProps = {
  brand?: ReactNode;
  sections: SidebarSection[];
  footer?: ReactNode;
  className?: string;
  embedded?: boolean;
};

export function SwissSidebar({
  brand,
  sections,
  footer,
  className,
  embedded,
}: SwissSidebarProps) {
  return (
    <aside
      className={cn(
        embedded
          ? "flex h-full w-full flex-col"
          : [
              "flex h-full w-64 flex-col p-4",
              "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))]",
            ],
        className,
      )}
    >
      <div className="flex h-full flex-col gap-5">
        {brand ? <div className="px-1 pb-3 border-b border-[rgb(var(--swiss-rule))]">{brand}</div> : null}

        <nav className="flex-1 space-y-5 overflow-y-auto">
          {sections.map((section, i) => (
            <div key={i}>
              {section.title ? (
                <div className="mb-2 px-1 swiss-eyebrow">
                  {section.title}
                </div>
              ) : null}
              <ul>
                {section.items.map((item, j) => {
                  const itemClass = cn(
                    "flex w-full items-center gap-2.5 px-2 py-1.5 swiss-mono text-[13px] text-left transition-colors duration-100",
                    item.active
                      ? "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]"
                      : "text-[rgb(var(--swiss-muted))] hover:bg-[rgb(var(--swiss-paper-2))] hover:text-[rgb(var(--swiss-ink))]",
                  );
                  const inner = (
                    <>
                      {item.icon ? (
                        <span className="flex h-4 w-4 items-center justify-center">
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="flex-1">{item.label}</span>
                      {item.badge ? (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 text-[10px]",
                            item.active
                              ? "bg-[rgb(var(--swiss-paper)/0.2)] text-[rgb(var(--swiss-paper))]"
                              : "border border-[rgb(var(--swiss-rule))] text-[rgb(var(--swiss-ink-2))]",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </>
                  );
                  return (
                    <li key={j}>
                      {item.onClick ? (
                        <button
                          type="button"
                          onClick={item.onClick}
                          aria-current={item.active ? "page" : undefined}
                          className={itemClass}
                        >
                          {inner}
                        </button>
                      ) : (
                        <a
                          href={item.href ?? "#"}
                          aria-current={item.active ? "page" : undefined}
                          className={itemClass}
                        >
                          {inner}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {footer ? (
          <div className="border-t border-[rgb(var(--swiss-rule))] pt-3">
            {footer}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
