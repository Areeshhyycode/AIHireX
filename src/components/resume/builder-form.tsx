import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function BuilderForm() {
  return (
    <form className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-slate-900">The basics</h3>
        <p className="text-xs text-slate-500">
          We&apos;ll prefill from your profile if it&apos;s set up.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="fullName" label="Full name" placeholder="Areesha Ahmed" />
        <Input id="headline" label="Headline" placeholder="Frontend Engineer · React + TS" />
        <Input id="email" label="Email" type="email" placeholder="you@example.com" />
        <Input id="phone" label="Phone" placeholder="+92 300 1234567" />
        <Input id="city" label="City" placeholder="Karachi" />
        <Input id="portfolio" label="Portfolio URL" placeholder="https://areesha.dev" />
      </div>
      <div>
        <label htmlFor="summary" className="text-sm font-medium text-slate-700">
          Professional summary
        </label>
        <div className="relative mt-1.5">
          <textarea
            id="summary" name="summary" rows={4}
            placeholder="A short pitch — 50 to 80 words works best for ATS."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="button"
            className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Write with AI
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Save draft</Button>
        <Button>Next: Experience →</Button>
      </div>
    </form>
  );
}
