import { z } from "zod";

const schema = z.object({
  // Core
  MONGODB_URI: z.string().min(1),
  // LLM
  GROQ_API_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().optional(),
  HUGGINGFACE_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  // Vector + cache
  PINECONE_API_KEY: z.string().optional(),
  PINECONE_INDEX: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  // Storage
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  // Email + voice
  RESEND_API_KEY: z.string().optional(),
  ELEVENLABS_API_KEY: z.string().optional(),
  // Clerk
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid env:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables — check .env.local");
}

export const env = parsed.data;
