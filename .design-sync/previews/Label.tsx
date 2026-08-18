import { Input, Label } from "business-management-app";

export function Default() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="client-name">Client name</Label>
      <Input id="client-name" placeholder="Acme Co." />
    </div>
  );
}

export function WithEmail() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="client-email">Email</Label>
      <Input id="client-email" type="email" placeholder="billing@acme.co" />
    </div>
  );
}

export function DisabledField() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="client-locked">Account ID</Label>
      <Input id="client-locked" disabled defaultValue="ACC-10492" />
    </div>
  );
}
