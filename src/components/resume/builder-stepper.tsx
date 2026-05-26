import { cn } from "@/lib/utils";

const steps = ["Basics", "Experience", "Education", "Skills", "Preview"];

export function BuilderStepper({ active = 0 }: { active?: number }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
              i < active
                ? "bg-brand-600 text-white"
                : i === active
                  ? "bg-brand-100 text-brand-700 ring-2 ring-brand-500"
                  : "bg-slate-100 text-slate-500",
            )}
          >
            {i + 1}
          </div>
          <span
            className={cn(
              "whitespace-nowrap text-sm",
              i === active
                ? "font-semibold text-slate-900"
                : "text-slate-500",
            )}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="hidden h-px w-8 bg-slate-200 sm:block" />
          )}
        </li>
      ))}
    </ol>
  );
}
