"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Check } from "lucide-react";

export function ApplyButton({
  jobId,
  applied: initialApplied,
}: {
  jobId: string;
  applied?: boolean;
}) {
  const [applied, setApplied] = useState(initialApplied ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function apply() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Failed");
      setApplied(true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  if (applied) {
    return (
      <div className="inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-50 px-5 text-sm font-semibold text-emerald-700">
        <Check className="h-4 w-4" /> Applied
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={apply}
        disabled={loading}
        className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        <Sparkles className="h-4 w-4" />
        {loading ? "Applying..." : "Apply with AI"}
      </button>
      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}
