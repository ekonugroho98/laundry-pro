"use client";

import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SwissSliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> & {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function SwissSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  ...props
}: SwissSliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn("swiss-slider relative h-9 w-full", className)}>
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[rgb(var(--swiss-rule-strong))]">
        <div
          className="h-full bg-[rgb(var(--swiss-ink))]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="swiss-slider-input absolute inset-0 z-10 w-full cursor-pointer appearance-none bg-transparent"
        {...props}
      />
      <style jsx>{`
        .swiss-slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 0;
          background: rgb(var(--swiss-ink));
          cursor: pointer;
          transition: background 0.1s;
        }
        .swiss-slider-input::-webkit-slider-thumb:hover {
          background: rgb(var(--swiss-ink-2));
        }
        .swiss-slider-input::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 0;
          background: rgb(var(--swiss-ink));
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
