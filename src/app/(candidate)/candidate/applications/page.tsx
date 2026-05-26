import { ApplicationsTable } from "@/components/candidate/applications-table";
import { mockApplications } from "@/lib/mock/candidate";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every job you&apos;ve applied to — with live status from recruiters.
        </p>
      </div>
      <ApplicationsTable apps={mockApplications} />
    </div>
  );
}
