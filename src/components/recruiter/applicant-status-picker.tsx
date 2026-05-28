"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const stages = ["applied", "reviewing", "interview", "offer", "rejected"] as const;
type Stage = (typeof stages)[number];

export function ApplicantStatusPicker({
  id,
  initial,
}: {
  id: string;
  initial: string;
}) {
  const [status, setStatus] = useState<Stage>(
    (stages.includes(initial as Stage) ? initial : "applied") as Stage,
  );
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function change(next: Stage) {
    setSaving(true);
    setStatus(next);
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed");
      router.refresh();
    } catch {
      setStatus(status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(e) => change(e.target.value as Stage)}
      className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium capitalize text-slate-900 disabled:opacity-60"
    >
      {stages.map((s) => (
        <option key={s} value={s} className="capitalize">
          {s}
        </option>
      ))}
    </select>
  );
}
