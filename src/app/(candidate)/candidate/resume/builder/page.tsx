import { BuilderStepper } from "@/components/resume/builder-stepper";
import { BuilderForm } from "@/components/resume/builder-form";
import { TemplateCard } from "@/components/resume/template-card";
import { mockTemplates } from "@/lib/mock/templates";

export default function ResumeBuilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Resume builder</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in your details, pick a template, export a polished PDF.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <BuilderStepper active={0} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <BuilderForm />
        </div>
        <aside className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Pick a template
          </h3>
          <div className="grid gap-3">
            {mockTemplates.slice(0, 3).map((t, i) => (
              <TemplateCard key={t.id} template={t} selected={i === 0} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
