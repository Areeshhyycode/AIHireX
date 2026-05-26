import { InterviewSetup } from "@/components/interview/interview-setup";
import { PastSessions } from "@/components/interview/past-sessions";

export default function InterviewHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI Mock Interview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Practice with an AI interviewer — get a score, transcript and tips.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <InterviewSetup />
        <PastSessions />
      </div>
    </div>
  );
}
