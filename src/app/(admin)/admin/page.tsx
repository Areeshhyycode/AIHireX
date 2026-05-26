import { Users, Briefcase, ShieldCheck, Flag } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { BarChart } from "@/components/analytics/bar-chart";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const signups = [120, 180, 142, 210, 198, 88, 102];
const blocked = [4, 7, 5, 9, 12, 3, 6];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform overview</h1>
        <p className="mt-1 text-sm text-slate-500">All systems healthy · last refreshed 2 min ago</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value="42,180" delta="+1,040 this week" icon={<Users className="h-5 w-5" />} />
        <StatCard label="Active jobs" value="3,214" delta="+128 this week" icon={<Briefcase className="h-5 w-5" />} tone="violet" />
        <StatCard label="Verified companies" value="612" delta="+24 this week" icon={<ShieldCheck className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Reports open" value="5" delta="2 high priority" icon={<Flag className="h-5 w-5" />} tone="amber" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="New signups · last 7 days">
          <BarChart data={days.map((d, i) => ({ label: d, value: signups[i] }))} />
        </Section>
        <Section title="Fake/spam blocked · last 7 days">
          <BarChart data={days.map((d, i) => ({ label: d, value: blocked[i] }))} />
        </Section>
      </div>
    </div>
  );
}
