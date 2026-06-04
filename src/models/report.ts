import { Schema, model, models, type InferSchemaType } from "mongoose";

const reportSchema = new Schema(
  {
    reporterClerkId: { type: String, required: true, index: true },
    targetType: {
      type: String,
      enum: ["job", "user", "application"],
      required: true,
    },
    targetId: { type: Schema.Types.ObjectId, required: true, index: true },
    reason: {
      type: String,
      enum: ["scam", "fake", "inappropriate", "spam", "other"],
      required: true,
    },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ["open", "resolved", "dismissed"],
      default: "open",
      index: true,
    },
  },
  { timestamps: true },
);

export type ReportDoc = InferSchemaType<typeof reportSchema> & { _id: string };
export const ReportModel = models.Report || model("Report", reportSchema);
