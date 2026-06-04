import { Schema, model, models, type InferSchemaType } from "mongoose";

const resumeSchema = new Schema(
  {
    url: { type: String },
    text: { type: String },
    pages: { type: Number },
    atsScore: { type: Number },
    summary: { type: String },
    missingSkills: { type: [String], default: [] },
    analyzedAt: { type: Date },
  },
  { _id: false },
);

const settingsSchema = new Schema(
  {
    emailNotifications: { type: Boolean, default: true },
    weeklyDigest: { type: Boolean, default: true },
    publicProfile: { type: Boolean, default: false },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, trim: true },
    email: { type: String, lowercase: true, index: true },
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
      index: true,
    },
    avatarUrl: { type: String },
    headline: { type: String, trim: true },
    bio: { type: String, trim: true },
    location: { type: String, trim: true },
    website: { type: String, trim: true },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    skills: { type: [String], default: [] },
    resume: { type: resumeSchema, default: undefined },
    savedJobs: { type: [Schema.Types.ObjectId], ref: "Job", default: [] },
    settings: { type: settingsSchema, default: () => ({}) },
    companyId: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: string };
export const UserModel = models.User || model("User", userSchema);
