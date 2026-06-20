import Link from "next/link";
import { MapPin, Building2, BadgeCheck } from "lucide-react";
import { BookmarkButton } from "@/components/jobs/bookmark-button";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAgo: string;
  tags: string[];
  verified: boolean;
  matchScore: number;
  authenticityScore: number;
};

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/candidate/jobs/${job.id}`}
      className="group block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-brand-600">
            {job.title}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Building2 className="h-3 w-3" />
              {job.company}
              {job.verified && <BadgeCheck className="h-3 w-3 text-brand-500" />}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {job.location}
            </span>
            <span>·</span>
            <span>{job.postedAgo}</span>
          </div>
          {job.salary && (
            <p className="mt-1 text-xs font-medium text-slate-700">{job.salary}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-xs font-bold text-brand-700">
            {job.matchScore}%
          </span>
          <BookmarkButton jobId={job.id} />
        </div>
      </div>
      {job.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {job.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
            >
              {t}
            </span>
          ))}
          {job.tags.length > 4 && (
            <span className="text-[10px] text-slate-400">
              +{job.tags.length - 4}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
