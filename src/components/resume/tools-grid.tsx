import Link from "next/link";
import { Sparkles, FileEdit, ShieldCheck, Target } from "lucide-react";

const tools = [
  {
    href: "/candidate/resume/analyzer",
    title: "Resume Analyzer",
    desc: "Get an ATS score and fixes in seconds.",
    icon: <Target className="h-5 w-5" />,
    tone: "bg-brand-50 text-brand-700",
  },
  {
    href: "/candidate/resume/enhance",
    title: "AI Enhancer",
    desc: "One-click rewrite into ATS-friendly bullets.",
    icon: <Sparkles className="h-5 w-5" />,
    tone: "bg-violet-50 text-violet-700",
  },
  {
    href: "/candidate/resume/builder",
    title: "Resume Builder",
    desc: "Pick a template and ship a clean resume.",
    icon: <FileEdit className="h-5 w-5" />,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/candidate/resume/fake-check",
    title: "Authenticity Check",
    desc: "Spot AI-written or copy-pasted resumes.",
    icon: <ShieldCheck className="h-5 w-5" />,
    tone: "bg-amber-50 text-amber-700",
  },
];

export function ResumeToolsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tools.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm"
        >
          <div className={"inline-flex rounded-lg p-2 " + t.tone}>{t.icon}</div>
          <p className="mt-3 text-base font-semibold text-slate-900">
            {t.title}
          </p>
          <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
        </Link>
      ))}
    </div>
  );
}
