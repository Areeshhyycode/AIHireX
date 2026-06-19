export function ClerkSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2 text-center">
        <div className="mx-auto h-7 w-48 rounded bg-slate-100" />
        <div className="mx-auto h-4 w-64 rounded bg-slate-100" />
      </div>
      <div className="h-11 w-full rounded-lg bg-slate-100" />
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-xs uppercase tracking-wide text-slate-300">or</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 rounded bg-slate-100" />
        <div className="h-11 w-full rounded-lg bg-slate-100" />
      </div>
      <div className="h-11 w-full rounded-lg bg-slate-100" />
    </div>
  );
}
