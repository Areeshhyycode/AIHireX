import { Briefcase, FileCheck2, Target, Sparkles } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { WelcomeBanner } from "@/components/candidate/welcome-banner";
import { JobRecommendation } from "@/components/candidate/job-recommendation";
import { listJobs } from "@/lib/jobs/fetch";
import { toCardJob } from "@/lib/jobs/to-card";
import { getMe } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function CandidateDashboard() {
  const me = await getMe();
  const firstName = me?.name?.split(" ")[0] ?? "there";

  const live = await listJobs({ limit: 5 });
  const recs = live.map(toCardJob);

  return (
    <div className="space-y-6">
      <WelcomeBanner name={firstName} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value="0" icon={<Briefcase className="h-5 w-5" />} />
        <StatCard label="Interviews" value="0" icon={<FileCheck2 className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Profile views" value="0" icon={<Target className="h-5 w-5" />} tone="amber" />
        <StatCard label="Resume score" value="—" icon={<Sparkles className="h-5 w-5" />} tone="violet" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section
            title="Recent applications"
            subtitle="Jobs you apply to will show up here"
          >
            <EmptyState
              icon={Briefcase}
              title="No applications yet"
              body="Browse jobs and apply with one click. Your applications and their status will show up here."
              ctaLabel="Browse jobs"
              ctaHref="/candidate/jobs"
            />
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
              body="Recommendations appear once recruiters post and you've analyzed your resume."
              ctaLabel="Analyze resume"
              ctaHref="/candidate/resume/analyzer"
            />
          )}
        </Section>
      </div>
    </div>
  );
}
