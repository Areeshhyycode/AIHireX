import Link from "next/link";
import type { Applicant } from "@/lib/mock/recruiter";

export function TopApplicantCard({ a }: { a: Applicant }) {
  return (
    <Link
      href={`/recruiter/applicants/${a.id}`}
      className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-sm font-semibold text-white">
          {a.avatarInitial}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{a.name}</p>
          <p className="text-xs text-slate-500">
            {a.appliedFor} · {a.experience}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-slate-500">Match</p>
        <p className="text-sm font-bold text-brand-600">{a.matchScore}%</p>
      </div>
    </Link>
  );
}
