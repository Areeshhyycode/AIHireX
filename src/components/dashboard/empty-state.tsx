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
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-gradient-to-b from-white to-slate-50 px-6 py-12 text-center">
      {Icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 ring-1 ring-brand-100">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1.5 max-w-md text-sm text-slate-500">{body}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 hover:shadow-md"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
