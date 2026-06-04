import { Schema, model, models, type InferSchemaType } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["application", "interview", "offer", "rejected", "info"],
      default: "info",
    },
    title: { type: String, required: true },
    body: { type: String },
    link: { type: String },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type NotificationDoc = InferSchemaType<typeof notificationSchema> & {
  _id: string;
};
export const NotificationModel =
  models.Notification || model("Notification", notificationSchema);
