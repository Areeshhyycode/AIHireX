const prompts = [
  "Rewrite my summary in a punchier tone",
  "Top 5 React interview questions for senior roles",
  "Salary range for a Next.js dev in Karachi",
  "Help me prep for behavioral interviews",
  "Skills I should learn in the next 3 months",
];

export function SuggestedPrompts() {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Try asking
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
