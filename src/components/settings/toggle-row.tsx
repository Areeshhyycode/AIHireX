type Props = {
  title: string;
  desc: string;
  enabled?: boolean;
};

export function ToggleRow({ title, desc, enabled = false }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <button
        type="button"
        className={
          "relative h-6 w-11 shrink-0 rounded-full transition " +
          (enabled ? "bg-brand-600" : "bg-slate-200")
        }
      >
        <span
          className={
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition " +
            (enabled ? "left-5" : "left-0.5")
          }
        />
      </button>
    </div>
  );
}
