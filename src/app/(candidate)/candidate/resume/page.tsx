import { ResumeToolsGrid } from "@/components/resume/tools-grid";
import { UploadZone } from "@/components/resume/upload-zone";

export default function ResumeHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Resume tools</h1>
        <p className="mt-1 text-sm text-slate-500">
          AI-powered tools to score, rewrite, and build your resume.
        </p>
      </div>
      <UploadZone />
      <ResumeToolsGrid />
    </div>
  );
}
