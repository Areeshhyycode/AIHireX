import { ScoreRing } from "@/components/resume/score-ring";
import { ScoreBreakdown } from "@/components/resume/score-breakdown";
import { IssueItem } from "@/components/resume/issue-item";
import { Section } from "@/components/dashboard/section";
import { mockIssues, mockSubScores } from "@/lib/mock/resume";
import { Button } from "@/components/ui/button";

export default function ResumeAnalyzerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Resume analyzer</h1>
        <p className="mt-1 text-sm text-slate-500">
          areesha_resume_v3.pdf · uploaded 2 minutes ago
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <ScoreRing score={84} />
          <div className="mt-6">
            <ScoreBreakdown items={mockSubScores} />
          </div>
          <Button fullWidth className="mt-6">
            Re-analyze
          </Button>
        </div>
        <Section
          title="Issues & suggestions"
          subtitle={`${mockIssues.filter((i) => i.severity !== "ok").length} fixes recommended`}
        >
          <div className="space-y-2">
            {mockIssues.map((i) => (
              <IssueItem key={i.title} issue={i} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
