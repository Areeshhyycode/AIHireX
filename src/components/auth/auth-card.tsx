import Link from "next/link";
import { Logo } from "@/components/ui/logo";

type Props = {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  children: React.ReactNode;
};

export function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerHref,
  children,
}: Props) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        {children}
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        {footerText}{" "}
        <Link
          href={footerHref}
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}
