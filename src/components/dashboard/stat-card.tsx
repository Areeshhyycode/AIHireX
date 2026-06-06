import { cn } from "@/lib/utils";

type Tone = "brand" | "emerald" | "amber" | "violet";

const tones: Record<Tone, { box: string; glow: string }> = {
  brand: {
    box: "bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-200/60",
    glow: "from-brand-500/5",
  },
  emerald: {
    box: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 ring-1 ring-emerald-200/60",
    glow: "from-emerald-500/5",
  },
  amber: {
    box: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 ring-1 ring-amber-200/60",
    glow: "from-amber-500/5",
  },
  violet: {
    box: "bg-gradient-to-br from-violet-50 to-violet-100 text-violet-700 ring-1 ring-violet-200/60",
    glow: "from-violet-500/5",
  },
};

type Props = {
  label: string;
  value: string;
  delta?: string;
  icon: React.ReactNode;
  tone?: Tone;
};

export function StatCard({ label, value, delta, icon, tone = "brand" }: Props) {
  const t = tones[tone];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100", t.glow)} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={cn("rounded-xl p-2.5", t.box)}>{icon}</div>
      </div>
      {delta && (
        <p className="relative mt-3 text-xs font-semibold text-emerald-600">{delta}</p>
      )}
    </div>
  );
}
