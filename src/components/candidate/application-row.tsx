import { cn } from "@/lib/utils";

type Status = "Applied" | "Reviewing" | "Interview" | "Offer" | "Rejected";

const tones: Record<Status, string> = {
  Applied: "bg-slate-100 text-slate-700",
  Reviewing: "bg-amber-100 text-amber-700",
  Interview: "bg-blue-100 text-blue-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

export type Application = {
  company: string;
  role: string;
  location: string;
  appliedOn: string;
  status: Status;
  matchScore: number;
};

export function ApplicationRow({ app }: { app: Application }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 hover:bg-slate-50">
      <div>
        <p className="font-medium text-slate-900">{app.role}</p>
        <p className="text-xs text-slate-500">
          {app.company} · {app.location} · Applied {app.appliedOn}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-slate-500">Match</p>
          <p className="text-sm font-semibold text-brand-600">
            {app.matchScore}%
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            tones[app.status],
          )}
        >
          {app.status}
        </span>
      </div>
    </div>
  );
}
