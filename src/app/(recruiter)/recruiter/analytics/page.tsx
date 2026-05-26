import { Users, Eye, Clock, Sparkles } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { BarChart } from "@/components/analytics/bar-chart";
import { SourceList } from "@/components/analytics/source-list";
import { HiringFunnel } from "@/components/recruiter/hiring-funnel";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const apps = [42, 58, 51, 88, 76, 23, 31];
const views = [180, 220, 195, 310, 285, 110, 140];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Last 7 days · across all job posts</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Job views" value="1,440" delta="+18% vs last week" icon={<Eye className="h-5 w-5" />} />
        <StatCard label="Applications" value="369" delta="+22% vs last week" icon={<Users className="h-5 w-5" />} tone="violet" />
        <StatCard label="AI shortlisted" value="48" delta="+31% vs last week" icon={<Sparkles className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Avg. time to hire" value="14 days" delta="-3 days" icon={<Clock className="h-5 w-5" />} tone="amber" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Applications by day">
          <BarChart data={days.map((d, i) => ({ label: d, value: apps[i] }))} />
        </Section>
        <Section title="Job views by day">
          <BarChart data={days.map((d, i) => ({ label: d, value: views[i] }))} />
        </Section>
        <Section title="Hiring funnel">
          <HiringFunnel />
        </Section>
        <Section title="Traffic sources">
          <SourceList />
        </Section>
      </div>
    </div>
  );
}
