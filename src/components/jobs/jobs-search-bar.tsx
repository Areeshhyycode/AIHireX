import { Search, MapPin, SlidersHorizontal } from "lucide-react";

export function JobsSearchBar() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder='Try "remote React jobs"'
          className="h-10 w-full rounded-lg bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 outline-none focus:bg-white"
        />
      </div>
      <div className="relative hidden flex-1 sm:block">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Location or 'Remote'"
          className="h-10 w-full rounded-lg bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 outline-none focus:bg-white"
        />
      </div>
      <button className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 lg:hidden">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>
      <button className="h-10 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700">
        Search
      </button>
    </div>
  );
}
