"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, Share2, Flag, Check } from "lucide-react";

export function JobDetailActions({ jobId }: { jobId: string }) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  async function toggleSave() {
    setBusy("save");
    try {
      const res = await fetch("/api/me/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, action: saved ? "remove" : "add" }),
      });
      if (res.ok) setSaved((s) => !s);
    } finally {
      setBusy(null);
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ url, title: "Check out this job" });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 1500);
  }

  async function report() {
    setBusy("report");
    try {
      const reason = prompt("Why are you reporting this job? (scam / fake / inappropriate / spam / other)") || "other";
      const notes = prompt("Any details? (optional)") || undefined;
      const r = ["scam", "fake", "inappropriate", "spam", "other"].includes(reason)
        ? reason
        : "other";
      await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType: "job", targetId: jobId, reason: r, notes }),
      });
      alert("Reported. Thanks — admin will review.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSave}
        disabled={busy === "save"}
        aria-label="Save"
        className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-brand-600 disabled:opacity-60"
      >
        {saved ? <BookmarkCheck className="h-4 w-4 text-brand-600" /> : <Bookmark className="h-4 w-4" />}
      </button>
      <button
        onClick={share}
        aria-label="Share"
        className="relative rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      >
        {shared ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
      </button>
      <button
        onClick={report}
        disabled={busy === "report"}
        aria-label="Report"
        className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-rose-600 disabled:opacity-60"
      >
        <Flag className="h-4 w-4" />
      </button>
    </div>
  );
}
