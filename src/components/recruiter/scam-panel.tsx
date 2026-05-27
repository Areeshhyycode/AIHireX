export type ScamResult = {
  authenticityScore: number;
  risk: "low" | "medium" | "high";
  flags: string[];
  reasoning: string;
};

export function ScamPanel({
  scam,
  scanning,
}: {
  scam: ScamResult | null;
  scanning: boolean;
}) {
  if (scanning) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        Running AI scam check...
      </div>
    );
  }
  if (!scam) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
        <p className="font-semibold text-amber-900">AI scam check runs before publishing</p>
        <p className="text-xs text-amber-700">
          Unrealistic pay, payment requests or WhatsApp-only contacts will be flagged.
        </p>
      </div>
    );
  }
  const cls =
    scam.risk === "high"
      ? "border-rose-200 bg-rose-50"
      : scam.risk === "medium"
        ? "border-amber-200 bg-amber-50"
        : "border-emerald-200 bg-emerald-50";
  return (
    <div className={`rounded-lg border p-3 text-sm ${cls}`}>
      <p className="font-semibold text-slate-900">
        Authenticity {scam.authenticityScore}% · Risk: {scam.risk}
      </p>
      <p className="mt-1 text-xs text-slate-700">{scam.reasoning}</p>
      {scam.flags.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-xs text-slate-700">
          {scam.flags.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
