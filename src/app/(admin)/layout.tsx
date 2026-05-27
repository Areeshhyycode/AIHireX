import { headers } from "next/headers";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { adminNav } from "@/lib/admin-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname") ?? "/admin";
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={adminNav} activeHref={pathname} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar fallbackName="Admin" fallbackRole="Admin" />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
