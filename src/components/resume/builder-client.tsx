"use client";

import { useState } from "react";
import { Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type Section = { heading: string; items: string[] };
type Result = { headline: string; summary: string; sections: Section[] };

type Form = {
  name: string;
  contact: string;
  targetRole: string;
  experience: string;
  education: string;
  projects: string;
  skills: string;
};

const empty: Form = {
  name: "",
  contact: "",
  targetRole: "",
  experience: "",
  education: "",
  projects: "",
  skills: "",
};

export function BuilderClient() {
  const [f, setF] = useState<Form>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function build() {
    if (!f.name || !f.contact || !f.experience || !f.skills) {
      setError("Name, contact, experience, and skills are required.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/resume/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
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

  function printResume() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 print:hidden">
        <Field label="Full name" value={f.name} onChange={(v) => set("name", v)} placeholder="Areesha Ahmed" />
        <Field label="Contact (email · phone · location)" value={f.contact} onChange={(v) => set("contact", v)} placeholder="areesha@example.com · +92 ... · Karachi" />
        <Field label="Target role" value={f.targetRole} onChange={(v) => set("targetRole", v)} placeholder="Senior Frontend Engineer" />
        <Area label="Experience" rows={5} value={f.experience} onChange={(v) => set("experience", v)} placeholder="Role @ Company (dates) — what you did, what shipped, who you led..." />
        <Area label="Education" rows={2} value={f.education} onChange={(v) => set("education", v)} placeholder="BSc Computer Science, NUST (2022)" />
        <Area label="Projects (optional)" rows={3} value={f.projects} onChange={(v) => set("projects", v)} placeholder="Project name — stack, what you built, impact" />
        <Area label="Skills (comma separated)" rows={2} value={f.skills} onChange={(v) => set("skills", v)} placeholder="React, TypeScript, Node, GraphQL..." />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button onClick={build} disabled={loading}>
            <Sparkles className="mr-1.5 h-4 w-4" />
            {loading ? "Generating..." : "Generate with AI"}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 print:border-0 print:p-0">
        {!result ? (
          <div className="flex h-full min-h-[400px] items-center justify-center text-center text-sm text-slate-500">
            Fill the form and click <b>&nbsp;Generate&nbsp;</b> to preview your resume.
          </div>
        ) : (
          <div className="space-y-5 text-sm text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 print:border-b">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{f.name || "Your Name"}</h2>
                <p className="text-xs text-slate-600">{result.headline}</p>
                <p className="mt-1 text-xs text-slate-500">{f.contact}</p>
              </div>
              <button
                onClick={printResume}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 print:hidden"
              >
                <Download className="h-3.5 w-3.5" /> Print / Save PDF
              </button>
            </div>
            <p className="leading-relaxed">{result.summary}</p>
            {result.sections.map((s, i) => (
              <section key={i}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
                  {s.heading}
                </h3>
                <ul className="ml-4 list-disc space-y-1 leading-relaxed">
                  {s.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-brand-500"
      />
    </div>
  );
}

function Area({ label, rows, value, onChange, placeholder }: { label: string; rows: number; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-500"
      />
    </div>
  );
}
