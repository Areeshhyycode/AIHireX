import { headers } from "next/headers";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { candidateNav } from "@/lib/candidate-nav";

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname") ?? "/candidate";
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={candidateNav} activeHref={pathname} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
