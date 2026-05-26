import { Sparkles, Check, X } from "lucide-react";

export function JobMatchPanel({ matchScore = 92 }: { matchScore?: number }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Sparkles className="h-4 w-4 text-brand-500" />
        Your AI match
      </div>
      <div className="mt-4 text-center">
        <div className="relative inline-flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-white">
          <div className="absolute inset-1 rounded-full bg-white" />
          <div className="relative text-3xl font-bold text-brand-600">
            {matchScore}%
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Based on resume, skills and past applications.
        </p>
      </div>
      <div className="mt-5 space-y-2 text-sm">
        <Row ok text="Next.js (5+ years)" />
        <Row ok text="TypeScript strict" />
        <Row ok text="Remote-friendly" />
        <Row text="GraphQL exposure (you have 1y, role wants 3y)" />
      </div>
      <button className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
        Get AI hiring tips
      </button>
    </aside>
  );
}

function Row({ ok, text }: { ok?: boolean; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className={ok ? "text-emerald-600" : "text-amber-600"}>
        {ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </span>
      <span className="text-slate-700">{text}</span>
    </div>
  );
}
