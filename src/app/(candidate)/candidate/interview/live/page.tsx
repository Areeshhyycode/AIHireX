import { InterviewClient } from "@/components/interview/interview-client";

type SP = { role?: string };

export default function InterviewLivePage({ searchParams }: { searchParams: SP }) {
  const role = searchParams?.role || "Senior Frontend Engineer";
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Live mock interview</h1>
        <p className="mt-1 text-sm text-slate-500">
          {role} · Adaptive AI interviewer (Groq LLaMA 3.1)
        </p>
      </div>
      <InterviewClient role={role} />
    </div>
  );
}
