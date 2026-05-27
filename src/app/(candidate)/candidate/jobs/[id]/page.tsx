import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { JobDetailHeader } from "@/components/jobs/job-detail-header";
import { JobDetailBody } from "@/components/jobs/job-detail-body";
import { JobMatchPanel } from "@/components/jobs/job-match-panel";
import { getJob } from "@/lib/jobs/fetch";
import { toCardJob } from "@/lib/jobs/to-card";
import { mockJobDetail } from "@/lib/mock/jobs";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  if (mongoose.isValidObjectId(params.id)) {
    const job = await getJob(params.id);
    if (!job) notFound();
    const card = toCardJob(job);
    return (
      <Detail
        job={card}
        about={job.description}
        responsibilities={job.responsibilities ?? []}
        requirements={job.requirements ?? []}
        perks={job.perks ?? []}
      />
    );
  }
  return (
    <Detail
      job={mockJobDetail}
      about={mockJobDetail.about}
      responsibilities={mockJobDetail.responsibilities}
      requirements={mockJobDetail.requirements}
      perks={mockJobDetail.perks}
    />
  );
}

function Detail({
  job,
  about,
  responsibilities,
  requirements,
  perks,
}: {
  job: Parameters<typeof JobDetailHeader>[0]["job"];
  about: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}) {
  return (
    <div className="space-y-6">
      <JobDetailHeader job={job} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <JobDetailBody
          about={about}
          responsibilities={responsibilities}
          requirements={requirements}
          perks={perks}
          tags={job.tags}
        />
        <JobMatchPanel matchScore={job.matchScore} />
      </div>
    </div>
  );
}
