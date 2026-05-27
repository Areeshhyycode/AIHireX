import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const jobSchema = new Schema(
  {
    recruiterId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Contract", "Part-time", "Internship"], default: "Full-time" },
    workplace: { type: String, enum: ["Remote", "Hybrid", "Onsite"], default: "Remote" },
    salary: { type: String, default: "" },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    perks: [{ type: String }],
    tags: { type: [String], default: [], index: true },
    status: { type: String, enum: ["draft", "published", "closed"], default: "published", index: true },
    verified: { type: Boolean, default: true },
    authenticityScore: { type: Number, default: 90 },
    scamFlags: [{ type: String }],
    views: { type: Number, default: 0 },
    applicationsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

jobSchema.index({ title: "text", description: "text", tags: "text" });

export type Job = InferSchemaType<typeof jobSchema> & { _id: string };

export const JobModel: Model<Job> =
  (models.Job as Model<Job>) || model<Job>("Job", jobSchema);
