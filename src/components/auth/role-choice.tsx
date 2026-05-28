"use client";

import { useState } from "react";
import { User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "candidate" | "recruiter";

export function RoleChoice({ initial }: { initial: Role }) {
  const [role, setRole] = useState<Role>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/me/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.error ?? `Failed (${res.status})`);
        setLoading(false);
        return;
      }
      // Full reload so Clerk session refreshes and layout guards see the new role.
      window.location.assign(role === "recruiter" ? "/recruiter" : "/candidate");
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card active={role === "candidate"} onClick={() => setRole("candidate")} title="I'm looking for a job" desc="Get AI resume help, mock interviews, and smart job matches." icon={<User className="h-6 w-6" />} />
        <Card active={role === "recruiter"} onClick={() => setRole("recruiter")} title="I'm hiring" desc="Post jobs, filter candidates with AI, and run smart screenings." icon={<Building2 className="h-6 w-6" />} />
      </div>
      <button
        onClick={save}
        disabled={loading}
        className="h-12 w-full rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Setting up..." : "Continue"}
      </button>
      {error && (
        <p className="text-center text-sm font-medium text-rose-600">{error}</p>
      )}
    </div>
  );
}

function Card({ active, onClick, title, desc, icon }: { active: boolean; onClick: () => void; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-2xl border p-5 text-left transition",
        active
          ? "border-brand-500 bg-brand-50 ring-2 ring-brand-100"
          : "border-slate-200 bg-white hover:border-slate-300",
      )}
    >
      <div className={cn("inline-flex rounded-lg p-2", active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600")}>
        {icon}
      </div>
      <p className="mt-3 text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </button>
  );
}
