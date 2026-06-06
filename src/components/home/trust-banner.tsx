import { ShieldCheck, BadgeCheck, Bot, Flag } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Verified recruiters only" },
  { icon: Bot, label: "AI scam detection on every job" },
  { icon: BadgeCheck, label: "Blue-tick trusted companies" },
  { icon: Flag, label: "Community fraud reporting" },
];

export function TrustBanner() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-page grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 text-sm font-medium text-slate-700"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 ring-1 ring-brand-100">
              <Icon className="h-4 w-4" />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
