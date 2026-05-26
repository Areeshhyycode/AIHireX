import { AlertCircle, CheckCircle2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Severity = "ok" | "warn" | "error";

const iconFor: Record<Severity, React.ReactNode> = {
  ok: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  warn: <AlertCircle className="h-5 w-5 text-amber-500" />,
  error: <AlertCircle className="h-5 w-5 text-rose-500" />,
};

export type Issue = {
  severity: Severity;
  title: string;
  detail: string;
  fixable: boolean;
};

export function IssueItem({ issue }: { issue: Issue }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
      <div className="pt-0.5">{iconFor[issue.severity]}</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{issue.title}</p>
        <p className="text-xs text-slate-500">{issue.detail}</p>
      </div>
      {issue.fixable && (
        <button
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold",
            "bg-brand-50 text-brand-700 hover:bg-brand-100",
          )}
        >
          <Wand2 className="h-3.5 w-3.5" />
          Fix
        </button>
      )}
    </div>
  );
}
