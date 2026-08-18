import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "business-management-app";

const invoices = [
  { id: "INV-1042", client: "Alden & Rowe", amount: "$4,200.00", status: "Paid" as const },
  { id: "INV-1043", client: "Northgate Supply", amount: "$1,150.00", status: "Pending" as const },
  { id: "INV-1044", client: "Ferris Manufacturing", amount: "$980.00", status: "Overdue" as const },
];

const statusVariant = {
  Paid: "default",
  Pending: "secondary",
  Overdue: "destructive",
} as const;

export function Invoices() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[invoice.status]}>{invoice.status}</Badge>
            </TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
