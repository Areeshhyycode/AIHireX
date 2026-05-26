import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const sessions = [
  { id: "s1", role: "Senior Frontend Engineer", type: "Technical", score: 82, time: "Today" },
  { id: "s2", role: "Product Manager", type: "Behavioral", score: 74, time: "Yesterday" },
  { id: "s3", role: "Full-stack Engineer", type: "Technical", score: 88, time: "3d ago" },
];

export function PastSessions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-900">Past sessions</h3>
      <div className="mt-4 space-y-2">
        {sessions.map((s) => (
          <Link
            key={s.id}
            href={`/candidate/interview/${s.id}`}
            className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{s.role}</p>
              <p className="text-xs text-slate-500">
                {s.type} · <Clock className="-mt-0.5 inline h-3 w-3" /> {s.time}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-brand-600">{s.score}/100</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
