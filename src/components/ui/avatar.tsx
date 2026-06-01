"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

const sizeStyles: Record<Size, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

type SwissAvatarProps = HTMLAttributes<HTMLSpanElement> & {
  src?: string;
  alt?: string;
  initials?: string;
  size?: Size;
};

export function SwissAvatar({
  src,
  alt,
  initials,
  size = "md",
  className,
  ...props
}: SwissAvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium",
        "bg-[rgb(var(--swiss-ink))] text-[rgb(var(--swiss-paper))]",
        "swiss-mono",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" />
      ) : (
        <span className="relative z-10">{initials}</span>
      )}
    </span>
  );
}

type SwissAvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  max?: number;
};

export function SwissAvatarGroup({
  className,
  children,
  max = 4,
  ...props
}: SwissAvatarGroupProps) {
  const arr = Array.isArray(children) ? children : [children];
  const visible = arr.slice(0, max);
  const overflow = arr.length - visible.length;
  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visible.map((child, i) => (
        <span key={i} className="rounded-full ring-2 ring-[rgb(var(--swiss-paper))]">
          {child}
        </span>
      ))}
      {overflow > 0 ? (
        <SwissAvatar
          initials={`+${overflow}`}
          className="ring-2 ring-[rgb(var(--swiss-paper))]"
        />
      ) : null}
    </div>
  );
}
