import { Separator } from "business-management-app";

export function Default() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">Business Management</p>
      <p className="text-sm text-muted-foreground">Client invoicing workspace</p>
      <Separator className="my-3" />
      <p className="text-sm text-muted-foreground">3 invoices this month</p>
    </div>
  );
}

export function Vertical() {
  return (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>Invoices</span>
      <Separator orientation="vertical" />
      <span>Clients</span>
      <Separator orientation="vertical" />
      <span>Settings</span>
    </div>
  );
}
