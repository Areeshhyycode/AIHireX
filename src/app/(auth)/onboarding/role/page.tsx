import { RoleChoice } from "@/components/auth/role-choice";

type SP = { intent?: string };

export default function RoleOnboardingPage({ searchParams }: { searchParams: SP }) {
  const initial = searchParams?.intent === "recruiter" ? "recruiter" : "candidate";
  return (
    <div className="w-full max-w-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to AIHireX
        </h1>
        <p className="mt-2 text-slate-600">
          Pick how you&apos;ll use AIHireX. You can switch later.
        </p>
      </div>
      <RoleChoice initial={initial} />
    </div>
  );
}
