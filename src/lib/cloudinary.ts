import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env";

let configured = false;

function ensureConfigured() {
  if (configured) return;
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary env not set");
  }
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

export async function uploadBuffer(
  buf: Buffer,
  opts: { folder: string; publicId?: string; resourceType?: "raw" | "image" | "auto" },
) {
  ensureConfigured();
  return new Promise<{ secure_url: string; public_id: string; bytes: number; format: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: opts.folder,
        public_id: opts.publicId,
        resource_type: opts.resourceType ?? "auto",
        overwrite: true,
      },
      (err, result) => {
        if (err || !result) return reject(err ?? new Error("upload failed"));
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
          format: result.format,
        });
      },
    );
    stream.end(buf);
  });
}
