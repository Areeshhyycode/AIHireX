import Link from "next/link";
import { MapPin, Building2, BadgeCheck } from "lucide-react";

export type Recommendation = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  verified: boolean;
  matchScore: number;
};

export function JobRecommendation({ job }: { job: Recommendation }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href={`/candidate/jobs/${job.id}`}
            className="font-semibold text-slate-900 hover:text-brand-600"
          >
            {job.title}
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {job.company}
              {job.verified && (
                <BadgeCheck className="h-3.5 w-3.5 text-brand-500" />
              )}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span>{job.salary}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Match</p>
          <p className="text-lg font-bold text-brand-600">{job.matchScore}%</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
