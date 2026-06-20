import Link from "next/link";
import { ArrowRight, Clock, Mic } from "lucide-react";

export type Session = {
  id: string;
  role: string;
  type: string;
  score: number;
  time: string;
};

export function PastSessions({ sessions = [] }: { sessions?: Session[] }) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400">
          <Mic className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-slate-900">No past sessions yet</p>
        <p className="mt-1 text-xs text-slate-500">
          Your transcripts and scores will appear here after your first interview.
        </p>
      </div>
    );
  }

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
