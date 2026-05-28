import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Briefcase } from "lucide-react";
import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { listMyApplications, type ApplicationItem } from "@/lib/applications/fetch";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const tones: Record<ApplicationItem["status"], string> = {
  applied: "bg-slate-100 text-slate-700",
  reviewing: "bg-amber-100 text-amber-700",
  interview: "bg-blue-100 text-blue-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  withdrawn: "bg-slate-100 text-slate-500",
};

function timeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default async function ApplicationsPage() {
  const { userId } = auth();
  const apps = userId ? await listMyApplications(userId) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
        <p className="mt-1 text-sm text-slate-500">
          {apps.length} application{apps.length === 1 ? "" : "s"}.
        </p>
      </div>
      <Section title="All applications">
        {apps.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No applications yet"
            body="Browse jobs and apply with one click. Status updates appear here."
            ctaLabel="Browse jobs"
            ctaHref="/candidate/jobs"
          />
        ) : (
          <div className="space-y-2">
            {apps.map((a) => (
              <Link
                key={a.id}
                href={`/candidate/jobs/${a.jobId}`}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-900">{a.jobTitle}</p>
                  <p className="text-xs text-slate-500">
                    {a.company} · applied {timeAgo(a.appliedAt)}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                    tones[a.status],
                  )}
                >
                  {a.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
