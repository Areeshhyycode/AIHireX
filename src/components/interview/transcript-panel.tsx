import { cn } from "@/lib/utils";

const turns = [
  { who: "ai", text: "Tell me about a time you shipped a feature with tight constraints." },
  { who: "me", text: "Sure — last quarter I led a 2-week rebuild of our checkout flow..." },
  { who: "ai", text: "What metrics did you move? Be specific." },
  { who: "me", text: "Conversion went from 41% to 53% in the first week, and..." },
  { who: "ai", text: "Nice — how did you decide which surface to attack first?" },
];

export function TranscriptPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Live transcript</h3>
        <span className="inline-flex items-center gap-1 text-xs text-rose-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
          Recording
        </span>
      </div>
      <div className="space-y-3">
        {turns.map((t, i) => (
          <div key={i} className={cn("max-w-[85%] rounded-xl px-3 py-2 text-sm", t.who === "ai" ? "bg-slate-100 text-slate-800" : "ml-auto bg-brand-600 text-white")}>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
