import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PostJobForm() {
  return (
    <form className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="title" label="Job title" placeholder="Senior Frontend Engineer" required />
        <Input id="loc" label="Location" placeholder="Remote · Karachi · Bangalore" required />
        <Select id="type" label="Employment type" options={["Full-time","Contract","Internship","Part-time"]} />
        <Select id="ws" label="Workplace" options={["Remote","Hybrid","Onsite"]} />
        <Input id="salary-min" label="Salary min (USD/yr)" type="number" placeholder="120000" />
        <Input id="salary-max" label="Salary max (USD/yr)" type="number" placeholder="160000" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="desc" className="text-sm font-medium text-slate-700">
            Job description
          </label>
          <button type="button" className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100">
            <Sparkles className="h-3.5 w-3.5" />
            Draft with AI
          </button>
        </div>
        <textarea
          id="desc" rows={10}
          placeholder="Describe the role, responsibilities, and what you're looking for..."
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <Input id="skills" label="Required skills (comma separated)" placeholder="React, TypeScript, Next.js" />
      <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
        <div>
          <p className="font-semibold text-amber-900">AI scam check will run before publishing</p>
          <p className="text-xs text-amber-700">
            We block listings with unrealistic salary, payment requests or external-app interviews.
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Save draft</Button>
        <Button size="lg">Publish job</Button>
      </div>
    </form>
  );
}

function Select({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      <select
        id={id} name={id}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      >
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
  );
}
