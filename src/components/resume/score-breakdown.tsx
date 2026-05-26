type Item = { label: string; value: number };

export function ScoreBreakdown({ items }: { items: Item[] }) {
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <Row key={it.label} {...it} />
      ))}
    </div>
  );
}

function Row({ label, value }: Item) {
  const color =
    value >= 85 ? "bg-emerald-500" : value >= 65 ? "bg-amber-500" : "bg-rose-500";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
