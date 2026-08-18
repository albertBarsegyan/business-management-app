import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "business-management-app";

export function InvoiceStatus() {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="invoice-status">Status</Label>
      <Select defaultOpen defaultValue="pending">
        <SelectTrigger id="invoice-status" className="w-48">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function PaymentTerms() {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="payment-terms">Payment terms</Label>
      <Select defaultOpen defaultValue="net30">
        <SelectTrigger id="payment-terms" size="sm" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="net15">Net 15</SelectItem>
          <SelectItem value="net30">Net 30</SelectItem>
          <SelectItem value="net45">Net 45</SelectItem>
          <SelectItem value="due-on-receipt">Due on receipt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function AssignedTeamMember() {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="assignee">Assigned to</Label>
      <Select defaultOpen defaultValue="priya">
        <SelectTrigger id="assignee" className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="priya">Priya Shah</SelectItem>
          <SelectItem value="marcus">Marcus Webb</SelectItem>
          <SelectItem value="dana">Dana Ferris</SelectItem>
          <SelectItem value="unassigned">Unassigned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
