import pdfParse from "pdf-parse";

export type ParsedPdf = { text: string; pages: number };

export async function extractPdfText(buf: Buffer): Promise<ParsedPdf> {
  const result = await pdfParse(buf);
  return {
    text: (result.text ?? "").replace(/ /g, " ").trim(),
    pages: result.numpages ?? 0,
  };
}
