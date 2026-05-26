import { JobsSearchBar } from "@/components/jobs/jobs-search-bar";
import { JobFilters } from "@/components/jobs/job-filters";
import { JobCard } from "@/components/jobs/job-card";
import { mockJobs } from "@/lib/mock/jobs";

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Browse jobs</h1>
        <p className="mt-1 text-sm text-slate-500">
          {mockJobs.length} verified jobs · ranked by AI for you
        </p>
      </div>
      <JobsSearchBar />
      <div className="flex gap-6">
        <JobFilters />
        <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-1 xl:grid-cols-2">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
