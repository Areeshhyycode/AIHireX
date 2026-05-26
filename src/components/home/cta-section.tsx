import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="container-page py-20">
      <div className="rounded-3xl bg-slate-900 px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to experience smarter hiring?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Join thousands of candidates and verified recruiters already on AIHireX.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/register" size="lg">Create free account</Button>
          <Button href="/jobs" size="lg" variant="outline" className="bg-white/0 text-white border-white/30 hover:bg-white/10">
            Browse jobs
          </Button>
        </div>
      </div>
    </section>
  );
}
