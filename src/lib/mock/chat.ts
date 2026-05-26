import type { Msg } from "@/components/chat/chat-message";

export const mockChat: Msg[] = [
  {
    role: "assistant",
    text: "Hey Areesha 👋 I&apos;m your AIHireX career coach. Ask me anything about jobs, resumes, interviews, or salary.",
    time: "Just now",
  },
  {
    role: "user",
    text: "What skills should I add to my resume for senior frontend roles?",
    time: "2 min ago",
  },
  {
    role: "assistant",
    text: "Looking at 2,400+ senior frontend JDs from the last 30 days, the top missing skills on your resume are:\n\n1. Next.js App Router + server components (in 78% of JDs)\n2. TypeScript strict mode + zod (62%)\n3. Performance: Core Web Vitals, bundle analysis (55%)\n4. Testing: Playwright or Vitest (49%)\n5. State management at scale (Zustand / TanStack Query) (44%)\n\nWant me to draft 2 resume bullets that show these in action?",
    time: "Just now",
  },
];
