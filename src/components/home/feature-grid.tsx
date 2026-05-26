import { features } from "@/lib/features";
import { FeatureCard } from "@/components/home/feature-card";

export function FeatureGrid() {
  return (
    <section id="features" className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Your unfair advantage — on both sides of the hire.
        </h2>
        <p className="mt-3 text-slate-600">
          From first resume draft to final offer letter, every step gets an AI assist.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  );
}
