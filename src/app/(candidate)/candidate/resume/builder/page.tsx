import { BuilderClient } from "@/components/resume/builder-client";

export default function ResumeBuilderPage() {
  return (
    <div className="space-y-6">
      <div className="print:hidden">
        <h1 className="text-2xl font-bold text-slate-900">Resume builder</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in your details, AI assembles an ATS-friendly resume. Print to save as PDF.
        </p>
      </div>
      <BuilderClient />
    </div>
  );
}
