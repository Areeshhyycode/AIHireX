import { z } from "zod";

export const jobInput = z.object({
  title: z.string().min(3).max(120),
  company: z.string().min(2).max(120),
  location: z.string().min(2).max(120),
  type: z.enum(["Full-time", "Contract", "Part-time", "Internship"]).default("Full-time"),
  workplace: z.enum(["Remote", "Hybrid", "Onsite"]).default("Remote"),
  salary: z.string().max(60).default(""),
  description: z.string().min(30).max(8000),
  responsibilities: z.array(z.string().max(300)).max(20).default([]),
  requirements: z.array(z.string().max(300)).max(20).default([]),
  perks: z.array(z.string().max(120)).max(20).default([]),
  tags: z.array(z.string().max(40)).max(15).default([]),
});

export type JobInput = z.infer<typeof jobInput>;
