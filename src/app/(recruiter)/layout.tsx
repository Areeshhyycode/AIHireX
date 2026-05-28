import { headers } from "next/headers";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { recruiterNav } from "@/lib/recruiter-nav";
import { requireRole } from "@/lib/auth-guard";

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("recruiter");
  const pathname = headers().get("x-pathname") ?? "/recruiter";
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={recruiterNav} activeHref={pathname} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar fallbackRole="Recruiter" />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
