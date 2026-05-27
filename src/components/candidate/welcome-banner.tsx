import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function WelcomeBanner({
  name = "there",
  resumeUploaded = false,
}: {
  name?: string;
  resumeUploaded?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 p-6 text-white">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="relative">
        <p className="text-sm font-medium text-white/80">
          Hi {name}, welcome to AIHireX 👋
        </p>
        <h2 className="mt-1 text-2xl font-bold">
          {resumeUploaded
            ? "Let's find your next role."
            : "Start by analyzing your resume."}
        </h2>
        <p className="mt-1 max-w-lg text-sm text-white/80">
          {resumeUploaded
            ? "We'll match you with verified jobs and prep you for interviews."
            : "Paste your resume to get an instant ATS score, missing skills, and AI fixes."}
        </p>
        <Link
          href="/candidate/resume/analyzer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-white/95"
        >
          <Sparkles className="h-4 w-4" />
          {resumeUploaded ? "Enhance my resume" : "Analyze my resume"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
