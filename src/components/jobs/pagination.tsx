import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  total,
  perPage,
  buildHref,
}: {
  page: number;
  total: number;
  perPage: number;
  buildHref: (p: number) => string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  return (
    <nav className="flex items-center justify-between gap-3 pt-2">
      <p className="text-xs text-slate-500">
        Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of{" "}
        {total}
      </p>
      <div className="flex items-center gap-1">
        <PageBtn href={page > 1 ? buildHref(page - 1) : null} icon>
          <ChevronLeft className="h-4 w-4" />
        </PageBtn>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="px-2 text-xs text-slate-400">
              …
            </span>
          ) : (
            <PageBtn key={p} href={buildHref(p)} active={p === page}>
              {p}
            </PageBtn>
          ),
        )}
        <PageBtn href={page < totalPages ? buildHref(page + 1) : null} icon>
          <ChevronRight className="h-4 w-4" />
        </PageBtn>
      </div>
    </nav>
  );
}

function PageBtn({
  href,
  active,
  icon,
  children,
}: {
  href: string | null;
  active?: boolean;
  icon?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md border px-2 text-xs font-medium transition";
  const cls = active
    ? `${base} border-brand-600 bg-brand-600 text-white`
    : `${base} border-slate-200 bg-white text-slate-700 hover:bg-slate-50`;
  if (!href) {
    return (
      <span className={`${cls} cursor-not-allowed opacity-50`}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={icon ? "navigate" : undefined}>
      {children}
    </Link>
  );
}
