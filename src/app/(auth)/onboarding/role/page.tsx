import { redirect } from "next/navigation";
import { RoleChoice } from "@/components/auth/role-choice";
import { getRole } from "@/lib/auth";

type SP = { intent?: string; force?: string };

const dashFor = {
  candidate: "/candidate",
  recruiter: "/recruiter",
  admin: "/admin",
} as const;

export default async function RoleOnboardingPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const existing = await getRole();
  // ?force=1 lets a signed-in user re-pick their role from any link.
  if (existing && searchParams?.force !== "1") {
    redirect(dashFor[existing]);
  }

  const initial =
    searchParams?.intent === "recruiter"
      ? "recruiter"
      : existing === "recruiter"
        ? "recruiter"
        : "candidate";

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {existing ? "Switch role" : "Welcome to AIHireX"}
        </h1>
        <p className="mt-2 text-slate-600">
          {existing
            ? `You're currently ${existing}. Pick a new role to switch.`
            : "Pick how you'll use AIHireX. You can switch later."}
        </p>
      </div>
      <RoleChoice initial={initial} />
    </div>
  );
}
