import Link from "next/link";
import { cn } from "@/lib/utils";

export type SidebarLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
};

export function SidebarItem({
  item,
  active = false,
}: {
  item: SidebarLink;
  active?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all",
        active
          ? "bg-gradient-to-r from-brand-50 to-violet-50 text-brand-700 shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-brand-500 to-violet-500" />
      )}
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "h-5 w-5 transition-colors",
            active ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600",
          )}
        >
          {item.icon}
        </span>
        {item.label}
      </span>
      {item.badge && (
        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
