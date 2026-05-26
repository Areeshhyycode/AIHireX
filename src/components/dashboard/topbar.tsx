import { Bell, Search } from "lucide-react";

export function Topbar({
  name = "Areesha",
  role = "Candidate",
}: {
  name?: string;
  role?: string;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search jobs, companies, skills..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-400 focus:bg-white"
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-center text-sm font-semibold leading-9 text-white">
            {name.charAt(0)}
          </div>
          <div className="hidden text-sm sm:block">
            <div className="font-medium text-slate-900">{name}</div>
            <div className="text-xs text-slate-500">{role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
