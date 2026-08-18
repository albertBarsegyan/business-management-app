import { Switch, Label } from "business-management-app";

export function Default() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Email notifications</Label>
    </div>
  );
}

export function Checked() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="auto-billing" defaultChecked />
      <Label htmlFor="auto-billing">Automatic billing</Label>
    </div>
  );
}

export function SettingsList() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-6">
        <Label htmlFor="two-factor">Two-factor authentication</Label>
        <Switch id="two-factor" defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-6">
        <Label htmlFor="marketing-emails">Marketing emails</Label>
        <Switch id="marketing-emails" />
      </div>
      <div className="flex items-center justify-between gap-6">
        <Label htmlFor="weekly-digest">Weekly digest</Label>
        <Switch id="weekly-digest" defaultChecked />
      </div>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch id="size-sm" size="sm" defaultChecked />
        <Label htmlFor="size-sm">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="size-default" size="default" defaultChecked />
        <Label htmlFor="size-default">Default</Label>
      </div>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off">Disabled off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on">Disabled on</Label>
      </div>
    </div>
  );
}
