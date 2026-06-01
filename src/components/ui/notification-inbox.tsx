"use client";

import { useState, type ReactNode } from "react";
import { SwissPopover } from "./popover";
import { SwissAvatar } from "./avatar";
import { SwissEmptyState } from "./empty-state";
import { cn } from "@/lib/cn";

export type Notification = {
  id: string;
  who?: string;
  initials?: string;
  what: ReactNode;
  time: string;
  unread?: boolean;
};

type SwissNotificationInboxProps = {
  trigger: ReactNode;
  notifications: Notification[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
  align?: "start" | "center" | "end";
};

export function SwissNotificationInbox({
  trigger,
  notifications,
  onRead,
  onReadAll,
  align = "end",
}: SwissNotificationInboxProps) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <SwissPopover
      trigger={
        <span className="relative inline-flex">
          {trigger}
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[rgb(var(--swiss-accent))] px-1 swiss-mono text-[10px] font-medium text-[rgb(var(--swiss-paper))]">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </span>
      }
      align={align}
      className="w-80 p-0"
    >
      <div className="flex items-center justify-between border-b border-[rgb(var(--swiss-rule))] px-4 py-3">
        <div className="swiss-eyebrow">Notifications</div>
        {onReadAll && unreadCount > 0 ? (
          <button
            type="button"
            onClick={onReadAll}
            className="swiss-mono text-[11px] uppercase text-[rgb(var(--swiss-ink))] hover:underline"
          >
            Mark all read
          </button>
        ) : null}
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-3">
            <SwissEmptyState
              title="All caught up"
              description="You'll see new activity here."
              className="border-0 p-4"
            />
          </div>
        ) : (
          <ul>
            {notifications.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => onRead?.(n.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-[rgb(var(--swiss-rule))] px-4 py-3 text-left transition-colors duration-100 last:border-b-0",
                    n.unread
                      ? "bg-[rgb(var(--swiss-paper-2))] hover:bg-[rgb(var(--swiss-paper-2))]"
                      : "hover:bg-[rgb(var(--swiss-paper-2))]",
                  )}
                >
                  <SwissAvatar
                    initials={n.initials ?? n.who?.slice(0, 2).toUpperCase() ?? "··"}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs leading-snug text-[rgb(var(--swiss-ink))]">
                      {n.who ? (
                        <span className="font-medium">{n.who} </span>
                      ) : null}
                      <span className="text-[rgb(var(--swiss-ink-2))]">{n.what}</span>
                    </div>
                    <div className="mt-0.5 swiss-mono text-[10px] text-[rgb(var(--swiss-muted))]">{n.time}</div>
                  </div>
                  {n.unread ? (
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--swiss-accent))]" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SwissPopover>
  );
}

export function useSwissNotifications(initial: Notification[] = []) {
  const [items, setItems] = useState(initial);
  const markRead = (id: string) =>
    setItems((arr) => arr.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const markAllRead = () =>
    setItems((arr) => arr.map((n) => ({ ...n, unread: false })));
  return { items, setItems, markRead, markAllRead };
}
