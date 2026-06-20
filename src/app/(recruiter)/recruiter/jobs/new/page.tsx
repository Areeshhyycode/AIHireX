import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { PostJobForm } from "@/components/recruiter/post-job-form";
import { connectDB } from "@/lib/db";
import { CompanyModel } from "@/models/company";

export const dynamic = "force-dynamic";

export default async function NewJobPage() {
  const { userId } = auth();
  await connectDB();
  const company = userId
    ? await CompanyModel.findOne({ recruiterClerkId: userId }).lean<{
        status?: string;
      } | null>()
    : null;
  const verified = company?.status === "verified";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Post a new job</h1>
        <p className="mt-1 text-sm text-slate-500">
          AI will check authenticity and suggest improvements before publishing.
        </p>
      </div>
      {verified ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <p className="text-emerald-900">
            Verified company — your jobs go live instantly.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <p className="text-amber-900">
              You can&apos;t publish jobs until your company is verified.
            </p>
          </div>
          <Link
            href="/recruiter/verification"
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
          >
            Verify company →
          </Link>
        </div>
      )}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <PostJobForm />
      </div>
    </div>
  );
}
