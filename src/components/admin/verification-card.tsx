import { BadgeCheck, Globe, Linkedin, Mail } from "lucide-react";

export type PendingCompany = {
  id: string;
  name: string;
  domain: string;
  email: string;
  linkedin: string;
  reg: string;
  submittedAgo: string;
  aiScore: number;
};

export function VerificationCard({ c }: { c: PendingCompany }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900">{c.name}</p>
          <p className="text-xs text-slate-500">Submitted {c.submittedAgo}</p>
        </div>
        <div className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          AI score: {c.aiScore}/100
        </div>
      </div>
      <div className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
        <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> {c.domain}</span>
        <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {c.email}</span>
        <span className="inline-flex items-center gap-1.5"><Linkedin className="h-3.5 w-3.5" /> {c.linkedin}</span>
        <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5" /> Reg: {c.reg}</span>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button className="rounded-md px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50">
          Reject
        </button>
        <button className="rounded-md bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-700 hover:bg-amber-200">
          Request info
        </button>
        <button className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700">
          Approve
        </button>
      </div>
    </div>
  );
}
