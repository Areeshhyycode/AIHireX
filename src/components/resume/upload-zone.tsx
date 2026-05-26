"use client";

import { Upload, FileText } from "lucide-react";

export function UploadZone() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center hover:border-brand-400 hover:bg-brand-50/30">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
        <Upload className="h-6 w-6 text-brand-600" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">
        Drop your resume here
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        PDF or DOCX · up to 5MB · we never share it
      </p>
      <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
        <FileText className="h-4 w-4" />
        Choose file
      </button>
    </div>
  );
}
