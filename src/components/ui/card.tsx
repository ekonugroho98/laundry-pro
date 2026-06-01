"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwissCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Optional eyebrow (mono uppercase label rendered above content with a bottom rule). */
  eyebrow?: ReactNode;
};

export const SwissCard = forwardRef<HTMLDivElement, SwissCardProps>(
  function SwissCard({ className, children, eyebrow, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[rgb(var(--swiss-paper))] text-[rgb(var(--swiss-ink))]",
          "border border-[rgb(var(--swiss-rule))]",
          "p-6",
          className,
        )}
        {...props}
      >
        {eyebrow ? (
          <div className="mb-4 flex items-center justify-between border-b border-[rgb(var(--swiss-rule))] pb-3">
            <span className="swiss-eyebrow">{eyebrow}</span>
          </div>
        ) : null}
        {children}
      </div>
    );
  },
);

export function SwissCardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 pb-3 border-b border-[rgb(var(--swiss-rule))]", className)} {...props} />;
}

export function SwissCardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("swiss-headline text-xl", className)}
      {...props}
    />
  );
}

export function SwissCardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 text-sm text-[rgb(var(--swiss-muted))] leading-relaxed", className)}
      {...props}
    />
  );
}
