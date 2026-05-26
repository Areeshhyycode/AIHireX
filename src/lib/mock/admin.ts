import type { PendingCompany } from "@/components/admin/verification-card";

export const mockPendingCompanies: PendingCompany[] = [
  { id: "p1", name: "Acme Innovations", domain: "acme-innovations.com", email: "hr@acme-innovations.com", linkedin: "linkedin.com/company/acme-innovations", reg: "ABC-12345", submittedAgo: "2h ago", aiScore: 92 },
  { id: "p2", name: "Nimbus Labs", domain: "nimbuslabs.io", email: "talent@nimbuslabs.io", linkedin: "linkedin.com/company/nimbus", reg: "NIM-9981", submittedAgo: "6h ago", aiScore: 88 },
  { id: "p3", name: "QuickHire Solutions", domain: "quickhire.biz", email: "info@quickhire.biz", linkedin: "—", reg: "—", submittedAgo: "1d ago", aiScore: 38 },
  { id: "p4", name: "Stellar Tech", domain: "stellartech.dev", email: "people@stellartech.dev", linkedin: "linkedin.com/company/stellar-tech", reg: "STL-7711", submittedAgo: "2d ago", aiScore: 81 },
];

export type Report = {
  id: string;
  type: "Fake job" | "Scam interview" | "Spam" | "Payment demand";
  target: string;
  reporter: string;
  time: string;
  status: "Open" | "Resolved";
};

export const mockReports: Report[] = [
  { id: "r1", type: "Fake job", target: "QuickHire — Marketing Manager", reporter: "areeshazv@gmail.com", time: "1h ago", status: "Open" },
  { id: "r2", type: "Payment demand", target: "EarnFast Co.", reporter: "anon", time: "3h ago", status: "Open" },
  { id: "r3", type: "Scam interview", target: "WhatsApp-only recruiter", reporter: "user@example.com", time: "Yesterday", status: "Open" },
  { id: "r4", type: "Spam", target: "Mass-posted listings", reporter: "auto-detect", time: "2d ago", status: "Resolved" },
  { id: "r5", type: "Fake job", target: "GhostTech — DevOps", reporter: "user@example.com", time: "3d ago", status: "Resolved" },
];
