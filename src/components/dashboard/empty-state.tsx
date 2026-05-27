import Link from "next/link";
import { type LucideIcon } from "lucide-react";

type Props = {
  icon?: LucideIcon;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EmptyState({ icon: Icon, title, body, ctaLabel, ctaHref }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 py-10 text-center">
      {Icon && (
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1 max-w-md text-sm text-slate-500">{body}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
