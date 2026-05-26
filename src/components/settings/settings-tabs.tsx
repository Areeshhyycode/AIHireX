import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "account", label: "Account" },
  { id: "notifications", label: "Notifications" },
  { id: "privacy", label: "Privacy" },
  { id: "billing", label: "Billing" },
];

export function SettingsTabs({ active = "account" }: { active?: string }) {
  return (
    <nav className="flex gap-1 border-b border-slate-200">
      {tabs.map((t) => (
        <Link
          key={t.id}
          href={`/candidate/settings?tab=${t.id}`}
          className={cn(
            "border-b-2 px-3 py-2 text-sm font-medium transition",
            active === t.id
              ? "border-brand-600 text-brand-700"
              : "border-transparent text-slate-500 hover:text-slate-900",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
