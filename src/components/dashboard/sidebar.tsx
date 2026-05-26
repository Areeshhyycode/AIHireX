import { Logo } from "@/components/ui/logo";
import { SidebarItem, type SidebarLink } from "@/components/dashboard/sidebar-item";
import { LogOut } from "lucide-react";

export function Sidebar({
  items,
  activeHref,
}: {
  items: SidebarLink[];
  activeHref: string;
}) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            active={activeHref === item.href}
          />
        ))}
      </nav>
      <div className="border-t border-slate-200 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
          <LogOut className="h-5 w-5 text-slate-400" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
