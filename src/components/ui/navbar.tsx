"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/components/theme-provider";

type NavItem = { label: string; href: string };

type SwissNavbarProps = {
  brand?: ReactNode;
  items?: NavItem[];
  className?: string;
};

const defaultItems: NavItem[] = [
  { label: "Overview", href: "/swiss-modernist" },
  { label: "Anatomy", href: "/swiss-modernist/anatomy" },
  { label: "Dashboard", href: "/swiss-modernist/dashboard" },
  { label: "Customers", href: "/swiss-modernist/customers" },
  { label: "Settings", href: "/swiss-modernist/settings" },
];

/**
 * Full-width rule-based navbar (NOT a floating pill).
 * Mono nav links — the Swiss signature move (Resend / Plain / Tuple do this).
 */
export function SwissNavbar({
  brand = "Component UI",
  items = defaultItems,
  className,
}: SwissNavbarProps) {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-30 w-full",
          "bg-[rgb(var(--swiss-paper)/0.85)] backdrop-blur-md",
          "border-b border-[rgb(var(--swiss-rule))]",
          className,
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/swiss-modernist" className="flex min-w-0 items-center gap-2">
            <span className="block h-3 w-3 bg-[rgb(var(--swiss-ink))]" aria-hidden />
            <span className="truncate text-[13px] font-medium tracking-tight">{brand}</span>
          </Link>

          <ul className="hidden items-center gap-6 sm:flex">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="swiss-mono text-[13px] text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))] transition-colors duration-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 border-l border-[rgb(var(--swiss-rule))] pl-3">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))] hover:bg-[rgb(var(--swiss-paper-2))] transition-colors"
            >
              {theme === "dark" ? "☾" : "☼"}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-8 w-8 items-center justify-center text-[rgb(var(--swiss-muted))] hover:text-[rgb(var(--swiss-ink))] sm:hidden"
            >
              {mobileOpen ? "✕" : "≡"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="overflow-hidden border-t border-[rgb(var(--swiss-rule))] sm:hidden"
            >
              <ul className="mx-auto flex w-full max-w-6xl flex-col px-6">
                {items.map((item) => (
                  <li key={item.label} className="border-b border-[rgb(var(--swiss-rule))] last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="swiss-mono block py-3 text-[13px] text-[rgb(var(--swiss-ink))]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </>
  );
}
