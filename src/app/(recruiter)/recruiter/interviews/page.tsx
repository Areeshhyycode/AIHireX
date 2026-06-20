import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { CalendarCheck, Mail } from "lucide-react";
import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { listApplicantsForRecruiter } from "@/lib/applications/fetch";

export const dynamic = "force-dynamic";

export default async function InterviewsPage() {
  const { userId } = auth();
  const all = userId ? await listApplicantsForRecruiter(userId) : [];
  const interviews = all.filter((a) => a.status === "interview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Interviews</h1>
        <p className="mt-1 text-sm text-slate-500">
          {interviews.length} candidate{interviews.length === 1 ? "" : "s"} in the interview stage
        </p>
      </div>
      <Section title="Scheduled interviews">
        {interviews.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            title="No interviews yet"
            body='Move an applicant to "Interview" stage and we will email them an invite automatically.'
            ctaLabel="View applicants"
            ctaHref="/recruiter/applicants"
          />
        ) : (
          <div className="space-y-2">
            {interviews.map((a) => (
              <Link
                key={a.id}
                href={`/recruiter/applicants/${a.id}`}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {a.candidateName ?? a.candidateEmail}
                  </p>
                  <p className="text-xs text-slate-500">
                    Applied for <span className="font-medium">{a.jobTitle}</span>
                  </p>
                </div>
                {a.candidateEmail && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Mail className="h-3.5 w-3.5" />
                    {a.candidateEmail}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
