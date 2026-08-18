import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Business Management
          </h1>
          <p className="text-muted-foreground">
            Component kit preview — built on shadcn/ui, organized as a
            feature-sliced <code className="font-mono text-sm">shared/ui</code>{" "}
            layer.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New client</CardTitle>
            <CardDescription>Add a client to start invoicing.</CardDescription>
            <CardAction>
              <Badge variant="outline">Draft</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="client-name">Client name</Label>
              <Input id="client-name" placeholder="Acme Co." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client-email">Email</Label>
              <Input id="client-email" type="email" placeholder="billing@acme.co" />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save client</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent invoices</CardTitle>
          </CardHeader>
          <CardContent>
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
                      <Badge variant={statusVariant[invoice.status]}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
