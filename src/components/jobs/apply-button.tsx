"use client";

import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { ApplyModal } from "@/components/jobs/apply-modal";

export function ApplyButton({
  jobId,
  jobTitle = "this role",
  company = "the company",
  applied: initialApplied,
}: {
  jobId: string;
  jobTitle?: string;
  company?: string;
  applied?: boolean;
}) {
  const [applied, setApplied] = useState(initialApplied ?? false);
  const [open, setOpen] = useState(false);

  if (applied) {
    return (
      <div className="inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-50 px-5 text-sm font-semibold text-emerald-700">
        <Check className="h-4 w-4" /> Applied
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        <Sparkles className="h-4 w-4" />
        Apply now
      </button>
      {open && (
        <ApplyModal
          jobId={jobId}
          jobTitle={jobTitle}
          company={company}
          onClose={() => {
            setOpen(false);
            // refresh state after potential apply
            fetch(`/api/applications?check=${jobId}`).catch(() => null);
            setApplied(true);
          }}
        />
      )}
    </>
  );
}
