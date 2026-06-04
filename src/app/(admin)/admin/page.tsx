import { Users, Briefcase, ShieldCheck, Flag } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user";
import { JobModel } from "@/models/job";
import { CompanyModel } from "@/models/company";
import { ReportModel } from "@/models/report";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  await connectDB();
  const [users, jobs, verified, openReports, pendingCompanies] =
    await Promise.all([
      UserModel.countDocuments({}).catch(() => 0),
      JobModel.countDocuments({ status: "published" }).catch(() => 0),
      CompanyModel.countDocuments({ status: "verified" }).catch(() => 0),
      ReportModel.countDocuments({ status: "open" }).catch(() => 0),
      CompanyModel.countDocuments({ status: "pending" }).catch(() => 0),
    ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform overview</h1>
        <p className="mt-1 text-sm text-slate-500">Real-time platform metrics</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={String(users)} icon={<Users className="h-5 w-5" />} />
        <StatCard label="Active jobs" value={String(jobs)} icon={<Briefcase className="h-5 w-5" />} tone="violet" />
        <StatCard label="Verified companies" value={String(verified)} icon={<ShieldCheck className="h-5 w-5" />} tone="emerald" />
        <StatCard label="Reports open" value={String(openReports)} icon={<Flag className="h-5 w-5" />} tone="amber" />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm">
          <span className="font-medium text-slate-900">{pendingCompanies}</span> company
          {pendingCompanies === 1 ? "" : "ies"} awaiting verification ·{" "}
          <span className="font-medium text-slate-900">{openReports}</span> open report{openReports === 1 ? "" : "s"}.
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Use the sidebar to review the queue.
        </p>
      </div>
    </div>
  );
}
