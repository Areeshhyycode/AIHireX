"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Role = "candidate" | "recruiter";

const tabs: { id: Role; label: string }[] = [
  { id: "candidate", label: "Candidate" },
  { id: "recruiter", label: "Recruiter" },
];

export function RoleToggle({
  active,
  basePath,
}: {
  active: Role;
  basePath: string;
}) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
      {tabs.map((t) => (
        <Link
          key={t.id}
          href={`${basePath}?role=${t.id}`}
          className={cn(
            "rounded-md py-2 text-center text-sm font-medium transition",
            active === t.id
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900",
          )}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
