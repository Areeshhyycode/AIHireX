import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import type { Report } from "@/lib/mock/admin";

const typeTones: Record<Report["type"], string> = {
  "Fake job": "bg-rose-100 text-rose-700",
  "Scam interview": "bg-rose-100 text-rose-700",
  Spam: "bg-amber-100 text-amber-700",
  "Payment demand": "bg-rose-100 text-rose-700",
};

export function ReportRow({ r }: { r: Report }) {
  return (
    <div className="grid grid-cols-12 items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-slate-50">
      <div className="col-span-1">
        <Flag className="h-4 w-4 text-rose-500" />
      </div>
      <span className={cn("col-span-3 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium", typeTones[r.type])}>
        {r.type}
      </span>
      <p className="col-span-4 truncate text-sm text-slate-700">{r.target}</p>
      <p className="col-span-2 truncate text-xs text-slate-500">{r.reporter}</p>
      <p className="col-span-1 text-xs text-slate-500">{r.time}</p>
      <span className={cn("col-span-1 rounded-full px-2 py-0.5 text-center text-xs font-medium", r.status === "Open" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700")}>
        {r.status}
      </span>
    </div>
  );
}
