import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Bell, Briefcase, FileCheck2, AlertCircle, Sparkles } from "lucide-react";
import { Section } from "@/components/dashboard/section";
import { EmptyState } from "@/components/dashboard/empty-state";
import { MarkReadButton } from "@/components/notifications/mark-read-button";
import { listNotifications, type NotificationItem } from "@/lib/notifications/fetch";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const iconFor: Record<NotificationItem["type"], React.ReactNode> = {
  application: <Briefcase className="h-4 w-4" />,
  interview: <FileCheck2 className="h-4 w-4" />,
  offer: <Sparkles className="h-4 w-4" />,
  rejected: <AlertCircle className="h-4 w-4" />,
  info: <Bell className="h-4 w-4" />,
};

function timeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default async function NotificationsPage() {
  const { userId } = auth();
  const items = userId ? await listNotifications(userId) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">{items.length} total</p>
        </div>
        {items.length > 0 && <MarkReadButton />}
      </div>
      <Section title="Recent">
        {items.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="You're all caught up"
            body="We'll notify you about application updates, interview invites, and tips."
          />
        ) : (
          <div className="space-y-2">
            {items.map((n) => {
              const body = (
                <div className={cn(
                  "flex items-start gap-3 rounded-lg border px-4 py-3",
                  n.read ? "border-slate-100" : "border-brand-200 bg-brand-50/40",
                )}>
                  <div className="mt-0.5 rounded-md bg-slate-100 p-2 text-slate-600">
                    {iconFor[n.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">{n.title}</p>
                    {n.body && <p className="text-xs text-slate-600">{n.body}</p>}
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">{timeAgo(n.createdAt)}</span>
                </div>
              );
              return n.link ? (
                <Link key={n.id} href={n.link} className="block">
                  {body}
                </Link>
              ) : (
                <div key={n.id}>{body}</div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}
