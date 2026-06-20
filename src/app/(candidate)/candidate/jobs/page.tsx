import { Briefcase } from "lucide-react";
import { JobsSearchBar } from "@/components/jobs/jobs-search-bar";
import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { listJobs } from "@/lib/jobs/fetch";
import { toCardJob } from "@/lib/jobs/to-card";

export const dynamic = "force-dynamic";

type SP = { q?: string; loc?: string };

export default async function JobsPage({ searchParams }: { searchParams: SP }) {
  const live = await listJobs({
    q: searchParams?.q,
    loc: searchParams?.loc,
    limit: 50,
  });
  const jobs = live.map(toCardJob);
  const isSearching = Boolean(searchParams?.q || searchParams?.loc);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Browse jobs</h1>
        <p className="mt-1 text-sm text-slate-500">
          {jobs.length} job{jobs.length === 1 ? "" : "s"} · ranked by AI for you
        </p>
      </div>
      <JobsSearchBar />
      <div className="flex gap-6">
        <JobFilters />
        <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-1 xl:grid-cols-2">
          {jobs.length === 0 ? (
            <div className="xl:col-span-2">
              <EmptyState
                icon={Briefcase}
                title={isSearching ? "No jobs match" : "No jobs yet"}
                body={
                  isSearching
                    ? "Try different keywords or location."
                    : "Recruiters haven't posted yet. Check back in a bit, or create your own job as a recruiter."
                }
              />
            </div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
}
