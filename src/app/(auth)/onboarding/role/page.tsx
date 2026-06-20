import { redirect } from "next/navigation";
import { OnboardingFlow } from "@/components/auth/onboarding-flow";
import { getRole } from "@/lib/auth";

type SP = { intent?: string; force?: string; step?: string };

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

  return <OnboardingFlow initialRole={initial} existing={existing} />;
}
