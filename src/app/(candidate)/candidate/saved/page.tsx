import { auth } from "@clerk/nextjs/server";
import { Bookmark } from "lucide-react";
import { JobCard } from "@/components/jobs/job-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";
import { JobModel } from "@/models/job";
import { toCardJob } from "@/lib/jobs/to-card";

export const dynamic = "force-dynamic";

export default async function SavedJobsPage() {
  const { userId } = auth();
  await connectDB();
  const me = userId
    ? await UserModel.findOne({ clerkId: userId }).lean<{
        savedJobs?: unknown[];
      } | null>()
    : null;
  const ids = (me?.savedJobs ?? []).map(String);
  const docs = ids.length
    ? await JobModel.find({ _id: { $in: ids } }).lean()
    : [];
  const jobs = docs.map((d) => {
    const r = d as unknown as Record<string, unknown>;
    const obj: Record<string, unknown> = { ...r, id: String(r._id) };
    return toCardJob(obj as never);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Saved jobs</h1>
        <p className="mt-1 text-sm text-slate-500">{jobs.length} saved</p>
      </div>
      {jobs.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved jobs"
          body="Tap the bookmark icon on any job to save it for later."
          ctaLabel="Browse jobs"
          ctaHref="/candidate/jobs"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-1 xl:grid-cols-2">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      )}
    </div>
  );
}
