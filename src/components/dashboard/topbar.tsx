import { Bell } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getMe } from "@/lib/auth";
import { TopbarSearch } from "@/components/dashboard/topbar-search";
import { countUnreadNotifications } from "@/lib/notifications/fetch";

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
  const unread = me?.id ? await countUnreadNotifications(me.id) : 0;

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <TopbarSearch role={me?.role ?? undefined} />
      <div className="flex items-center gap-4">
        <Link
          href={
            me?.role === "recruiter"
              ? "/recruiter/notifications"
              : me?.role === "admin"
                ? "/admin/notifications"
                : "/candidate/notifications"
          }
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Link>
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
