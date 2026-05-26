import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="container-page py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Hire smarter.{" "}
            <span className="text-brand-600">Get hired faster.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            AIHireX uses AI to analyze resumes, detect fake job posts, run mock
            interviews and match candidates with verified recruiters — all in
            one platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/register?role=candidate" size="lg">
              I&apos;m looking for a job
            </Button>
            <Button href="/register?role=recruiter" size="lg" variant="outline">
              I&apos;m hiring
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
