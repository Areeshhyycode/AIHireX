import { MapPin, Building2, BadgeCheck, Clock, Bookmark, Share2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Job } from "@/components/jobs/job-card";

export function JobDetailHeader({ job }: { job: Job }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {job.company}
              {job.verified && <BadgeCheck className="h-4 w-4 text-brand-500" />}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            <span>{job.type}</span>
            <span>{job.salary}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {job.postedAgo}
            </span>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            AI authenticity score: {job.authenticityScore}% · Low risk
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Share2 className="h-4 w-4" />
          </button>
          <Button size="lg">Apply with AI</Button>
        </div>
      </div>
    </div>
  );
}
