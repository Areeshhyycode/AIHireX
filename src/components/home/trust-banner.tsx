import { ShieldCheck, BadgeCheck, Bot, Flag } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Verified recruiters only" },
  { icon: Bot, label: "AI scam detection on every job" },
  { icon: BadgeCheck, label: "Blue-tick trusted companies" },
  { icon: Flag, label: "Community fraud reporting" },
];

export function TrustBanner() {
  return (
    <section className="border-y bg-white">
      <div className="container-page py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-slate-700">
            <Icon className="h-5 w-5 text-brand-600 shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
