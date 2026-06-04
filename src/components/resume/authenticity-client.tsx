"use client";

import { useState } from "react";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PdfPicker } from "@/components/resume/pdf-picker";
import { ScoreRing } from "@/components/resume/score-ring";

type Result = {
  authenticityScore: number;
  aiLikelihood: "low" | "medium" | "high";
  verdict: string;
  flags: string[];
  reasoning: string;
};

const tones: Record<Result["aiLikelihood"], string> = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

export function AuthenticityClient() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function check() {
    if (text.trim().length < 40) {
      setError("Paste at least 40 characters.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/resume/authenticity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setResult(data as Result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Resume to check</label>
          <PdfPicker onParsed={(d) => setText(d.text)} disabled={loading} />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Upload PDF or paste resume..."
          className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-500"
        />
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        <div className="mt-3 flex justify-end">
          <Button onClick={check} disabled={loading}>
            <ShieldCheck className="mr-1.5 h-4 w-4" />
            {loading ? "Checking..." : "Check authenticity"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <ScoreRing score={result.authenticityScore} label="Authenticity" />
            <div className="mt-4 text-center">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${tones[result.aiLikelihood]}`}>
                AI likelihood: {result.aiLikelihood}
              </span>
              <p className="mt-3 text-sm font-medium text-slate-900 capitalize">
                {result.verdict}
              </p>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Reasoning</h3>
              <p className="mt-1 text-sm text-slate-700">{result.reasoning}</p>
            </div>
            {result.flags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Flags</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                  {result.flags.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
