import { AnalyzerClient } from "@/components/resume/analyzer-client";

export default function ResumeAnalyzerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Resume analyzer</h1>
        <p className="mt-1 text-sm text-slate-500">
          Paste your resume. Groq (LLaMA 3.3 70B) scores it on ATS, keywords, impact and more.
        </p>
      </div>
      <AnalyzerClient />
    </div>
  );
}
