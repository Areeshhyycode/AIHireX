import Link from "next/link";
import { Briefcase, Users, ShieldCheck, Sparkles, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Section } from "@/components/dashboard/section";
import { HiringFunnel } from "@/components/recruiter/hiring-funnel";
import { JobPostRow } from "@/components/recruiter/job-post-row";
import { TopApplicantCard } from "@/components/recruiter/top-applicant-card";
import { mockJobPosts, mockApplicants } from "@/lib/mock/recruiter";

export default function RecruiterDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hi Areesha 👋</h1>
          <p className="mt-1 text-sm text-slate-500">
            7 new shortlists from AI overnight. 3 interviews scheduled for today.
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
        <StatCard label="Active jobs" value="8" delta="+2 this month" icon={<Briefcase className="h-5 w-5" />} />
        <StatCard label="Applicants" value="412" delta="+58 this week" icon={<Users className="h-5 w-5" />} tone="violet" />
        <StatCard label="AI shortlisted" value="48" delta="11% conversion" icon={<Sparkles className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Trust score" value="98/100" delta="Blue tick verified" icon={<ShieldCheck className="h-5 w-5" />} tone="amber" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Recent job posts" subtitle="Performance by role" href="/recruiter/jobs">
            <div className="-mx-4">
              {mockJobPosts.slice(0, 4).map((j) => (
                <JobPostRow key={j.id} job={j} />
              ))}
            </div>
          </Section>
          <Section title="Hiring funnel" subtitle="Last 30 days across all jobs">
            <HiringFunnel />
          </Section>
        </div>
        <Section title="Top AI-shortlisted" subtitle="Highest match this week" href="/recruiter/applicants">
          <div className="space-y-2">
            {mockApplicants.slice(0, 5).map((a) => (
              <TopApplicantCard key={a.id} a={a} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
