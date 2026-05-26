import { Button } from "@/components/ui/button";
import { User, Building2 } from "lucide-react";

const roles = [
  {
    icon: User,
    title: "For Candidates",
    points: ["Free resume analyzer", "AI mock interviews", "One-click apply", "Smart job matches"],
    cta: { label: "Create candidate account", href: "/register?role=candidate" },
  },
  {
    icon: Building2,
    title: "For Recruiters",
    points: ["Verified company badge", "AI candidate shortlisting", "Auto scam check", "Hiring analytics"],
    cta: { label: "Start hiring", href: "/register?role=recruiter" },
  },
];

export function RoleCards() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-page grid gap-6 md:grid-cols-2">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="rounded-2xl bg-white p-8 ring-1 ring-slate-200">
              <Icon className="h-8 w-8 text-brand-600" />
              <h3 className="mt-4 text-2xl font-bold">{r.title}</h3>
              <ul className="mt-4 space-y-2 text-slate-700">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-brand-600">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <Button href={r.cta.href} className="mt-6">
                {r.cta.label}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
