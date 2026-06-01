"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  SwissCard,
  SwissCardDescription,
  SwissCardHeader,
  SwissCardTitle,
} from "./card";
import { SwissSwitch } from "./switch";
import { SwissSlider } from "./slider";
import { SwissSegmented } from "./segmented";

type SwissSettingsPanelProps = {
  className?: string;
};

export function SwissSettingsPanel({ className }: SwissSettingsPanelProps) {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [volume, setVolume] = useState(64);
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  return (
    <SwissCard className={cn("max-w-md", className)}>
      <SwissCardHeader>
        <SwissCardTitle>Preferences</SwissCardTitle>
        <SwissCardDescription>
          Manage how the app looks and behaves.
        </SwissCardDescription>
      </SwissCardHeader>

      <div className="divide-y divide-[rgb(var(--swiss-rule))]">
        <Row title="Notifications" description="Receive desktop alerts.">
          <SwissSwitch checked={notifications} onChange={setNotifications} />
        </Row>

        <Row title="Auto-save" description="Persist edits every few seconds.">
          <SwissSwitch checked={autoSave} onChange={setAutoSave} />
        </Row>

        <Row title="Anonymous analytics" description="Help us improve.">
          <SwissSwitch checked={analytics} onChange={setAnalytics} />
        </Row>

        <div className="py-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="swiss-eyebrow">Master volume</span>
            <span className="swiss-mono text-xs text-[rgb(var(--swiss-muted))]">{volume}%</span>
          </div>
          <SwissSlider value={volume} onChange={setVolume} />
        </div>

        <div className="py-4">
          <div className="mb-2 swiss-eyebrow">Density</div>
          <SwissSegmented
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" },
            ]}
            value={density}
            onChange={(v) => setDensity(v as "comfortable" | "compact")}
          />
        </div>
      </div>
    </SwissCard>
  );
}

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <div className="text-sm font-medium text-[rgb(var(--swiss-ink))]">{title}</div>
        {description ? <div className="text-xs text-[rgb(var(--swiss-muted))]">{description}</div> : null}
      </div>
      {children}
    </div>
  );
}
