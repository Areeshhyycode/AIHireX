import { Section } from "@/components/dashboard/section";
import { ApplicantRow } from "@/components/recruiter/applicant-row";
import { mockApplicants } from "@/lib/mock/recruiter";
import { Search } from "lucide-react";

export default function ApplicantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applicants</h1>
        <p className="mt-1 text-sm text-slate-500">
          {mockApplicants.length} candidates · AI-ranked by match score · fake/spam filtered
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, skill, location..."
            className="h-10 w-full rounded-lg bg-slate-50 pl-9 pr-3 text-sm outline-none focus:bg-white"
          />
        </div>
        <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
          <option>All jobs</option>
          <option>Senior Frontend Engineer</option>
          <option>Backend Engineer (Go)</option>
          <option>Product Designer</option>
        </select>
        <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
          <option>All stages</option>
          <option>Applied</option>
          <option>Reviewed</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>
      <Section title="Candidates">
        <div className="-mx-4">
          <div className="grid grid-cols-12 gap-3 border-b border-slate-200 px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span className="col-span-4">Candidate</span>
            <span className="col-span-3">Applied for</span>
            <span className="col-span-1">Match</span>
            <span className="col-span-1">Resume</span>
            <span className="col-span-1">Risk</span>
            <span className="col-span-2 text-center">Stage</span>
          </div>
          {mockApplicants.map((a) => (
            <ApplicantRow key={a.id} a={a} />
          ))}
        </div>
      </Section>
    </div>
  );
}
