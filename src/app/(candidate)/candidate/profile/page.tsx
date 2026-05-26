import { ProfileHeader } from "@/components/profile/profile-header";
import { ExperienceItem } from "@/components/profile/experience-item";
import { Section } from "@/components/dashboard/section";
import { mockExperience, mockEducation, mockSkills } from "@/lib/mock/profile";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section title="Experience">
            <div className="divide-y divide-slate-100">
              {mockExperience.map((e) => (
                <ExperienceItem key={e.company} exp={e} />
              ))}
            </div>
          </Section>
          <Section title="Education">
            {mockEducation.map((e) => (
              <div key={e.school} className="py-2">
                <p className="font-semibold text-slate-900">{e.school}</p>
                <p className="text-sm text-slate-600">{e.degree} · {e.duration}</p>
              </div>
            ))}
          </Section>
        </div>
        <div className="space-y-6">
          <Section title="Skills" subtitle={`${mockSkills.length} added`}>
            <div className="flex flex-wrap gap-1.5">
              {mockSkills.map((s) => (
                <span key={s} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Profile strength">
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-emerald-600">All-Star · 92%</p>
              <p className="text-xs text-slate-500">
                Add 2 certifications and a portfolio link to hit 100%.
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
