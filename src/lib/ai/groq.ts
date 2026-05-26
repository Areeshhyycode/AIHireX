import Groq from "groq-sdk";
import { env } from "@/lib/env";

let client: Groq | null = null;

export function getGroq(): Groq {
  if (!client) {
    client = new Groq({ apiKey: env.GROQ_API_KEY });
  }
  return client;
}

export const GROQ_MODELS = {
  fast: "llama-3.1-8b-instant",
  smart: "llama-3.3-70b-versatile",
} as const;
