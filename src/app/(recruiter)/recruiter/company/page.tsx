import { redirect } from "next/navigation";

// Company management is handled by the Verification flow.
export default function CompanyRedirect() {
  redirect("/recruiter/verification");
}
