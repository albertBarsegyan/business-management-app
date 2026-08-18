import { Textarea } from "business-management-app";

export function Default() {
  return <Textarea placeholder="Add notes about this client..." />;
}

export function WithValue() {
  return (
    <Textarea defaultValue="Prefers invoices sent to billing@acme.co. Net-30 terms." />
  );
}

export function Disabled() {
  return (
    <Textarea disabled defaultValue="Locked while account is under review." />
  );
}
