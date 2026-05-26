import { ApplicationRow, type Application } from "@/components/candidate/application-row";

const tabs = ["All", "Applied", "Reviewing", "Interview", "Offer", "Rejected"];

export function ApplicationsTable({ apps }: { apps: Application[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center gap-1 border-b border-slate-200 px-4 py-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={
              "rounded-md px-3 py-1.5 text-sm font-medium transition " +
              (i === 0
                ? "bg-brand-50 text-brand-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")
            }
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-3">
        <div className="space-y-2">
          {apps.map((a) => (
            <ApplicationRow key={`${a.company}-${a.role}`} app={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
