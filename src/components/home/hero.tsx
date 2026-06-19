import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-violet-50" />
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />

      <div className="container-page relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Hire smarter.{" "}
            <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Get hired faster.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            One platform. Real recruiters. Zero scams. AI does the boring half —
            you just show up and shine.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/register?role=candidate" size="lg">
              <span className="inline-flex items-center gap-1.5">
                I&apos;m looking for a job
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
            <Button href="/register?role=recruiter" size="lg" variant="outline">
              <span className="inline-flex items-center gap-1.5">
                <Play className="h-4 w-4" />
                I&apos;m hiring
              </span>
            </Button>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            Free to start · No credit card · 15+ AI tools out of the box
          </p>
        </div>
      </div>
    </section>
  );
}
