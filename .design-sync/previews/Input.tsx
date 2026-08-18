import { Input } from "business-management-app";

export function Default() {
  return <Input placeholder="Acme Co." />;
}

export function Email() {
  return <Input type="email" placeholder="billing@acme.co" />;
}

export function WithValue() {
  return <Input defaultValue="Northgate Supply" />;
}

export function Disabled() {
  return <Input disabled defaultValue="Ferris Manufacturing" />;
}

export function Invalid() {
  return (
    <Input aria-invalid="true" defaultValue="not-an-email" placeholder="billing@acme.co" />
  );
}
