import type { Application } from "@/components/candidate/application-row";
import type { Recommendation } from "@/components/candidate/job-recommendation";

export const mockApplications: Application[] = [
  { company: "Stripe", role: "Frontend Engineer", location: "Remote", appliedOn: "2d ago", status: "Interview", matchScore: 92 },
  { company: "Razorpay", role: "Senior React Developer", location: "Bangalore", appliedOn: "5d ago", status: "Reviewing", matchScore: 88 },
  { company: "Notion", role: "Full-stack Engineer", location: "Remote", appliedOn: "1w ago", status: "Applied", matchScore: 81 },
  { company: "Linear", role: "UI Engineer", location: "Remote", appliedOn: "2w ago", status: "Offer", matchScore: 95 },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "1", title: "Next.js Engineer", company: "Vercel", location: "Remote",
    salary: "$120k–$160k", tags: ["Next.js", "React", "TypeScript"],
    verified: true, matchScore: 94,
  },
  {
    id: "2", title: "Product Engineer", company: "Supabase", location: "Remote",
    salary: "$110k–$150k", tags: ["Postgres", "TypeScript", "React"],
    verified: true, matchScore: 89,
  },
  {
    id: "3", title: "Senior Frontend Engineer", company: "Linear", location: "Remote",
    salary: "$140k–$180k", tags: ["React", "Design Systems"],
    verified: true, matchScore: 87,
  },
];
