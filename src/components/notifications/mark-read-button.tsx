"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export function MarkReadButton() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function mark() {
    setBusy(true);
    try {
      await fetch("/api/notifications", { method: "POST" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={mark}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
    >
      <Check className="h-4 w-4" />
      {busy ? "Marking..." : "Mark all read"}
    </button>
  );
}
