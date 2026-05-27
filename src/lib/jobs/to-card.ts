import type { Job as CardJob } from "@/components/jobs/job-card";
import type { JobListItem } from "@/lib/jobs/fetch";

function timeAgo(date: Date | string) {
  const t = typeof date === "string" ? new Date(date) : date;
  const sec = Math.max(1, Math.floor((Date.now() - t.getTime()) / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
}

export function toCardJob(j: JobListItem): CardJob {
  return {
    id: j.id,
    title: j.title,
    company: j.company,
    location: j.location,
    type: j.type,
    salary: j.salary || "Not disclosed",
    postedAgo: timeAgo((j as unknown as { createdAt: string }).createdAt),
    tags: j.tags ?? [],
    verified: j.verified ?? true,
    matchScore: 80,
    authenticityScore: j.authenticityScore ?? 90,
  };
}
