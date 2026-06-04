"use client";

import { useState } from "react";
import { Section } from "@/components/dashboard/section";
import { ToggleRow } from "@/components/settings/toggle-row";

export type Settings = {
  emailNotifications: boolean;
  weeklyDigest: boolean;
  publicProfile: boolean;
};

export function SettingsClient({ initial }: { initial: Settings }) {
  const [s, setS] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);

  async function toggle(key: keyof Settings) {
    const next = { ...s, [key]: !s[key] };
    setS(next);
    setSaving(true);
    try {
      await fetch("/api/me/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: next[key] }),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="Email preferences" subtitle={saving ? "Saving..." : "Auto-saved"}>
        <ToggleRow
          enabled={s.emailNotifications}
          title="Application updates"
          desc="Get notified when status changes."
          onToggle={() => toggle("emailNotifications")}
        />
        <ToggleRow
          enabled={s.weeklyDigest}
          title="Weekly job digest"
          desc="Top matches every Monday."
          onToggle={() => toggle("weeklyDigest")}
        />
      </Section>
      <Section title="Privacy">
        <ToggleRow
          enabled={s.publicProfile}
          title="Show profile to recruiters"
          desc="Verified companies can find you in search."
          onToggle={() => toggle("publicProfile")}
        />
      </Section>
    </div>
  );
}
