"use client";

import { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PdfPicker } from "@/components/resume/pdf-picker";

type Result = { enhanced: string; changes: string[]; headline?: string };

export function EnhancerClient() {
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function enhance() {
    if (text.trim().length < 40) {
      setError("Paste at least 40 characters.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/resume/enhance", {
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

  function copyEnhanced() {
    if (!result) return;
    navigator.clipboard.writeText(result.enhanced);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
        <div className="mt-4 flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">Resume</label>
          <PdfPicker onParsed={(d) => setText(d.text)} disabled={loading} />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Upload PDF or paste resume..."
          className="mt-1.5 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-500"
        />
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        <div className="mt-3 flex justify-end">
          <Button onClick={enhance} disabled={loading}>
            <Sparkles className="mr-1.5 h-4 w-4" />
            {loading ? "Enhancing..." : "Enhance with AI"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Enhanced resume</h3>
                {result.headline && (
                  <p className="text-xs text-slate-500">{result.headline}</p>
                )}
              </div>
              <button
                onClick={copyEnhanced}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="max-h-[600px] overflow-y-auto whitespace-pre-wrap p-4 text-sm text-slate-700">
              {result.enhanced}
            </pre>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-base font-semibold text-slate-900">What changed</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {result.changes.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {c}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}
