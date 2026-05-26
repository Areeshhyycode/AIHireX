import { cn } from "@/lib/utils";

export type Template = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  isPro?: boolean;
};

export function TemplateCard({
  template,
  selected = false,
}: {
  template: Template;
  selected?: boolean;
}) {
  return (
    <button
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border bg-white text-left",
        selected
          ? "border-brand-500 ring-2 ring-brand-200"
          : "border-slate-200 hover:border-brand-300",
      )}
    >
      <div className={cn("h-32 w-full", template.accent)} />
      <div className="space-y-3 p-3">
        <div className="space-y-1">
          <div className="h-1.5 w-3/4 rounded bg-slate-200" />
          <div className="h-1.5 w-1/2 rounded bg-slate-100" />
        </div>
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-slate-100" />
          <div className="h-1 w-5/6 rounded bg-slate-100" />
          <div className="h-1 w-4/6 rounded bg-slate-100" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {template.name}
          </p>
          <p className="text-xs text-slate-500">{template.tagline}</p>
        </div>
        {template.isPro && (
          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            PRO
          </span>
        )}
      </div>
    </button>
  );
}
