import {
  NotAvailableNotice,
  PageHeader,
  PageShell,
} from "@/widgets/day-calendar";

export function FinanceScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Finance"
        subtitle="Review payouts, expenses, and financial summaries for your business."
      />

      <NotAvailableNotice>
        Finance isn&apos;t available yet — this needs backend support that
        doesn&apos;t exist yet.
      </NotAvailableNotice>
    </PageShell>
  );
}
