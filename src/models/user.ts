import { Schema, model, models, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
      index: true,
    },
    avatarUrl: { type: String },
    isVerified: { type: Boolean, default: false },
    companyId: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema> & { _id: string };
export const UserModel = models.User || model("User", userSchema);
