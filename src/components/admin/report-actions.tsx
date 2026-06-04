"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReportActions({ id }: { id: string }) {
  const [busy, setBusy] = useState<string | null>(null);
  const router = useRouter();

  async function decide(status: "resolved" | "dismissed") {
    setBusy(status);
    try {
      const res = await fetch(`/api/admin/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => decide("resolved")}
        disabled={busy !== null}
        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {busy === "resolved" ? "..." : "Resolve"}
      </button>
      <button
        onClick={() => decide("dismissed")}
        disabled={busy !== null}
        className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-300 disabled:opacity-60"
      >
        {busy === "dismissed" ? "..." : "Dismiss"}
      </button>
    </div>
  );
}
