import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import { Logo } from "@/components/ui/logo";
import { ClerkSkeleton } from "@/components/auth/clerk-skeleton";

type SP = { role?: string };

export default function RegisterPage({ searchParams }: { searchParams: SP }) {
  const role = searchParams?.role === "recruiter" ? "recruiter" : "candidate";
  return (
    <div className="w-full max-w-md">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <Suspense fallback={<ClerkSkeleton />}>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "rounded-2xl border border-slate-200 shadow-sm",
              headerTitle: "text-2xl font-bold text-slate-900",
              headerSubtitle: "text-sm text-slate-600",
              formButtonPrimary: "bg-brand-600 hover:bg-brand-700",
              footerActionLink: "text-brand-600 hover:text-brand-700",
              socialButtonsBlockButton: "transition-transform active:scale-[0.98]",
            },
          }}
          signInUrl="/login"
          afterSignUpUrl={`/onboarding/role?intent=${role}`}
          unsafeMetadata={{ intendedRole: role }}
        />
      </Suspense>
    </div>
  );
}
