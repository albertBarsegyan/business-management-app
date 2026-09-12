import {
  NotAvailableNotice,
  PageHeader,
  PageShell,
} from "@/widgets/day-calendar";

export function BillingScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Billing"
        subtitle="Manage your subscription, invoices, and payment method."
      />

      <NotAvailableNotice>
        Billing isn&apos;t available yet — this needs backend support that
        doesn&apos;t exist yet.
      </NotAvailableNotice>
    </PageShell>
  );
}
