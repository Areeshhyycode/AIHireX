import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Search, Users } from "lucide-react";
import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { listApplicantsForRecruiter, type ApplicationItem } from "@/lib/applications/fetch";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const tones: Record<ApplicationItem["status"], string> = {
  applied: "bg-slate-100 text-slate-700",
  reviewing: "bg-amber-100 text-amber-700",
  interview: "bg-blue-100 text-blue-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  withdrawn: "bg-slate-100 text-slate-500",
};

export default async function ApplicantsPage() {
  const { userId } = auth();
  const apps = userId ? await listApplicantsForRecruiter(userId) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applicants</h1>
        <p className="mt-1 text-sm text-slate-500">
          {apps.length} candidate{apps.length === 1 ? "" : "s"} across your jobs
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, skill, location..."
            className="h-10 w-full rounded-lg bg-slate-50 pl-9 pr-3 text-sm outline-none focus:bg-white"
          />
        </div>
      </div>
      <Section title="Candidates">
        {apps.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No applicants yet"
            body="Once candidates apply to your jobs, they'll appear here, ranked by AI match."
            ctaLabel="Post a job"
            ctaHref="/recruiter/jobs/new"
          />
        ) : (
          <div className="space-y-2">
            {apps.map((a) => (
              <Link
                key={a.id}
                href={`/recruiter/applicants/${a.id}`}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {a.candidateName ?? a.candidateEmail ?? "Anonymous"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Applied for <span className="font-medium">{a.jobTitle}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {a.resumeUrl && (
                    <a
                      href={a.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-medium text-brand-600 hover:underline"
                    >
                      Resume
                    </a>
                  )}
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      tones[a.status],
                    )}
                  >
                    {a.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
