import { JobDetailHeader } from "@/components/jobs/job-detail-header";
import { JobDetailBody } from "@/components/jobs/job-detail-body";
import { JobMatchPanel } from "@/components/jobs/job-match-panel";
import { mockJobDetail } from "@/lib/mock/jobs";

export default function JobDetailPage() {
  const job = mockJobDetail;
  return (
    <div className="space-y-6">
      <JobDetailHeader job={job} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <JobDetailBody
          about={job.about}
          responsibilities={job.responsibilities}
          requirements={job.requirements}
          perks={job.perks}
          tags={job.tags}
        />
        <JobMatchPanel matchScore={job.matchScore} />
      </div>
    </div>
  );
}
