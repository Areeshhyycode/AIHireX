import { features } from "@/lib/features";
import { FeatureCard } from "@/components/home/feature-card";

export function FeatureGrid() {
  return (
    <section id="features" className="container-page py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
          Features
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          The boring parts of hiring — <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
            on autopilot.
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          From the first resume bullet to the final offer email — AIHireX writes,
          scores, screens, and matches. You focus on the conversation that
          matters.
        </p>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  );
}
