const filterGroups = [
  { title: "Job type", options: ["Full-time", "Contract", "Internship", "Part-time"] },
  { title: "Workplace", options: ["Remote", "Hybrid", "Onsite"] },
  { title: "Experience", options: ["Entry", "Mid", "Senior", "Lead+"] },
  { title: "Salary", options: ["< $50k", "$50–100k", "$100–150k", "$150k+"] },
];

export function JobFilters() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
        <div className="mt-4 space-y-5">
          {filterGroups.map((g) => (
            <div key={g.title}>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                {g.title}
              </p>
              <div className="space-y-1.5">
                {g.options.map((o) => (
                  <label key={o} className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    {o}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
