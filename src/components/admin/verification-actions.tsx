"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function VerificationActions({ id }: { id: string }) {
  const [busy, setBusy] = useState<string | null>(null);
  const router = useRouter();

  async function decide(status: "verified" | "rejected" | "suspicious") {
    setBusy(status);
    const reason =
      status === "rejected"
        ? prompt("Reason for rejection (optional):") ?? undefined
        : undefined;
    try {
      const res = await fetch(`/api/admin/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason }),
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
        onClick={() => decide("verified")}
        disabled={busy !== null}
        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {busy === "verified" ? "..." : "Verify"}
      </button>
      <button
        onClick={() => decide("suspicious")}
        disabled={busy !== null}
        className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
      >
        {busy === "suspicious" ? "..." : "Flag"}
      </button>
      <button
        onClick={() => decide("rejected")}
        disabled={busy !== null}
        className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
      >
        {busy === "rejected" ? "..." : "Reject"}
      </button>
    </div>
  );
}
