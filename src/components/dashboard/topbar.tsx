import { Bell, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { getMe } from "@/lib/auth";

const roleLabel: Record<string, string> = {
  candidate: "Candidate",
  recruiter: "Recruiter",
  admin: "Admin",
};

export async function Topbar({
  fallbackName = "You",
  fallbackRole = "Candidate",
}: {
  fallbackName?: string;
  fallbackRole?: string;
}) {
  const me = await getMe();
  const name = me?.name ?? fallbackName;
  const role = me?.role ? roleLabel[me.role] : fallbackRole;
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
        <div className="hidden text-right text-sm sm:block">
          <div className="font-medium text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{role}</div>
        </div>
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: "h-9 w-9" } }}
        />
      </div>
    </header>
  );
}
