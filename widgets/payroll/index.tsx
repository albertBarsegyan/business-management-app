import {
  NotAvailableNotice,
  PageHeader,
  PageShell,
} from "@/widgets/day-calendar";

export function PayrollScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Payroll"
        subtitle="Manage staff pay, commissions, and payout schedules."
      />

      <NotAvailableNotice>
        Payroll isn&apos;t available yet — this needs backend support that
        doesn&apos;t exist yet.
      </NotAvailableNotice>
    </PageShell>
  );
}
