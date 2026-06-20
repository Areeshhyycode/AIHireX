import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { JobDetailHeader } from "@/components/jobs/job-detail-header";
import { JobDetailBody } from "@/components/jobs/job-detail-body";
import { JobMatchPanel } from "@/components/jobs/job-match-panel";
import { getJob } from "@/lib/jobs/fetch";
import { toCardJob } from "@/lib/jobs/to-card";
import { hasApplied } from "@/lib/applications/fetch";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) notFound();
  const { userId } = auth();
  const job = await getJob(params.id);
  if (!job) notFound();
  const card = toCardJob(job);
  const applied = userId ? await hasApplied(userId, params.id) : false;
  return (
    <div className="space-y-6">
      <JobDetailHeader job={card} applied={applied} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <JobDetailBody
          about={job.description}
          responsibilities={job.responsibilities ?? []}
          requirements={job.requirements ?? []}
          perks={job.perks ?? []}
          tags={card.tags}
        />
        <JobMatchPanel matchScore={card.matchScore} />
      </div>
    </div>
  );
}
