import { JobsSearchBar } from "@/components/jobs/jobs-search-bar";
import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { listJobs } from "@/lib/jobs/fetch";
import { toCardJob } from "@/lib/jobs/to-card";
import { mockJobs } from "@/lib/mock/jobs";

export const dynamic = "force-dynamic";

type SP = { q?: string };

export default async function JobsPage({ searchParams }: { searchParams: SP }) {
  const live = await listJobs({ q: searchParams?.q, limit: 50 });
  const jobs = live.length > 0 ? live.map(toCardJob) : mockJobs;
  const isLive = live.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Browse jobs</h1>
        <p className="mt-1 text-sm text-slate-500">
          {jobs.length} {isLive ? "live" : "sample"} jobs · ranked by AI for you
        </p>
      </div>
      <JobsSearchBar />
      <div className="flex gap-6">
        <JobFilters />
        <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-1 xl:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
