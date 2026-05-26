import Link from "next/link";
import { Plus } from "lucide-react";
import { Section } from "@/components/dashboard/section";
import { JobPostRow } from "@/components/recruiter/job-post-row";
import { mockJobPosts } from "@/lib/mock/recruiter";

export default function RecruiterJobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            {mockJobPosts.length} jobs · {mockJobPosts.filter((j) => j.status === "Active").length} active
          </p>
        </div>
        <Link
          href="/recruiter/jobs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          New job
        </Link>
      </div>
      <Section title="All posts" subtitle="Click a job to see applicants">
        <div className="-mx-4">
          {mockJobPosts.map((j) => (
            <JobPostRow key={j.id} job={j} />
          ))}
        </div>
      </Section>
    </div>
  );
}
