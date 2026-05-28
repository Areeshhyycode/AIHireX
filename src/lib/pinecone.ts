import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "@/lib/env";

let client: Pinecone | null = null;

export function pc() {
  if (!env.PINECONE_API_KEY) throw new Error("PINECONE_API_KEY not set");
  if (!client) client = new Pinecone({ apiKey: env.PINECONE_API_KEY });
  return client;
}

export function jobsIndex() {
  if (!env.PINECONE_INDEX) throw new Error("PINECONE_INDEX not set");
  return pc().index(env.PINECONE_INDEX);
}

export async function upsertJobVector(args: {
  id: string;
  vector: number[];
  metadata: { title: string; company: string; location?: string; tags?: string[] };
}) {
  await jobsIndex().upsert({
    records: [{ id: args.id, values: args.vector, metadata: args.metadata }],
  } as never);
}

export async function queryJobs(vector: number[], topK = 10) {
  const r = await jobsIndex().query({ vector, topK, includeMetadata: true });
  return r.matches?.map((m) => ({
    id: m.id,
    score: m.score ?? 0,
    metadata: m.metadata as Record<string, unknown>,
  })) ?? [];
}
