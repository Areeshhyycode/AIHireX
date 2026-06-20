import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { recruiterNav } from "@/lib/recruiter-nav";
import { requireRole } from "@/lib/auth-guard";
import { connectDB } from "@/lib/db";
import { CompanyModel } from "@/models/company";

// Routes that are accessible without a verified company
const ALLOW_UNVERIFIED = [
  "/recruiter/verification",
  "/recruiter/company",
  "/recruiter/settings",
  "/recruiter/notifications",
];

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("recruiter");
  const { userId } = auth();
  const pathname = headers().get("x-pathname") ?? "/recruiter";

  // Verification gate — recruiter must verify their company first
  if (userId && !ALLOW_UNVERIFIED.some((p) => pathname.startsWith(p))) {
    try {
      await connectDB();
      const company = await CompanyModel.findOne({
        recruiterClerkId: userId,
      }).lean<{ status?: string } | null>();
      if (!company || company.status !== "verified") {
        redirect("/recruiter/verification");
      }
    } catch {
      /* DB hiccup — fall through, page will show its own state */
    }
  }

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
