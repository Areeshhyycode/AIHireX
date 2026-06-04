"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function TopbarSearch({ role }: { role?: string }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const base = role === "recruiter" ? "/recruiter/applicants" : "/candidate/jobs";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = q.trim();
    if (!text) return;
    router.push(`${base}?q=${encodeURIComponent(text)}`);
  }

  return (
    <form onSubmit={submit} className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="Search jobs, companies, skills..."
        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-400 focus:bg-white"
      />
    </form>
  );
}
