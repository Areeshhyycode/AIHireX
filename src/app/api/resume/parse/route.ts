import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { extractPdfText } from "@/lib/uploads/pdf-text";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file too large (max 5MB)" }, { status: 413 });
  }
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    return NextResponse.json({ error: "only PDF supported for now" }, { status: 415 });
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const { text, pages } = await extractPdfText(buf);
    if (text.length < 40) {
      return NextResponse.json(
        { error: "couldn't extract text — is this a scanned PDF?" },
        { status: 422 },
      );
    }
    return NextResponse.json({ text, pages, chars: text.length });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message ?? "parse failed" },
      { status: 500 },
    );
  }
}
