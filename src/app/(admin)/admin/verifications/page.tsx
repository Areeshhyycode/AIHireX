import { connectDB } from "@/lib/db";
import { CompanyModel } from "@/models/company";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Section } from "@/components/dashboard/section";
import { VerificationActions } from "@/components/admin/verification-actions";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

type Row = {
  _id: unknown;
  name?: string;
  email?: string;
  website?: string;
  linkedin?: string;
  registrationNumber?: string;
  address?: string;
  status: string;
  createdAt: Date;
};

const tones: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  suspicious: "bg-orange-100 text-orange-700",
};

export default async function AdminVerificationsPage() {
  await connectDB();
  const rows = await CompanyModel.find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .lean<Row[]>();
  const pending = rows.filter((r) => r.status === "pending");
  const reviewed = rows.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company verifications</h1>
        <p className="mt-1 text-sm text-slate-500">
          {pending.length} pending · {reviewed.length} reviewed
        </p>
      </div>

      <Section title="Pending review">
        {pending.length === 0 ? (
          <EmptyState
            icon={ShieldCheck}
            title="No pending verifications"
            body="Recruiter submissions will appear here."
          />
        ) : (
          <div className="space-y-3">
            {pending.map((c) => (
              <Row key={String(c._id)} c={c} />
            ))}
          </div>
        )}
      </Section>

      {reviewed.length > 0 && (
        <Section title="Reviewed">
          <div className="space-y-2">
            {reviewed.map((c) => (
              <div key={String(c._id)} className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">{c.name ?? "Unnamed"}</p>
                  <p className="text-xs text-slate-500">{c.email}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${tones[c.status] ?? ""}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Row({ c }: { c: Row }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-slate-900">{c.name ?? "Unnamed"}</p>
          <div className="mt-1 text-xs text-slate-500">
            {c.email} {c.website ? `· ${c.website}` : ""}
          </div>
          {c.linkedin && <p className="mt-0.5 text-xs text-slate-500">LinkedIn: {c.linkedin}</p>}
          {c.registrationNumber && <p className="mt-0.5 text-xs text-slate-500">Reg #: {c.registrationNumber}</p>}
          {c.address && <p className="mt-0.5 text-xs text-slate-500">{c.address}</p>}
        </div>
        <VerificationActions id={String(c._id)} />
      </div>
    </div>
  );
}
