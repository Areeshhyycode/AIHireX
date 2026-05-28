import { Schema, model, models, type InferSchemaType } from "mongoose";

const applicationSchema = new Schema(
  {
    candidateClerkId: { type: String, required: true, index: true },
    candidateName: { type: String },
    candidateEmail: { type: String },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    recruiterId: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ["applied", "reviewing", "interview", "offer", "rejected", "withdrawn"],
      default: "applied",
      index: true,
    },
    matchScore: { type: Number },
    resumeUrl: { type: String },
    resumeText: { type: String },
    coverNote: { type: String },
  },
  { timestamps: true },
);

applicationSchema.index({ candidateClerkId: 1, jobId: 1 }, { unique: true });

export type ApplicationDoc = InferSchemaType<typeof applicationSchema> & { _id: string };
export const ApplicationModel =
  models.Application || model("Application", applicationSchema);
