type Bar = { label: string; value: number };

export function BarChart({
  data,
  max,
  height = 180,
}: {
  data: Bar[];
  max?: number;
  height?: number;
}) {
  const m = max ?? Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d) => {
        const h = Math.max(4, (d.value / m) * height);
        return (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-violet-500 transition hover:opacity-90"
              style={{ height: h }}
              title={`${d.label}: ${d.value}`}
            />
            <span className="text-[10px] font-medium text-slate-500">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
