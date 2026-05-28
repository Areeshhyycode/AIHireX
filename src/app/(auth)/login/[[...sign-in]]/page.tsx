import { SignIn } from "@clerk/nextjs";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "rounded-2xl border border-slate-200 shadow-sm",
            headerTitle: "text-2xl font-bold text-slate-900",
            headerSubtitle: "text-sm text-slate-600",
            formButtonPrimary: "bg-brand-600 hover:bg-brand-700",
            footerActionLink: "text-brand-600 hover:text-brand-700",
          },
        }}
        signUpUrl="/register"
        afterSignInUrl="/onboarding/role"
      />
    </div>
  );
}
