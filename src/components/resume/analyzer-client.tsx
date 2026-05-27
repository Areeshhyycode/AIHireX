"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ScoreRing } from "@/components/resume/score-ring";
import { ScoreBreakdown } from "@/components/resume/score-breakdown";
import { IssueItem, type Issue } from "@/components/resume/issue-item";
import { Section } from "@/components/dashboard/section";
import { Button } from "@/components/ui/button";

type Result = {
  atsScore: number;
  subScores: { keywords: number; formatting: number; impact: number; grammar: number; length: number };
  summary: string;
  issues: Issue[];
  missingSkills?: string[];
};

export function AnalyzerClient() {
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function analyze() {
    if (text.trim().length < 40) {
      setError("Paste at least 40 characters of resume text.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetRole: role || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "AI failed");
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
        <label className="text-sm font-medium text-slate-700">Target role (optional)</label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Senior Frontend Engineer"
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
        />
        <label className="mt-4 block text-sm font-medium text-slate-700">Paste resume text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Paste your resume here. PDF upload coming soon."
          className="mt-1.5 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-500"
        />
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        <div className="mt-3 flex justify-end">
          <Button onClick={analyze} disabled={loading}>
            <Sparkles className="mr-1.5 h-4 w-4" />
            {loading ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <ScoreRing score={result.atsScore} />
            <div className="mt-6">
              <ScoreBreakdown
                items={[
                  { label: "Keywords", value: result.subScores.keywords },
                  { label: "Formatting", value: result.subScores.formatting },
                  { label: "Impact statements", value: result.subScores.impact },
                  { label: "Grammar", value: result.subScores.grammar },
                  { label: "Length", value: result.subScores.length },
                ]}
              />
            </div>
            {result.missingSkills && result.missingSkills.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Missing skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingSkills.map((s) => (
                    <span key={s} className="rounded-md bg-amber-50 px-2 py-0.5 text-xs text-amber-800">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Section title="Issues & suggestions" subtitle={result.summary}>
            <div className="space-y-2">
              {result.issues.map((i, idx) => (
                <IssueItem key={idx} issue={i} />
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}
