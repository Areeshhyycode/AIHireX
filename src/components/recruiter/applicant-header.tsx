import { MapPin, Briefcase, Mail, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApplicantHeader() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-2xl font-bold text-white">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Areesha Ahmed</h1>
            <p className="text-sm text-slate-600">Applied for Senior Frontend Engineer · 2h ago</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Karachi · Remote OK</span>
              <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> 6 years</span>
              <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> areeshazv@gmail.com</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-1.5 h-4 w-4" />
            Schedule interview
          </Button>
          <Button variant="outline">Reject</Button>
          <Button>Move to next stage →</Button>
        </div>
      </div>
    </div>
  );
}
