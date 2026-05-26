import { ApplicantHeader } from "@/components/recruiter/applicant-header";
import { AiSummaryCard } from "@/components/recruiter/ai-summary-card";
import { Section } from "@/components/dashboard/section";
import { ExperienceItem } from "@/components/profile/experience-item";
import { mockExperience, mockSkills } from "@/lib/mock/profile";

export default function ApplicantDetailPage() {
  return (
    <div className="space-y-6">
      <ApplicantHeader />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Experience">
            <div className="divide-y divide-slate-100">
              {mockExperience.map((e) => (
                <ExperienceItem key={e.company} exp={e} />
              ))}
            </div>
          </Section>
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {mockSkills.map((s) => (
                <span key={s} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Resume">
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
              [PDF preview placeholder]
            </div>
          </Section>
        </div>
        <div className="space-y-6">
          <AiSummaryCard />
          <Section title="Notes">
            <textarea
              rows={5}
              placeholder="Add a private note about this candidate..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </Section>
        </div>
      </div>
    </div>
  );
}
