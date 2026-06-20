"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScamPanel, type ScamResult } from "@/components/recruiter/scam-panel";

export function PostJobForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scam, setScam] = useState<ScamResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState("");

  async function runScamCheck() {
    const form = formRef.current;
    if (!form) return null;
    const f = new FormData(form);
    const title = String(f.get("title") || "");
    const description = String(f.get("desc") || desc);
    if (title.length < 2 || description.length < 30) {
      setError("Fill title and at least 30-char description before scam check.");
      return null;
    }
    setError(null);
    setScanning(true);
    const res = await fetch("/api/ai/jobs/scam-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    setScanning(false);
    if (!res.ok) return null;
    const data: ScamResult = await res.json();
    setScam(data);
    return data;
  }

  async function draftWithAi() {
    const form = formRef.current;
    if (!form) return;
    const f = new FormData(form);
    const title = String(f.get("title") || "");
    const company = String(f.get("company") || "");
    if (title.length < 2) {
      setError("Add a job title first, then draft with AI.");
      return;
    }
    setError(null);
    setDrafting(true);
    try {
      const res = await fetch("/api/ai/jobs/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company, brief: desc.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "AI failed");
      const parts: string[] = [];
      if (data.description) parts.push(data.description);
      if (Array.isArray(data.responsibilities) && data.responsibilities.length) {
        parts.push("Responsibilities:");
        parts.push(...data.responsibilities.map((s: string) => `• ${s}`));
      }
      if (Array.isArray(data.requirements) && data.requirements.length) {
        parts.push("\nRequirements:");
        parts.push(...data.requirements.map((s: string) => `• ${s}`));
      }
      if (Array.isArray(data.perks) && data.perks.length) {
        parts.push("\nPerks:");
        parts.push(...data.perks.map((s: string) => `• ${s}`));
      }
      setDesc(parts.join("\n"));
      if (Array.isArray(data.tags) && data.tags.length) {
        setSkills(data.tags.join(", "));
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDrafting(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const check = scam ?? (await runScamCheck());
    if (check && check.risk === "high") {
      setError("AI flagged this job as high risk. Fix the flags below before publishing.");
      return;
    }
    setSubmitting(true);
    const form = e.currentTarget;
    const f = new FormData(form);
    const min = f.get("salary-min");
    const max = f.get("salary-max");
    const salary = min && max ? `$${min}–$${max}` : min || max ? String(min || max) : "";
    const body = {
      title: String(f.get("title") || ""),
      company: String(f.get("company") || ""),
      location: String(f.get("loc") || ""),
      type: String(f.get("type") || "Full-time"),
      workplace: String(f.get("ws") || "Remote"),
      salary,
      description: desc,
      tags: skills.split(",").map((s) => s.trim()).filter(Boolean),
      authenticityScore: check?.authenticityScore ?? 90,
      scamFlags: check?.flags ?? [],
    };
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(
        data?.error === "forbidden"
          ? "Only recruiters can post jobs. Switch your role first."
          : data?.error === "unverified"
            ? "Your company is not verified yet. Verify it first to publish jobs."
            : "Failed to publish. Check the fields.",
      );
      return;
    }
    router.push("/recruiter/jobs");
    router.refresh();
  }

  return (
    <form ref={formRef} className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="title" label="Job title" placeholder="Senior Frontend Engineer" required />
        <Input id="company" label="Company" placeholder="Acme Inc." required />
        <Input id="loc" label="Location" placeholder="Remote · Karachi" required />
        <Select id="type" label="Employment type" options={["Full-time","Contract","Internship","Part-time"]} />
        <Select id="ws" label="Workplace" options={["Remote","Hybrid","Onsite"]} />
        <Input id="salary-min" label="Salary min" type="number" placeholder="120000" />
        <Input id="salary-max" label="Salary max" type="number" placeholder="160000" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="desc" className="text-sm font-medium text-slate-700">Job description</label>
          <button
            type="button"
            onClick={draftWithAi}
            disabled={drafting}
            className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100 disabled:opacity-60"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {drafting ? "Drafting..." : "Draft with AI"}
          </button>
        </div>
        <textarea
          id="desc" name="desc" rows={12} required minLength={30}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Describe the role, responsibilities, and what you're looking for. Or add a 1-line brief and click 'Draft with AI'."
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="skills" className="text-sm font-medium text-slate-700">Required skills (comma separated)</label>
        <input
          id="skills" name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, TypeScript, Next.js"
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <ScamPanel scam={scam} scanning={scanning} />
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={runScamCheck} className="rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
          {scanning ? "Checking..." : "Run scam check"}
        </button>
        <Button size="lg" type="submit">{submitting ? "Publishing..." : "Publish job"}</Button>
      </div>
    </form>
  );
}

function Select({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      <select id={id} name={id} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
