import { Check, Loader2, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "done" | "in_progress" | "pending" | "failed";

const map: Record<Status, { icon: React.ReactNode; bg: string; text: string }> = {
  done: { icon: <Check className="h-4 w-4" />, bg: "bg-emerald-500 text-white", text: "Verified" },
  in_progress: { icon: <Loader2 className="h-4 w-4 animate-spin" />, bg: "bg-brand-500 text-white", text: "Checking..." },
  pending: { icon: <Clock className="h-4 w-4" />, bg: "bg-slate-200 text-slate-500", text: "Pending" },
  failed: { icon: <X className="h-4 w-4" />, bg: "bg-rose-500 text-white", text: "Action needed" },
};

type Props = {
  title: string;
  desc: string;
  status: Status;
};

export function VerifyStep({ title, desc, status }: Props) {
  const m = map[status];
  return (
    <div className="flex items-start gap-4 border-b border-slate-100 py-4 last:border-b-0">
      <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", m.bg)}>
        {m.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <span className="text-xs font-medium text-slate-600">{m.text}</span>
    </div>
  );
}
