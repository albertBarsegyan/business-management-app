import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "business-management-app";

export function Form() {
  return (
    <Card className="w-full max-w-sm">
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
  );
}

export function Simple() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Recent invoices</CardTitle>
        <CardDescription>3 invoices this month</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Alden &amp; Rowe, Northgate Supply, Ferris Manufacturing.
        </p>
      </CardContent>
    </Card>
  );
}
