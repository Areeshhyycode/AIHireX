import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function WelcomeBanner({ name = "Areesha" }: { name?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 p-6 text-white">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="relative">
        <p className="text-sm font-medium text-white/80">
          Hi {name}, welcome back 👋
        </p>
        <h2 className="mt-1 text-2xl font-bold">
          Your resume can score 12% higher.
        </h2>
        <p className="mt-1 max-w-lg text-sm text-white/80">
          We detected weak action verbs and 3 missing skills the market is asking
          for. Fix them in one click with AI Enhancer.
        </p>
        <Link
          href="/candidate/resume"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-white/95"
        >
          <Sparkles className="h-4 w-4" />
          Enhance my resume
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
