import Groq from "groq-sdk";
import { ChatGroq } from "@langchain/groq";
import { env } from "@/lib/env";

export const GROQ_MODELS = {
  fast: "llama-3.1-8b-instant",
  smart: "llama-3.3-70b-versatile",
} as const;

let sdk: Groq | null = null;
let fast: ChatGroq | null = null;
let smart: ChatGroq | null = null;

export function getGroq() {
  if (!sdk) sdk = new Groq({ apiKey: env.GROQ_API_KEY });
  return sdk;
}

export function fastLLM() {
  if (!fast) fast = new ChatGroq({ apiKey: env.GROQ_API_KEY, model: GROQ_MODELS.fast, temperature: 0.3 });
  return fast;
}

export function smartLLM() {
  if (!smart) smart = new ChatGroq({ apiKey: env.GROQ_API_KEY, model: GROQ_MODELS.smart, temperature: 0.4 });
  return smart;
}
