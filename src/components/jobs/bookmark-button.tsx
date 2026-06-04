"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

export function BookmarkButton({ jobId }: { jobId: string }) {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setBusy(true);
    const next = !saved;
    try {
      const res = await fetch("/api/me/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, action: next ? "add" : "remove" }),
      });
      if (res.ok) setSaved(next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-label={saved ? "Unsave" : "Save"}
      className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 disabled:opacity-60"
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4 text-brand-600" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </button>
  );
}
