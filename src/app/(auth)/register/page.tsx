import { AuthCard } from "@/components/auth/auth-card";
import { RoleToggle } from "@/components/auth/role-toggle";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Divider } from "@/components/auth/divider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SP = { role?: string };

export default function RegisterPage({ searchParams }: { searchParams: SP }) {
  const role = searchParams?.role === "recruiter" ? "recruiter" : "candidate";
  const isRecruiter = role === "recruiter";
  return (
    <AuthCard
      title={isRecruiter ? "Hire smarter with AI" : "Create your account"}
      subtitle={isRecruiter ? "Set up your company in minutes" : "Land your dream role faster"}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerHref={`/login?role=${role}`}
    >
      <RoleToggle active={role} basePath="/register" />
      <SocialButtons />
      <Divider />
      <form className="space-y-4">
        <Input id="name" label={isRecruiter ? "Your name" : "Full name"} placeholder="Areesha Ahmed" autoComplete="name" required />
        {isRecruiter && (
          <Input id="company" label="Company name" placeholder="Acme Inc." required />
        )}
        <Input id="email" label={isRecruiter ? "Work email" : "Email"} type="email" placeholder={isRecruiter ? "you@company.com" : "you@example.com"} autoComplete="email" required />
        <Input id="password" label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" required />
        <p className="text-xs text-slate-500">
          By signing up you agree to our Terms and Privacy Policy.
        </p>
        <Button type="submit" fullWidth size="lg">
          {isRecruiter ? "Create company account" : "Create account"}
        </Button>
      </form>
    </AuthCard>
  );
}
