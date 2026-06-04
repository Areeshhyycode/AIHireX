import { AuthenticityClient } from "@/components/resume/authenticity-client";

export default function FakeCheckPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Authenticity Check</h1>
        <p className="mt-1 text-sm text-slate-500">
          AI judges if a resume is hand-written, templated, or generated.
        </p>
      </div>
      <AuthenticityClient />
    </div>
  );
}
