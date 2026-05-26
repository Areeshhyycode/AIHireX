import type { Feature } from "@/lib/features";

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="group rounded-xl border bg-white p-5 transition-shadow hover:shadow-md">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-semibold text-slate-900">{feature.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{feature.desc}</p>
    </div>
  );
}
