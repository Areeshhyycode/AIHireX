import type { Issue } from "@/components/resume/issue-item";

export const mockIssues: Issue[] = [
  { severity: "error", title: "Missing keywords", detail: "Add: TypeScript, Next.js, GraphQL — found in 78% of similar JDs.", fixable: true },
  { severity: "warn", title: "Weak action verbs", detail: "Replace 'worked on' with 'shipped', 'led', 'architected'.", fixable: true },
  { severity: "warn", title: "Quantify impact", detail: "3 bullets describe work but no metrics. Add %, $, or counts.", fixable: true },
  { severity: "warn", title: "Long summary", detail: "Summary is 124 words. Aim for 50–80 for ATS readability.", fixable: true },
  { severity: "ok", title: "Contact info complete", detail: "Email, phone, LinkedIn, portfolio all present.", fixable: false },
  { severity: "ok", title: "Single-column layout", detail: "Parses cleanly in all major ATS systems.", fixable: false },
];

export const mockSubScores = [
  { label: "Keywords", value: 68 },
  { label: "Formatting", value: 92 },
  { label: "Impact statements", value: 71 },
  { label: "Grammar", value: 96 },
  { label: "Length", value: 82 },
];
