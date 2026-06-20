import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Briefcase, Users, FileCheck2, Sparkles, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getMe } from "@/lib/auth";
import { listJobsByRecruiter } from "@/lib/jobs/fetch";
import {
  listApplicantsForRecruiter,
  type ApplicationItem,
} from "@/lib/applications/fetch";
import { getRecruiterStats } from "@/lib/analytics/recruiter";

export const dynamic = "force-dynamic";

const stageTones: Record<ApplicationItem["status"], string> = {
  applied: "bg-slate-100 text-slate-700",
  reviewing: "bg-amber-100 text-amber-700",
  interview: "bg-blue-100 text-blue-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  withdrawn: "bg-slate-100 text-slate-500",
};

export default async function RecruiterDashboard() {
  const { userId } = auth();
  const me = await getMe();
  const firstName = me?.name?.split(" ")[0] ?? "there";

  const [stats, jobs, apps] = await Promise.all([
    userId
      ? getRecruiterStats(userId)
      : Promise.resolve({
          jobsPublished: 0,
          applications: 0,
          interviews: 0,
          offers: 0,
          byDay: [],
          funnel: [],
        }),
    userId ? listJobsByRecruiter(userId) : Promise.resolve([]),
    userId ? listApplicantsForRecruiter(userId) : Promise.resolve([]),
  ]);

  const recentJobs = jobs.slice(0, 4);
  const topApplicants = apps.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            Hi {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {stats.applications === 0
              ? "Post your first job to start receiving applicants."
              : `${stats.applications} application${stats.applications === 1 ? "" : "s"} across your jobs.`}
          </p>
        </div>
        <Link
          href="/recruiter/jobs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Post a job
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active jobs" value={String(stats.jobsPublished)} icon={<Briefcase className="h-5 w-5" />} />
        <StatCard label="Applicants" value={String(stats.applications)} icon={<Users className="h-5 w-5" />} tone="violet" />
        <StatCard label="Interviews" value={String(stats.interviews)} icon={<FileCheck2 className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Offers" value={String(stats.offers)} icon={<Sparkles className="h-5 w-5" />} tone="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Recent job posts" subtitle="Your latest jobs" href="/recruiter/jobs">
            {recentJobs.length === 0 ? (
              <EmptyState
                icon={Briefcase}
                title="No jobs posted yet"
                body="Post your first job to start receiving applications."
                ctaLabel="Post a job"
                ctaHref="/recruiter/jobs/new"
              />
            ) : (
              <div className="space-y-2">
                {recentJobs.map((j) => (
                  <Link
                    key={j.id}
                    href={`/recruiter/jobs/${j.id}`}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 hover:bg-slate-50"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{j.title}</p>
                      <p className="text-xs text-slate-500">
                        {j.location} · {j.type}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      {j.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </Section>
        </div>

        <Section title="Recent applicants" subtitle="From your jobs" href="/recruiter/applicants">
          {topApplicants.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No applicants yet"
              body="When candidates apply, they'll show up here."
            />
          ) : (
            <div className="space-y-2">
              {topApplicants.map((a) => (
                <Link
                  key={a.id}
                  href={`/recruiter/applicants/${a.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {a.candidateName ?? a.candidateEmail ?? "Anonymous"}
                    </p>
                    <p className="truncate text-xs text-slate-500">{a.jobTitle}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${stageTones[a.status]}`}
                  >
                    {a.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
