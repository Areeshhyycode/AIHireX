import { auth } from "@clerk/nextjs/server";
import { Briefcase, Users, FileCheck2, Sparkles } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { BarChart } from "@/components/analytics/bar-chart";
import { getRecruiterStats } from "@/lib/analytics/recruiter";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const { userId } = auth();
  const stats = userId
    ? await getRecruiterStats(userId)
    : { jobsPublished: 0, applications: 0, interviews: 0, offers: 0, byDay: [], funnel: [] };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Last 7 days · your jobs</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Jobs published" value={String(stats.jobsPublished)} icon={<Briefcase className="h-5 w-5" />} />
        <StatCard label="Applications" value={String(stats.applications)} icon={<Users className="h-5 w-5" />} tone="violet" />
        <StatCard label="Interviews" value={String(stats.interviews)} icon={<FileCheck2 className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Offers" value={String(stats.offers)} icon={<Sparkles className="h-5 w-5" />} tone="amber" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Applications by day">
          <BarChart data={stats.byDay} />
        </Section>
        <Section title="Hiring funnel">
          <div className="space-y-3">
            {stats.funnel.map((f) => {
              const max = Math.max(...stats.funnel.map((x) => x.value), 1);
              return (
                <div key={f.stage}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium capitalize text-slate-700">{f.stage}</span>
                    <span className="font-semibold text-slate-900">{f.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${(f.value / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
