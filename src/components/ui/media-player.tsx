"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type SwissMediaPlayerProps = {
  title?: string;
  artist?: string;
  cover?: string;
  className?: string;
};

export function SwissMediaPlayer({
  title = "Untitled",
  artist = "Component UI",
  cover,
  className,
}: SwissMediaPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(38);

  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm items-center gap-3 p-3",
        "bg-[rgb(var(--swiss-paper))] border border-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      <div className="flex w-full items-center gap-3">
        <div
          className={cn(
            "flex h-12 w-12 flex-none items-center justify-center overflow-hidden",
            "bg-[rgb(var(--swiss-ink))]",
          )}
        >
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="swiss-mono text-[rgb(var(--swiss-paper))] text-xs">♪</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="truncate text-sm font-medium text-[rgb(var(--swiss-ink))]">{title}</div>
          <div className="truncate swiss-mono text-xs text-[rgb(var(--swiss-muted))]">{artist}</div>
          <div className="mt-2 h-px bg-[rgb(var(--swiss-rule))]">
            <div
              className="h-full bg-[rgb(var(--swiss-ink))]"
              style={{ width: `${progress}%`, height: "1px" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <PlayerBtn
            label="Previous"
            onClick={() => setProgress((p) => Math.max(0, p - 10))}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M6 4h2v16H6zM10 12l10-7v14z" />
            </svg>
          </PlayerBtn>
          <PlayerBtn
            label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            primary
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M7 5v14l12-7z" />
              </svg>
            )}
          </PlayerBtn>
          <PlayerBtn
            label="Next"
            onClick={() => setProgress((p) => Math.min(100, p + 10))}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M16 4h2v16h-2zM4 19l10-7L4 5z" />
            </svg>
          </PlayerBtn>
        </div>
      </div>
    </div>
  );
}

function PlayerBtn({
  children,
  label,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center transition-colors duration-100",
        primary
          ? "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))] hover:bg-[rgb(var(--swiss-ink-2))]"
          : "bg-transparent text-[rgb(var(--swiss-ink-2))] hover:bg-[rgb(var(--swiss-paper-2))]",
      )}
    >
      {children}
    </button>
  );
}
