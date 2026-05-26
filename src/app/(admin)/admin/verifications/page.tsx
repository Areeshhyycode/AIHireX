import { VerificationCard } from "@/components/admin/verification-card";
import { mockPendingCompanies } from "@/lib/mock/admin";

export default function AdminVerificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company verifications</h1>
        <p className="mt-1 text-sm text-slate-500">
          {mockPendingCompanies.length} pending · AI score helps prioritize review
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {mockPendingCompanies.map((c) => (
          <VerificationCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}
