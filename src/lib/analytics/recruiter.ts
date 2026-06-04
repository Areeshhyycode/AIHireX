import { connectDB } from "@/lib/db";
import { JobModel } from "@/models/job";
import { ApplicationModel } from "@/models/application";

export type RecruiterStats = {
  jobsPublished: number;
  applications: number;
  interviews: number;
  offers: number;
  byDay: { label: string; value: number }[];
  funnel: { stage: string; value: number }[];
};

const stages = ["applied", "reviewing", "interview", "offer", "rejected"] as const;

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function last7Days() {
  const out: { label: string; key: string }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    out.push({
      label: d.toLocaleDateString("en", { weekday: "short" }),
      key: dayKey(d),
    });
  }
  return out;
}

export async function getRecruiterStats(recruiterId: string): Promise<RecruiterStats> {
  try {
    await connectDB();
    const [jobs, perStage, recent] = await Promise.all([
      JobModel.countDocuments({ recruiterId, status: "published" }),
      Promise.all(
        stages.map((s) =>
          ApplicationModel.countDocuments({ recruiterId, status: s }),
        ),
      ),
      ApplicationModel.find({
        recruiterId,
        createdAt: { $gte: new Date(Date.now() - 7 * 86400000) },
      })
        .select("createdAt")
        .lean(),
    ]);

    const byKey: Record<string, number> = {};
    for (const r of recent) {
      const ts = (r as unknown as { createdAt: Date }).createdAt;
      const k = dayKey(new Date(ts));
      byKey[k] = (byKey[k] ?? 0) + 1;
    }
    const days = last7Days();
    return {
      jobsPublished: jobs,
      applications: perStage.reduce((a, b) => a + b, 0),
      interviews: perStage[2] ?? 0,
      offers: perStage[3] ?? 0,
      byDay: days.map((d) => ({ label: d.label, value: byKey[d.key] ?? 0 })),
      funnel: stages.map((s, i) => ({ stage: s, value: perStage[i] ?? 0 })),
    };
  } catch {
    return {
      jobsPublished: 0,
      applications: 0,
      interviews: 0,
      offers: 0,
      byDay: last7Days().map((d) => ({ label: d.label, value: 0 })),
      funnel: stages.map((s) => ({ stage: s, value: 0 })),
    };
  }
}
