import { Sparkles } from "lucide-react";

export function AiSummaryCard() {
  return (
    <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-violet-50 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-900">
        <Sparkles className="h-4 w-4 text-brand-600" />
        AI summary
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        Strong senior frontend candidate with 6 years building React/Next.js
        products at Stripe and Razorpay. Match is 94% — deep TypeScript + design
        system experience aligns with the role. Slight gap: limited GraphQL
        exposure (1y vs 3y desired). No risk flags. Recommended to advance.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <Pill label="Match" value="94%" />
        <Pill label="Resume" value="88" />
        <Pill label="Authenticity" value="98%" />
      </div>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/70 px-2 py-2 backdrop-blur">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}
