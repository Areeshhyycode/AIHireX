import { auth } from "@clerk/nextjs/server";
import { Briefcase, FileCheck2, Target, Sparkles } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { WelcomeBanner } from "@/components/candidate/welcome-banner";
import { JobRecommendation } from "@/components/candidate/job-recommendation";
import { listJobs } from "@/lib/jobs/fetch";
import { toCardJob } from "@/lib/jobs/to-card";
import { getMe } from "@/lib/auth";
import { countMyApplications, listMyApplications } from "@/lib/applications/fetch";
import { getMyProfile } from "@/lib/users/upsert";

export const dynamic = "force-dynamic";

export default async function CandidateDashboard() {
  const { userId } = auth();
  const me = await getMe();
  const firstName = me?.name?.split(" ")[0] ?? "there";

  const [live, counts, recent, profile] = await Promise.all([
    listJobs({ limit: 5 }),
    userId ? countMyApplications(userId) : Promise.resolve({ total: 0, interviews: 0 }),
    userId ? listMyApplications(userId) : Promise.resolve([]),
    userId ? getMyProfile() : Promise.resolve(null),
  ]);

  const recs = live.map(toCardJob);
  const resume = (profile as { resume?: { atsScore?: number; url?: string } } | null)?.resume;
  const resumeScore = resume?.atsScore;

  return (
    <div className="space-y-6">
      <WelcomeBanner name={firstName} resumeUploaded={Boolean(resume?.url)} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={String(counts.total)} icon={<Briefcase className="h-5 w-5" />} />
        <StatCard label="Interviews" value={String(counts.interviews)} icon={<FileCheck2 className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Profile views" value="—" icon={<Target className="h-5 w-5" />} tone="amber" />
        <StatCard label="Resume score" value={resumeScore ? `${resumeScore}/100` : "—"} icon={<Sparkles className="h-5 w-5" />} tone="violet" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section title="Recent applications" subtitle="Latest 5" href="/candidate/applications">
            {recent.length === 0 ? (
              <EmptyState
                icon={Briefcase}
                title="No applications yet"
                body="Browse jobs and apply with one click."
                ctaLabel="Browse jobs"
                ctaHref="/candidate/jobs"
              />
            ) : (
              <div className="space-y-2">
                {recent.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900">{a.jobTitle}</p>
                      <p className="text-xs text-slate-500">{a.company}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-700">
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
        <Section
          title="Recommended for you"
          subtitle={recs.length ? "From verified recruiters" : "We'll suggest jobs after your resume"}
          href={recs.length ? "/candidate/jobs" : undefined}
        >
          {recs.length ? (
            <div className="space-y-3">
              {recs.map((r) => (
                <JobRecommendation key={r.id} job={r} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Sparkles}
              title="No jobs yet"
              body="Recommendations appear after recruiters post."
              ctaLabel="Analyze resume"
              ctaHref="/candidate/resume/analyzer"
            />
          )}
        </Section>
      </div>
    </div>
  );
}
