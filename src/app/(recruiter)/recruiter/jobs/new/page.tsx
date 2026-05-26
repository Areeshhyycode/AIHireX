import { PostJobForm } from "@/components/recruiter/post-job-form";

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Post a new job</h1>
        <p className="mt-1 text-sm text-slate-500">
          AI will check authenticity and suggest improvements before publishing.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <PostJobForm />
      </div>
    </div>
  );
}
