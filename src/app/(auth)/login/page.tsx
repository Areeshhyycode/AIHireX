import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { RoleToggle } from "@/components/auth/role-toggle";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Divider } from "@/components/auth/divider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SP = { role?: string };

export default function LoginPage({ searchParams }: { searchParams: SP }) {
  const role = searchParams?.role === "recruiter" ? "recruiter" : "candidate";
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue your AIHireX journey"
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerHref={`/register?role=${role}`}
    >
      <RoleToggle active={role} basePath="/login" />
      <SocialButtons />
      <Divider />
      <form className="space-y-4">
        <Input id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <div>
          <Input id="password" label="Password" type="password" placeholder="••••••••" autoComplete="current-password" required />
          <Link href="/forgot-password" className="mt-1.5 inline-block text-xs font-medium text-brand-600 hover:text-brand-700">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth size="lg">Sign in</Button>
      </form>
    </AuthCard>
  );
}
