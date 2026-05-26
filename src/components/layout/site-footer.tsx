import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Jobs", href: "/jobs" },
      { label: "AI Tools", href: "/tools" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container-page py-12 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-slate-600 max-w-xs">{siteConfig.description}</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-slate-900">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page py-4 border-t text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
