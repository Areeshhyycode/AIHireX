import { Resend } from "resend";
import { env } from "@/lib/env";

let client: Resend | null = null;
function get() {
  if (!env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(env.RESEND_API_KEY);
  return client;
}

const FROM = "AIHireX <onboarding@resend.dev>";

export async function sendApplicationEmail(args: {
  to: string;
  name: string;
  jobTitle: string;
  company: string;
}) {
  const r = get();
  if (!r) return { skipped: true };
  return r.emails.send({
    from: FROM,
    to: args.to,
    subject: `Application received: ${args.jobTitle} @ ${args.company}`,
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="color:#2563eb">Application received 🎉</h2>
      <p>Hi ${args.name},</p>
      <p>Your application for <b>${args.jobTitle}</b> at <b>${args.company}</b> is in.</p>
      <p>AIHireX will share status updates here as the recruiter reviews your profile.</p>
      <p style="color:#64748b;font-size:13px;margin-top:24px">— AIHireX</p>
    </div>`,
  });
}

export async function sendInterviewEmail(args: {
  to: string;
  name: string;
  jobTitle: string;
  company: string;
  when?: string;
}) {
  const r = get();
  if (!r) return { skipped: true };
  return r.emails.send({
    from: FROM,
    to: args.to,
    subject: `Interview invite: ${args.jobTitle} @ ${args.company}`,
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="color:#16a34a">You're moving forward 🎯</h2>
      <p>Hi ${args.name},</p>
      <p>${args.company} has invited you to interview for <b>${args.jobTitle}</b>.</p>
      ${args.when ? `<p>Proposed time: <b>${args.when}</b></p>` : ""}
      <p>Prep with the AI Mock Interview tool in your dashboard.</p>
    </div>`,
  });
}
