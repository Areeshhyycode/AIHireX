import { EnhancerClient } from "@/components/resume/enhancer-client";

export default function ResumeEnhancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI Resume Enhancer</h1>
        <p className="mt-1 text-sm text-slate-500">
          One click. Stronger verbs, ATS keywords, quantified impact.
        </p>
      </div>
      <EnhancerClient />
    </div>
  );
}
