import Link from "next/link";
import { Github, Twitter, Linkedin, Sparkles, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";

const cols = [
  {
    title: "For candidates",
    links: [
      { label: "Browse jobs", href: "/candidate/jobs" },
      { label: "Resume analyzer", href: "/candidate/resume/analyzer" },
      { label: "Resume builder", href: "/candidate/resume/builder" },
      { label: "Mock interview", href: "/candidate/interview" },
      { label: "Career chat", href: "/candidate/chat" },
    ],
  },
  {
    title: "For recruiters",
    links: [
      { label: "Post a job", href: "/recruiter/jobs/new" },
      { label: "Applicants", href: "/recruiter/applicants" },
      { label: "Analytics", href: "/recruiter/analytics" },
      { label: "Get verified", href: "/recruiter/verification" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { icon: Github, href: "https://github.com/Areeshhyycode/AIHireX", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="absolute -left-32 -top-20 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute -right-32 -top-20 h-64 w-64 rounded-full bg-violet-100/40 blur-3xl" />

      <div className="container-page relative grid gap-10 py-16 md:grid-cols-5">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            {siteConfig.description}
          </p>
          <div className="flex items-center gap-3 pt-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-600 hover:ring-brand-200"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <a
            href="mailto:hello@aihirex.com"
            className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <Mail className="h-4 w-4" />
            hello@aihirex.com
          </a>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900">
              {col.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-brand-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-slate-200">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-brand-500" />
            Built by Areesha · Made with AI
          </p>
        </div>
      </div>
    </footer>
  );
}
