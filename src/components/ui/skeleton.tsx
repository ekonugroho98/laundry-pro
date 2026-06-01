"use client";

import { cn } from "@/lib/cn";

type SwissSkeletonProps = {
  className?: string;
};

export function SwissSkeleton({ className }: SwissSkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[rgb(var(--swiss-paper-2))] border border-[rgb(var(--swiss-rule))]",
        className,
      )}
    >
      <div
        className="absolute inset-0 -translate-x-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgb(var(--swiss-rule) / 0.6) 50%, transparent 100%)",
          animation: "swiss-shimmer 1.6s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes swiss-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
