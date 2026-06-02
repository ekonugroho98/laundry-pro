"use client";

import { useEffect, useState } from "react";
import { SwissButton } from "@/components/ui/button";
import { SwissInput } from "@/components/ui/input";
import { SwissBadge } from "@/components/ui/badge";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[rgb(var(--swiss-paper))]">
      <header className="border-b border-[rgb(var(--swiss-rule))] p-8 flex justify-between items-end">
        <div>
          <p className="swiss-eyebrow mb-2">Configuration / 09</p>
          <h1 className="swiss-display text-4xl">Settings</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-8 py-6">
        <section className="mb-8">
          <h2 className="swiss-headline text-2xl uppercase tracking-tight mb-4">Appearance</h2>
          <div className="flex items-center space-x-4">
            <Moon className="h-5 w-5 text-[rgb(var(--swiss-muted))]" />
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isDark}
                onChange={(e) => setIsDark(e.target.checked)}
                className="h-4 w-4 text-[rgb(var(--swiss-accent))] focus:ring-[rgb(var(--swiss-accent))]"
              />
              <span className="text-sm font-medium text-[rgb(var(--swiss-ink))]">Dark Mode</span>
            </label>
            <Sun className="h-5 w-5 text-[rgb(var(--swiss-muted))]" />
          </div>
          <p className="mt-2 text-[rgb(var(--swiss-muted))] text-sm">
            Changes apply instantly and persist across sessions.
          </p>
        </section>

        <section className="border-t border-[rgb(var(--swiss-rule))] pt-6">
          <h2 className="swiss-headline text-2xl uppercase tracking-tight mb-4">Application Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="swiss-eyebrow">Version</p>
              <p className="swiss-display">1.0.0</p>
            </div>
            <div>
              <p className="swiss-eyebrow">Build Date</p>
              <p className="swiss-display">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="swiss-eyebrow">Environment</p>
              <p className="swiss-badge">
                <SwissBadge tone="accent">Production</SwissBadge>
              </p>
            </div>
            <div>
              <p className="swiss-eyebrow">Database</p>
              <p className="swiss-badge">
                <SwissBadge tone="accent">PostgreSQL (Neon)</SwissBadge>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
