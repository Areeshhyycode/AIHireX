import { Briefcase, FileCheck2, Target, Sparkles } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { WelcomeBanner } from "@/components/candidate/welcome-banner";
import { ApplicationRow } from "@/components/candidate/application-row";
import { JobRecommendation } from "@/components/candidate/job-recommendation";
import { mockApplications, mockRecommendations } from "@/lib/mock/candidate";

export default function CandidateDashboard() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value="14" delta="+3 this week" icon={<Briefcase className="h-5 w-5" />} />
        <StatCard label="Interviews" value="3" delta="+1 scheduled" icon={<FileCheck2 className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Profile views" value="142" delta="+28% vs last week" icon={<Target className="h-5 w-5" />} tone="amber" />
        <StatCard label="Resume score" value="84/100" delta="+12 since AI fix" icon={<Sparkles className="h-5 w-5" />} tone="violet" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section
            title="Recent applications"
            subtitle="Track every job you've applied to"
            href="/candidate/applications"
          >
            <div className="space-y-2">
              {mockApplications.map((a) => (
                <ApplicationRow key={`${a.company}-${a.role}`} app={a} />
              ))}
            </div>
          </Section>
        </div>
        <Section
          title="Recommended for you"
          subtitle="Picked by AI from 12,000+ jobs"
          href="/candidate/jobs"
        >
          <div className="space-y-3">
            {mockRecommendations.map((r) => (
              <JobRecommendation key={r.id} job={r} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
