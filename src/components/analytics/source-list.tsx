const sources = [
  { name: "AI recommendation", pct: 42, color: "bg-brand-500" },
  { name: "Search", pct: 28, color: "bg-violet-500" },
  { name: "Direct link", pct: 18, color: "bg-emerald-500" },
  { name: "Referral", pct: 8, color: "bg-amber-500" },
  { name: "Other", pct: 4, color: "bg-slate-400" },
];

export function SourceList() {
  return (
    <div className="space-y-3">
      {sources.map((s) => (
        <div key={s.name}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="font-medium text-slate-700">{s.name}</span>
            <span className="font-semibold text-slate-900">{s.pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
