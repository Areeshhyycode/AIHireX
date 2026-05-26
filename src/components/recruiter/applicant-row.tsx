import Link from "next/link";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Applicant } from "@/lib/mock/recruiter";

const stageTones: Record<Applicant["stage"], string> = {
  Applied: "bg-slate-100 text-slate-700",
  Reviewed: "bg-violet-100 text-violet-700",
  Interview: "bg-blue-100 text-blue-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

export function ApplicantRow({ a }: { a: Applicant }) {
  const risky = a.riskFlag === "high";
  return (
    <div className="grid grid-cols-12 items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-slate-50">
      <div className="col-span-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-sm font-semibold text-white">
          {a.avatarInitial}
        </div>
        <div className="min-w-0">
          <Link href={`/recruiter/applicants/${a.id}`} className="text-sm font-medium text-slate-900 hover:text-brand-600">
            {a.name}
          </Link>
          <p className="truncate text-xs text-slate-500">{a.location} · {a.experience}</p>
        </div>
      </div>
      <p className="col-span-3 truncate text-sm text-slate-600">{a.appliedFor}</p>
      <p className="col-span-1 text-sm font-semibold text-brand-600">{a.matchScore}%</p>
      <p className="col-span-1 text-sm font-semibold text-violet-600">{a.resumeScore}</p>
      <div className="col-span-1">
        {risky ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
            <ShieldAlert className="h-3.5 w-3.5" />
            Risk
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            OK
          </span>
        )}
      </div>
      <span className={cn("col-span-2 inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium", stageTones[a.stage])}>
        {a.stage}
      </span>
    </div>
  );
}
