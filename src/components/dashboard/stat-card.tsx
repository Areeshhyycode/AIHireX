import { cn } from "@/lib/utils";

type Tone = "brand" | "emerald" | "amber" | "violet";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
};

type Props = {
  label: string;
  value: string;
  delta?: string;
  icon: React.ReactNode;
  tone?: Tone;
};

export function StatCard({ label, value, delta, icon, tone = "brand" }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={cn("rounded-lg p-2", tones[tone])}>{icon}</div>
      </div>
      {delta && (
        <p className="mt-3 text-xs font-medium text-emerald-600">{delta}</p>
      )}
    </div>
  );
}
