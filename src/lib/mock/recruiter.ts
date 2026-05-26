import type { JobPost } from "@/components/recruiter/job-post-row";

export const mockJobPosts: JobPost[] = [
  { id: "1", title: "Senior Frontend Engineer", location: "Remote", postedAgo: "2d ago", applicants: 124, shortlisted: 18, status: "Active" },
  { id: "2", title: "Backend Engineer (Go)", location: "Bangalore · Hybrid", postedAgo: "5d ago", applicants: 88, shortlisted: 11, status: "Active" },
  { id: "3", title: "Product Designer", location: "Remote", postedAgo: "1w ago", applicants: 62, shortlisted: 9, status: "Active" },
  { id: "4", title: "DevOps Engineer", location: "Karachi", postedAgo: "2w ago", applicants: 41, shortlisted: 6, status: "Paused" },
  { id: "5", title: "Marketing Manager", location: "Remote", postedAgo: "3w ago", applicants: 97, shortlisted: 4, status: "Closed" },
  { id: "6", title: "Talent Sourcer", location: "Karachi", postedAgo: "—", applicants: 0, shortlisted: 0, status: "Draft" },
];

export type Applicant = {
  id: string;
  name: string;
  avatarInitial: string;
  appliedFor: string;
  location: string;
  experience: string;
  matchScore: number;
  resumeScore: number;
  riskFlag?: "low" | "med" | "high";
  applied: string;
  stage: "Applied" | "Reviewed" | "Interview" | "Offer" | "Rejected";
};

export const mockApplicants: Applicant[] = [
  { id: "a1", name: "Areesha Ahmed", avatarInitial: "A", appliedFor: "Senior Frontend Engineer", location: "Karachi · Remote", experience: "6 years", matchScore: 94, resumeScore: 88, riskFlag: "low", applied: "2h ago", stage: "Reviewed" },
  { id: "a2", name: "Vikram Reddy", avatarInitial: "V", appliedFor: "Senior Frontend Engineer", location: "Bangalore · Hybrid", experience: "7 years", matchScore: 91, resumeScore: 84, riskFlag: "low", applied: "5h ago", stage: "Interview" },
  { id: "a3", name: "Sara Khan", avatarInitial: "S", appliedFor: "Product Designer", location: "Lahore · Remote", experience: "4 years", matchScore: 87, resumeScore: 90, riskFlag: "low", applied: "1d ago", stage: "Applied" },
  { id: "a4", name: "Aman Gupta", avatarInitial: "A", appliedFor: "Backend Engineer (Go)", location: "Pune · Remote", experience: "5 years", matchScore: 82, resumeScore: 76, riskFlag: "med", applied: "1d ago", stage: "Applied" },
  { id: "a5", name: "Lina Park", avatarInitial: "L", appliedFor: "Senior Frontend Engineer", location: "Seoul · Remote", experience: "8 years", matchScore: 79, resumeScore: 82, riskFlag: "low", applied: "2d ago", stage: "Reviewed" },
  { id: "a6", name: "Spam Account", avatarInitial: "?", appliedFor: "Backend Engineer (Go)", location: "Unknown", experience: "12 years", matchScore: 42, resumeScore: 31, riskFlag: "high", applied: "3d ago", stage: "Rejected" },
];
