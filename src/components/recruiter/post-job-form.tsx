"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PostJobForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const f = new FormData(e.currentTarget);
    const min = f.get("salary-min");
    const max = f.get("salary-max");
    const salary = min && max ? `$${min}–$${max}` : (min || max ? String(min || max) : "");
    const body = {
      title: String(f.get("title") || ""),
      company: String(f.get("company") || ""),
      location: String(f.get("loc") || ""),
      type: String(f.get("type") || "Full-time"),
      workplace: String(f.get("ws") || "Remote"),
      salary,
      description: String(f.get("desc") || ""),
      tags: String(f.get("skills") || "").split(",").map((s) => s.trim()).filter(Boolean),
    };
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error === "forbidden" ? "Only recruiters can post jobs. Switch your role first." : "Failed to publish. Check the fields.");
      return;
    }
    router.push("/recruiter/jobs");
    router.refresh();
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="title" label="Job title" placeholder="Senior Frontend Engineer" required />
        <Input id="company" label="Company" placeholder="Acme Inc." required />
        <Input id="loc" label="Location" placeholder="Remote · Karachi · Bangalore" required />
        <Select id="type" label="Employment type" options={["Full-time","Contract","Internship","Part-time"]} />
        <Select id="ws" label="Workplace" options={["Remote","Hybrid","Onsite"]} />
        <Input id="salary-min" label="Salary min" type="number" placeholder="120000" />
        <Input id="salary-max" label="Salary max" type="number" placeholder="160000" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="desc" className="text-sm font-medium text-slate-700">Job description</label>
          <button type="button" className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100">
            <Sparkles className="h-3.5 w-3.5" />
            Draft with AI
          </button>
        </div>
        <textarea
          id="desc" name="desc" rows={10} required minLength={30}
          placeholder="Describe the role, responsibilities, and what you're looking for..."
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <Input id="skills" label="Required skills (comma separated)" placeholder="React, TypeScript, Next.js" />
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button">Save draft</Button>
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
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
  );
}
