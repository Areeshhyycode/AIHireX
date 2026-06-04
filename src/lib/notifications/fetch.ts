import { connectDB } from "@/lib/db";
import { NotificationModel } from "@/models/notification";

export type NotificationItem = {
  id: string;
  type: "application" | "interview" | "offer" | "rejected" | "info";
  title: string;
  body?: string;
  link?: string;
  read: boolean;
  createdAt: string;
};

export async function listNotifications(userId: string) {
  try {
    await connectDB();
    const docs = await NotificationModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return docs.map((d) => {
      const r = d as Record<string, unknown>;
      return {
        id: String(r._id),
        type: (r.type ?? "info") as NotificationItem["type"],
        title: String(r.title ?? ""),
        body: r.body as string | undefined,
        link: r.link as string | undefined,
        read: Boolean(r.read),
        createdAt: new Date((r.createdAt as Date) ?? Date.now()).toISOString(),
      };
    });
  } catch {
    return [] as NotificationItem[];
  }
}

export async function countUnreadNotifications(userId: string) {
  try {
    await connectDB();
    return NotificationModel.countDocuments({ userId, read: false });
  } catch {
    return 0;
  }
}

export async function createNotification(args: {
  userId: string;
  type?: NotificationItem["type"];
  title: string;
  body?: string;
  link?: string;
}) {
  try {
    await connectDB();
    return NotificationModel.create({
      userId: args.userId,
      type: args.type ?? "info",
      title: args.title,
      body: args.body,
      link: args.link,
    });
  } catch (e) {
    console.warn("[notification] create failed:", (e as Error).message);
    return null;
  }
}
