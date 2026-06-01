"use client";

import {
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { cn } from "@/lib/cn";

type SwissFileUploadProps = {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  description?: string;
};

export function SwissFileUpload({
  onFiles,
  accept,
  multiple,
  className,
  description = "Drag files here, or click to browse",
}: SwissFileUploadProps) {
  const [over, setOver] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const handle = (files: FileList | null) => {
    if (!files || !files.length) return;
    const arr = Array.from(files);
    setCount(arr.length);
    onFiles(arr);
  };

  return (
    <button
      type="button"
      onClick={() => ref.current?.click()}
      onDragOver={(e: DragEvent) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e: DragEvent) => {
        e.preventDefault();
        setOver(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 border border-dashed p-10 text-center transition-colors duration-100",
        over
          ? "border-[rgb(var(--swiss-ink))] bg-[rgb(var(--swiss-paper-2))]"
          : "border-[rgb(var(--swiss-rule-strong))] bg-[rgb(var(--swiss-paper))] hover:border-[rgb(var(--swiss-ink))]",
        "focus:outline-none focus:border-[rgb(var(--swiss-ink))]",
        className,
      )}
    >
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handle(e.target.files)}
        className="hidden"
      />
      <div className="flex h-10 w-10 items-center justify-center border border-[rgb(var(--swiss-rule-strong))] text-[rgb(var(--swiss-ink))]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <div className="text-sm font-medium text-[rgb(var(--swiss-ink))]">{description}</div>
      {count > 0 ? (
        <div className="swiss-mono text-xs text-[rgb(var(--swiss-muted))]">
          {count} file{count > 1 ? "s" : ""} selected
        </div>
      ) : (
        <div className="swiss-mono text-xs text-[rgb(var(--swiss-muted))]">{accept ?? "Any file"}</div>
      )}
    </button>
  );
}
