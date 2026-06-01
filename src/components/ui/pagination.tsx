"use client";

import { cn } from "@/lib/cn";

type SwissPaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
  showLabels?: boolean;
};

export function SwissPagination({
  page,
  totalPages,
  onChange,
  className,
  showLabels,
}: SwissPaginationProps) {
  const pages = buildRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "inline-flex items-stretch border border-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      <PageBtn
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
          <path d="m15 18-6-6 6-6" />
        </svg>
        {showLabels ? <span className="ml-1 text-xs">Prev</span> : null}
      </PageBtn>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="flex items-center px-2 swiss-mono text-xs text-[rgb(var(--swiss-muted))] border-l border-[rgb(var(--swiss-rule))]">
            …
          </span>
        ) : (
          <PageBtn
            key={p}
            active={p === page}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            <span className="swiss-mono text-xs">{p}</span>
          </PageBtn>
        ),
      )}

      <PageBtn
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        {showLabels ? <span className="mr-1 text-xs">Next</span> : null}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </PageBtn>
    </nav>
  );
}

function PageBtn({
  children,
  active,
  ...props
}: {
  children: React.ReactNode;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center px-2.5 transition-colors duration-100",
        "border-l border-[rgb(var(--swiss-rule))] first:border-l-0",
        active
          ? "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]"
          : "text-[rgb(var(--swiss-ink-2))] hover:bg-[rgb(var(--swiss-paper-2))]",
        "disabled:pointer-events-none disabled:opacity-40",
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function buildRange(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  if (page > 3) out.push("…");
  for (let p = Math.max(2, page - 1); p <= Math.min(total - 1, page + 1); p++) {
    out.push(p);
  }
  if (page < total - 2) out.push("…");
  out.push(total);
  return out;
}
