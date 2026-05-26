import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "Active" | "Paused" | "Draft" | "Closed";
const tones: Record<Status, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Paused: "bg-amber-100 text-amber-700",
  Draft: "bg-slate-100 text-slate-700",
  Closed: "bg-rose-100 text-rose-700",
};

export type JobPost = {
  id: string;
  title: string;
  location: string;
  postedAgo: string;
  applicants: number;
  shortlisted: number;
  status: Status;
};

export function JobPostRow({ job }: { job: JobPost }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-slate-50">
      <div>
        <Link
          href={`/recruiter/jobs/${job.id}`}
          className="font-medium text-slate-900 hover:text-brand-600"
        >
          {job.title}
        </Link>
        <p className="text-xs text-slate-500">
          {job.location} · Posted {job.postedAgo}
        </p>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="text-slate-600">
          <span className="font-semibold text-slate-900">{job.applicants}</span> applied
        </span>
        <span className="text-slate-600">
          <span className="font-semibold text-emerald-600">{job.shortlisted}</span> shortlisted
        </span>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", tones[job.status])}>
          {job.status}
        </span>
        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
