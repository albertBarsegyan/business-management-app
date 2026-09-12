import {
  NotAvailableNotice,
  PageHeader,
  PageShell,
} from "@/widgets/day-calendar";

export function ReportsScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Reports"
        subtitle="Track revenue, appointments, and team performance over time."
      />

      <NotAvailableNotice>
        Reports aren&apos;t available yet — this needs backend support that
        doesn&apos;t exist yet.
      </NotAvailableNotice>
    </PageShell>
  );
}
