import { Section } from "@/components/dashboard/section";
import { ReportRow } from "@/components/admin/report-row";
import { mockReports } from "@/lib/mock/admin";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">
          Community + AI-flagged content awaiting review
        </p>
      </div>
      <Section title="All reports">
        <div className="-mx-4">
          <div className="grid grid-cols-12 gap-3 border-b border-slate-200 px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span className="col-span-1" />
            <span className="col-span-3">Type</span>
            <span className="col-span-4">Target</span>
            <span className="col-span-2">Reporter</span>
            <span className="col-span-1">Time</span>
            <span className="col-span-1 text-center">Status</span>
          </div>
          {mockReports.map((r) => (
            <ReportRow key={r.id} r={r} />
          ))}
        </div>
      </Section>
    </div>
  );
}
