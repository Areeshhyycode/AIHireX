import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { Mail, Briefcase, ExternalLink } from "lucide-react";
import { Section } from "@/components/dashboard/section";
import { ApplicantStatusPicker } from "@/components/recruiter/applicant-status-picker";
import { connectDB } from "@/lib/db";
import { ApplicationModel } from "@/models/application";

export const dynamic = "force-dynamic";

export default async function ApplicantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  if (!userId) notFound();
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectDB();
  const doc = await ApplicationModel.findOne({
    _id: params.id,
    recruiterId: userId,
  }).lean<{
    _id: unknown;
    candidateName?: string;
    candidateEmail?: string;
    jobTitle: string;
    jobId: unknown;
    company: string;
    status: string;
    resumeUrl?: string;
    resumeText?: string;
    coverNote?: string;
    createdAt: Date;
  } | null>();
  if (!doc) notFound();

  const id = String(doc._id);
  const name = doc.candidateName ?? doc.candidateEmail ?? "Anonymous";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
              {doc.candidateEmail && (
                <a
                  href={`mailto:${doc.candidateEmail}`}
                  className="inline-flex items-center gap-1 hover:text-brand-600"
                >
                  <Mail className="h-4 w-4" />
                  {doc.candidateEmail}
                </a>
              )}
              <Link
                href={`/recruiter/jobs/${String(doc.jobId)}`}
                className="inline-flex items-center gap-1 hover:text-brand-600"
              >
                <Briefcase className="h-4 w-4" />
                {doc.jobTitle}
              </Link>
            </div>
          </div>
          <ApplicantStatusPicker id={id} initial={doc.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {doc.coverNote && (
            <Section title="Cover note">
              <p className="whitespace-pre-wrap text-sm text-slate-700">{doc.coverNote}</p>
            </Section>
          )}
          <Section
            title="Resume"
            subtitle={doc.resumeUrl ? "Click to open PDF" : "Text extracted from PDF"}
            href={doc.resumeUrl}
            hrefLabel="Open PDF"
          >
            {doc.resumeText ? (
              <pre className="max-h-[600px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs text-slate-700">
                {doc.resumeText}
              </pre>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-slate-500">
                Candidate hasn&apos;t uploaded a resume.
              </div>
            )}
          </Section>
        </div>
        <div className="space-y-6">
          <Section title="Applied at">
            <p className="text-sm text-slate-700">
              {new Date(doc.createdAt).toLocaleString()}
            </p>
          </Section>
          {doc.resumeUrl && (
            <a
              href={doc.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <ExternalLink className="h-4 w-4" />
              Download resume
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
