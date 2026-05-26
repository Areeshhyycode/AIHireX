import { Building2 } from "lucide-react";

export type Experience = {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
};

export function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <div className="flex gap-4 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Building2 className="h-5 w-5 text-slate-500" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{exp.role}</p>
        <p className="text-sm text-slate-600">
          {exp.company} · {exp.duration}
        </p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
