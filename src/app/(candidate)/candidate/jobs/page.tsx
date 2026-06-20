import { Briefcase } from "lucide-react";
import { JobsSearchBar } from "@/components/jobs/jobs-search-bar";
import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { Pagination } from "@/components/jobs/pagination";
import { EmptyState } from "@/components/dashboard/empty-state";
import { listJobs } from "@/lib/jobs/fetch";
import { toCardJob } from "@/lib/jobs/to-card";

export const dynamic = "force-dynamic";

const PER_PAGE = 10;

type SP = { q?: string; loc?: string; page?: string };

export default async function JobsPage({ searchParams }: { searchParams: SP }) {
  const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);
  const all = await listJobs({
    q: searchParams?.q,
    loc: searchParams?.loc,
    limit: 200,
  });
  const total = all.length;
  const jobs = all
    .slice((page - 1) * PER_PAGE, page * PER_PAGE)
    .map(toCardJob);
  const isSearching = Boolean(searchParams?.q || searchParams?.loc);

  function buildHref(p: number) {
    const qs = new URLSearchParams();
    if (searchParams?.q) qs.set("q", searchParams.q);
    if (searchParams?.loc) qs.set("loc", searchParams.loc);
    qs.set("page", String(p));
    return `/candidate/jobs?${qs.toString()}`;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          AI-matched opportunities
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {total} role{total === 1 ? "" : "s"} ranked by your profile, skills and
          career interests.
        </p>
      </div>
      <JobsSearchBar />
      <div className="flex gap-6">
        <JobFilters />
        <div className="min-w-0 flex-1">
          {total === 0 ? (
            <EmptyState
              icon={Briefcase}
              title={isSearching ? "No jobs match" : "No jobs yet"}
              body={
                isSearching
                  ? "Try different keywords or location."
                  : "Recruiters haven't posted yet. Check back soon."
              }
            />
          ) : (
            <>
              <div className="grid gap-2 sm:grid-cols-1 xl:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination
                page={page}
                total={total}
                perPage={PER_PAGE}
                buildHref={buildHref}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
