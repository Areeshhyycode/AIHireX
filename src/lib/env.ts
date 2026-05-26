import { z } from "zod";

const schema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  NEXTAUTH_SECRET: z.string().min(16, "NEXTAUTH_SECRET too short"),
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),
});

const parsed = schema.safeParse({
  MONGODB_URI: process.env.MONGODB_URI,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables — check .env.local");
}

export const env = parsed.data;
