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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-violet-600 to-fuchsia-600 p-7 text-white shadow-lg shadow-brand-500/20">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          <Sparkles className="h-3 w-3" />
          AI-powered career assistant
        </div>
        <p className="mt-3 text-sm font-medium text-white/90">
          Hi {name}, welcome to AIHireX 👋
        </p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight">
          {resumeUploaded
            ? "Let's find your next role."
            : "Start by analyzing your resume."}
        </h2>
        <p className="mt-2 max-w-lg text-sm text-white/85">
          {resumeUploaded
            ? "We'll match you with verified jobs and prep you for interviews."
            : "Upload your resume to get an instant ATS score, missing skills, and AI fixes."}
        </p>
        <Link
          href="/candidate/resume/analyzer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-md transition hover:shadow-xl hover:shadow-white/20"
        >
          <Sparkles className="h-4 w-4" />
          {resumeUploaded ? "Enhance my resume" : "Analyze my resume"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
