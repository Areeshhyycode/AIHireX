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
        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-brand-50 text-brand-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
      )}
    >
      <span className="flex items-center gap-3">
        <span className={cn("h-5 w-5", active ? "text-brand-600" : "text-slate-400")}>
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
