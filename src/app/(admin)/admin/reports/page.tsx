import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ReportActions } from "@/components/admin/report-actions";
import { connectDB } from "@/lib/db";
import { ReportModel } from "@/models/report";
import { AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

type Row = {
  _id: unknown;
  reporterClerkId: string;
  targetType: string;
  targetId: unknown;
  reason: string;
  notes?: string;
  status: string;
  createdAt: Date;
};

const tones: Record<string, string> = {
  open: "bg-amber-100 text-amber-700",
  resolved: "bg-emerald-100 text-emerald-700",
  dismissed: "bg-slate-100 text-slate-700",
};

export default async function AdminReportsPage() {
  await connectDB();
  const rows = await ReportModel.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .lean<Row[]>();
  const open = rows.filter((r) => r.status === "open");
  const done = rows.filter((r) => r.status !== "open");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">
          {open.length} open · {done.length} reviewed
        </p>
      </div>
      <Section title="Open reports">
        {open.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No open reports"
            body="Community + AI-flagged content will appear here."
          />
        ) : (
          <div className="space-y-3">
            {open.map((r) => (
              <Card key={String(r._id)} r={r} />
            ))}
          </div>
        )}
      </Section>
      {done.length > 0 && (
        <Section title="Reviewed">
          <div className="space-y-2">
            {done.map((r) => (
              <div key={String(r._id)} className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium text-slate-900 capitalize">{r.reason} · {r.targetType}</p>
                  <p className="text-xs text-slate-500">Target: {String(r.targetId)}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${tones[r.status] ?? ""}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Card({ r }: { r: Row }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold capitalize text-slate-900">
            {r.reason} <span className="text-slate-400">·</span> {r.targetType}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">Target ID: {String(r.targetId)}</p>
          {r.notes && <p className="mt-2 text-sm text-slate-700">{r.notes}</p>}
        </div>
        <ReportActions id={String(r._id)} />
      </div>
    </div>
  );
}
