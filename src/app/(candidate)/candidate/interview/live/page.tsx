import { InterviewStage } from "@/components/interview/interview-stage";
import { TranscriptPanel } from "@/components/interview/transcript-panel";

export default function InterviewLivePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Live mock interview</h1>
          <p className="mt-1 text-sm text-slate-500">
            Senior Frontend Engineer · Technical · 30 min
          </p>
        </div>
        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          12:34 elapsed
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <InterviewStage />
        <TranscriptPanel />
      </div>
    </div>
  );
}
