"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type TableColumn<T> = {
  key: string;
  header: ReactNode;
  cell?: (row: T, index: number) => ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
  sort?: "asc" | "desc" | null;
  onSort?: () => void;
};

type SwissTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  empty?: ReactNode;
  className?: string;
};

export function SwissTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  selectable,
  selectedKeys,
  onSelectionChange,
  empty,
  className,
}: SwissTableProps<T>) {
  const allSelected =
    selectable && data.length > 0 && data.every((r, i) => selectedKeys?.has(rowKey(r, i)));

  const toggleAll = () => {
    if (!onSelectionChange) return;
    if (allSelected) onSelectionChange(new Set());
    else onSelectionChange(new Set(data.map((r, i) => rowKey(r, i))));
  };

  const toggle = (key: string) => {
    if (!onSelectionChange || !selectedKeys) return;
    const next = new Set(selectedKeys);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onSelectionChange(next);
  };

  return (
    <div
      className={cn(
        "overflow-hidden bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgb(var(--swiss-rule-strong))]">
              {selectable ? (
                <th className="w-10 px-4 py-3 text-left">
                  <Checkbox
                    checked={!!allSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
              ) : null}
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  style={c.width ? { width: c.width } : undefined}
                  className={cn(
                    "px-4 py-3 swiss-eyebrow text-left",
                    c.align === "right" && "text-right",
                    c.align === "center" && "text-center",
                  )}
                >
                  {c.onSort ? (
                    <button
                      type="button"
                      onClick={c.onSort}
                      className="inline-flex items-center gap-1 hover:text-[rgb(var(--swiss-ink))] transition-colors duration-100"
                    >
                      {c.header}
                      <SortIcon dir={c.sort ?? null} />
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-[rgb(var(--swiss-muted))]"
                >
                  {empty ?? "No data"}
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const key = rowKey(row, i);
                const isSel = selectedKeys?.has(key) ?? false;
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "border-b border-[rgb(var(--swiss-rule))] transition-colors duration-100 last:border-b-0",
                      onRowClick && "cursor-pointer",
                      onRowClick && "hover:bg-[rgb(var(--swiss-paper-2))]",
                      isSel && "bg-[rgb(var(--swiss-paper-2))]",
                    )}
                  >
                    {selectable ? (
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isSel}
                          onChange={() => toggle(key)}
                          aria-label="Select row"
                        />
                      </td>
                    ) : null}
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={cn(
                          "px-4 py-3 text-[rgb(var(--swiss-ink-2))]",
                          c.align === "right" && "text-right",
                          c.align === "center" && "text-center",
                        )}
                      >
                        {c.cell
                          ? c.cell(row, i)
                          : ((row as Record<string, ReactNode>)[c.key] ?? null)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  ...props
}: {
  checked: boolean;
  onChange: () => void;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "flex h-[16px] w-[16px] items-center justify-center transition-colors duration-100",
        checked
          ? "bg-[rgb(var(--swiss-ink))] border border-[rgb(var(--swiss-ink))]"
          : "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule-strong))]",
      )}
      {...props}
    >
      {checked ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3 text-[rgb(var(--swiss-paper))]"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : null}
    </button>
  );
}

function SortIcon({ dir }: { dir: "asc" | "desc" | null }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-3 w-3", dir ? "text-[rgb(var(--swiss-ink))]" : "text-[rgb(var(--swiss-muted))]")}
    >
      {dir === "asc" ? (
        <path d="m18 15-6-6-6 6" />
      ) : dir === "desc" ? (
        <path d="m6 9 6 6 6-6" />
      ) : (
        <>
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </>
      )}
    </svg>
  );
}
