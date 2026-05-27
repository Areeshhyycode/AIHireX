import Link from "next/link";
import { Plus } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { Section } from "@/components/dashboard/section";
import { JobPostRow, type JobPost } from "@/components/recruiter/job-post-row";
import { listJobsByRecruiter, type JobListItem } from "@/lib/jobs/fetch";
import { mockJobPosts } from "@/lib/mock/recruiter";

export const dynamic = "force-dynamic";

function timeAgo(d: string) {
  const t = new Date(d).getTime();
  const min = Math.max(1, Math.floor((Date.now() - t) / 60000));
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return days < 7 ? `${days}d ago` : `${Math.floor(days / 7)}w ago`;
}

function toRow(j: JobListItem): JobPost {
  const status = j.status === "draft" ? "Draft" : j.status === "closed" ? "Closed" : "Active";
  return {
    id: j.id,
    title: j.title,
    location: j.location,
    postedAgo: timeAgo((j as unknown as { createdAt: string }).createdAt),
    applicants: j.applicationsCount ?? 0,
    shortlisted: 0,
    status,
  };
}

export default async function RecruiterJobsPage() {
  const { userId } = auth();
  const live = userId ? await listJobsByRecruiter(userId) : [];
  const jobs: JobPost[] = live.length > 0 ? live.map(toRow) : mockJobPosts;
  const isLive = live.length > 0;
  const active = jobs.filter((j) => j.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            {jobs.length} {isLive ? "live" : "sample"} jobs · {active} active
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
          {jobs.map((j) => (
            <JobPostRow key={j.id} job={j} />
          ))}
        </div>
      </Section>
    </div>
  );
}
