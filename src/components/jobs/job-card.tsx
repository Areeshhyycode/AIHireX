import Link from "next/link";
import { MapPin, Building2, BadgeCheck, Clock, Bookmark } from "lucide-react";

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
    <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/candidate/jobs/${job.id}`}
            className="text-base font-semibold text-slate-900 hover:text-brand-600"
          >
            {job.title}
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {job.company}
              {job.verified && <BadgeCheck className="h-3.5 w-3.5 text-brand-500" />}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span>{job.type}</span>
            <span>{job.salary}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {job.postedAgo}
            </span>
          </div>
        </div>
        <button aria-label="Save" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-500">
          Authenticity{" "}
          <span className="font-semibold text-emerald-600">
            {job.authenticityScore}%
          </span>
        </span>
        <span className="font-semibold text-brand-600">
          Match {job.matchScore}%
        </span>
      </div>
    </div>
  );
}
