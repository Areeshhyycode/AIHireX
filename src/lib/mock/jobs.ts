import type { Job } from "@/components/jobs/job-card";

export const mockJobs: Job[] = [
  {
    id: "1", title: "Senior Frontend Engineer", company: "Vercel", location: "Remote",
    type: "Full-time", salary: "$140k–$180k", postedAgo: "2d ago",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    verified: true, matchScore: 94, authenticityScore: 98,
  },
  {
    id: "2", title: "Full-stack Engineer", company: "Supabase", location: "Remote",
    type: "Full-time", salary: "$120k–$160k", postedAgo: "1d ago",
    tags: ["Postgres", "TypeScript", "React", "Realtime"],
    verified: true, matchScore: 89, authenticityScore: 97,
  },
  {
    id: "3", title: "Product Designer", company: "Linear", location: "Remote",
    type: "Full-time", salary: "$130k–$170k", postedAgo: "3d ago",
    tags: ["Figma", "Design Systems", "Motion"],
    verified: true, matchScore: 76, authenticityScore: 99,
  },
  {
    id: "4", title: "DevRel Engineer", company: "Resend", location: "Remote",
    type: "Full-time", salary: "$110k–$150k", postedAgo: "5d ago",
    tags: ["Node.js", "Technical writing", "Public speaking"],
    verified: true, matchScore: 71, authenticityScore: 96,
  },
  {
    id: "5", title: "Mobile Engineer", company: "Cash App", location: "Bangalore",
    type: "Full-time", salary: "₹35–55 LPA", postedAgo: "1w ago",
    tags: ["React Native", "Swift", "Kotlin"],
    verified: true, matchScore: 68, authenticityScore: 94,
  },
  {
    id: "6", title: "Backend Engineer (Go)", company: "Cloudflare", location: "Remote",
    type: "Full-time", salary: "$130k–$170k", postedAgo: "4d ago",
    tags: ["Go", "Distributed systems", "gRPC"],
    verified: true, matchScore: 62, authenticityScore: 99,
  },
];

export const mockJobDetail = {
  ...mockJobs[0],
  about: "Vercel is building the platform for frontend developers. We're a team of engineers, designers, and builders shipping the future of the web.",
  responsibilities: [
    "Own complex UI features in Next.js and React",
    "Collaborate with design to ship polished, performant interfaces",
    "Drive technical decisions around state, caching, and rendering",
    "Mentor mid-level engineers and review pull requests",
  ],
  requirements: [
    "5+ years building production React applications",
    "Strong TypeScript skills, comfortable with strict mode",
    "Experience with Next.js App Router and server components",
    "Eye for design and obsession with details",
  ],
  perks: ["Fully remote", "Unlimited PTO", "$2,000 home office stipend", "Annual offsite"],
};
