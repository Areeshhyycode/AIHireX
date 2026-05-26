import type { Experience } from "@/components/profile/experience-item";

export const mockSkills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
  "GraphQL", "PostgreSQL", "MongoDB", "AWS", "Vercel",
  "Playwright", "Figma",
];

export const mockExperience: Experience[] = [
  {
    company: "Stripe",
    role: "Senior Frontend Engineer",
    duration: "Jan 2023 – Present · 1y 4m",
    bullets: [
      "Led rebuild of the merchant dashboard — cut TTI by 38%.",
      "Shipped a new design system used across 14 products.",
      "Mentored 3 mid-level engineers; led the React hiring loop.",
    ],
  },
  {
    company: "Razorpay",
    role: "Frontend Engineer",
    duration: "Aug 2020 – Dec 2022 · 2y 5m",
    bullets: [
      "Owned the checkout flow used by 8M+ merchants.",
      "Reduced bundle size by 220 KB; LCP from 3.4s to 1.8s.",
    ],
  },
];

export const mockEducation = [
  { school: "NUST", degree: "BS Computer Science", duration: "2016 – 2020" },
];
