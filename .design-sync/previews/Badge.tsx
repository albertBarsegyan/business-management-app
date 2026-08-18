import { Badge } from "business-management-app";

export function Default() {
  return <Badge>Paid</Badge>;
}

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Paid</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Overdue</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="ghost">Archived</Badge>
    </div>
  );
}

export function InvoiceStatuses() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Paid</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Overdue</Badge>
    </div>
  );
}
