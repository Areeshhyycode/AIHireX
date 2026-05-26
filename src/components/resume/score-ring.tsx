type Props = { score: number; label?: string };

export function ScoreRing({ score, label = "ATS score" }: Props) {
  const radius = 56;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 128 128" className="h-36 w-36 -rotate-90">
          <circle cx="64" cy="64" r={radius} stroke="#e2e8f0" strokeWidth="12" fill="none" />
          <circle
            cx="64" cy="64" r={radius}
            stroke="url(#g)" strokeWidth="12" fill="none"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-slate-900">{score}</div>
          <div className="text-xs text-slate-500">/ 100</div>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-slate-700">{label}</p>
    </div>
  );
}
