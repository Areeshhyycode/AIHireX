import { Pencil, MapPin, Mail, Link as LinkIcon } from "lucide-react";

export function ProfileHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-32 bg-gradient-to-r from-brand-500 via-violet-600 to-pink-500" />
      <div className="px-6 pb-6">
        <div className="-mt-12 flex items-end gap-4">
          <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-br from-brand-500 to-brand-700 text-center text-3xl font-bold leading-[5.5rem] text-white">
            A
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-xl font-bold text-slate-900">Areesha Ahmed</h1>
            <p className="text-sm text-slate-600">
              Frontend Engineer · React + TypeScript · Karachi, PK
            </p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Pencil className="h-3.5 w-3.5" />
            Edit profile
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-slate-400" />
            Karachi, Pakistan
          </span>
          <span className="inline-flex items-center gap-1">
            <Mail className="h-4 w-4 text-slate-400" />
            areeshazv@gmail.com
          </span>
          <span className="inline-flex items-center gap-1">
            <LinkIcon className="h-4 w-4 text-slate-400" />
            areesha.dev
          </span>
        </div>
      </div>
    </div>
  );
}
