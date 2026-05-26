import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const conn = await connectDB();
    const state = conn.connection.readyState;
    return NextResponse.json({
      ok: true,
      mongo: state === 1 ? "connected" : `state=${state}`,
      ts: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
