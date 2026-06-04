import { auth } from "@clerk/nextjs/server";
import { ShieldCheck, AlertTriangle, Clock, BadgeCheck } from "lucide-react";
import { connectDB } from "@/lib/db";
import { CompanyModel } from "@/models/company";
import { VerificationForm, type CompanyForm } from "@/components/verification/verification-form";

export const dynamic = "force-dynamic";

type Doc = CompanyForm & {
  status?: "pending" | "verified" | "rejected" | "suspicious";
  rejectionReason?: string;
};

export default async function VerificationPage() {
  const { userId } = auth();
  await connectDB();
  const doc = userId
    ? ((await CompanyModel.findOne({ recruiterClerkId: userId }).lean()) as Doc | null)
    : null;
  const status = doc?.status ?? "none";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company verification</h1>
        <p className="mt-1 text-sm text-slate-500">
          Verified companies get a blue tick, better visibility, and zero scam reports.
        </p>
      </div>

      {status === "verified" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-6 w-6 text-emerald-600" />
            <div>
              <p className="font-semibold text-emerald-900">{doc?.name} is verified ✓</p>
              <p className="text-xs text-emerald-800">You can post jobs and reach candidates.</p>
            </div>
          </div>
        </div>
      )}
      {status === "pending" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-900">Under review</p>
              <p className="text-xs text-amber-800">AIHireX admin will verify {doc?.name} within 24 hours.</p>
            </div>
          </div>
        </div>
      )}
      {status === "rejected" && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-rose-600" />
            <div>
              <p className="font-semibold text-rose-900">Verification rejected</p>
              <p className="text-xs text-rose-800">{doc?.rejectionReason ?? "Please update your details and resubmit."}</p>
            </div>
          </div>
        </div>
      )}
      {status === "none" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-brand-600" />
            <p className="text-sm font-medium text-slate-900">
              Submit your company details below to start the verification process.
            </p>
          </div>
        </div>
      )}

      <VerificationForm initial={doc ?? {}} />
    </div>
  );
}
