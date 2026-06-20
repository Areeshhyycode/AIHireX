import { Schema, model, models, type InferSchemaType } from "mongoose";

const companySchema = new Schema(
  {
    recruiterClerkId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    domain: { type: String, lowercase: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    website: { type: String, trim: true },
    description: { type: String, trim: true },
    industry: { type: String, trim: true },
    size: { type: String, trim: true },
    address: { type: String, trim: true },
    contactName: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    registrationNumber: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected", "suspicious"],
      default: "pending",
      index: true,
    },
    rejectionReason: { type: String, trim: true },
    aiTrustScore: { type: Number },
    aiFlags: { type: [String], default: [] },
    reviewedAt: { type: Date },
  },
  { timestamps: true },
);

export type CompanyDoc = InferSchemaType<typeof companySchema> & { _id: string };
export const CompanyModel =
  models.Company || model("Company", companySchema);
