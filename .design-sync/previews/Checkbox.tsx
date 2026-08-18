import { Checkbox, Label } from "business-management-app";

export function Default() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="remember-me" />
      <Label htmlFor="remember-me">Remember me</Label>
    </div>
  );
}

export function Checked() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="auto-invoice" defaultChecked />
      <Label htmlFor="auto-invoice">Auto-send invoices</Label>
    </div>
  );
}

export function TaskList() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="task-1" defaultChecked />
        <Label htmlFor="task-1">Client contract signed</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="task-2" defaultChecked />
        <Label htmlFor="task-2">Deposit invoice sent</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="task-3" />
        <Label htmlFor="task-3">Final walkthrough scheduled</Label>
      </div>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked">Archived (locked)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">Verified (locked)</Label>
      </div>
    </div>
  );
}
