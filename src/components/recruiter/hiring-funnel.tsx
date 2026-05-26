const stages = [
  { label: "Applied", count: 412, pct: 100, color: "bg-slate-400" },
  { label: "AI-screened", count: 218, pct: 53, color: "bg-brand-500" },
  { label: "Reviewed", count: 96, pct: 23, color: "bg-violet-500" },
  { label: "Interview", count: 34, pct: 8, color: "bg-amber-500" },
  { label: "Offer", count: 7, pct: 2, color: "bg-emerald-500" },
];

export function HiringFunnel() {
  return (
    <div className="space-y-3">
      {stages.map((s) => (
        <div key={s.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">{s.label}</span>
            <span className="text-slate-500">
              <span className="font-semibold text-slate-900">{s.count}</span> · {s.pct}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
