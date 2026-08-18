import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "business-management-app";

export function Default() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-md border p-4">
        <p className="text-sm text-muted-foreground">
          Active clients: 42. Open projects: 7. Revenue this month: $18,240.
        </p>
      </TabsContent>
      <TabsContent value="invoices" className="rounded-md border p-4">
        <p className="text-sm text-muted-foreground">
          3 invoices are overdue, totaling $4,120 across 2 clients.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="rounded-md border p-4">
        <p className="text-sm text-muted-foreground">
          Manage billing details, team access, and notification preferences.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export function LineVariant() {
  return (
    <Tabs defaultValue="invoices" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4 text-sm text-muted-foreground">
        Snapshot of account activity across all active clients.
      </TabsContent>
      <TabsContent value="invoices" className="p-4 text-sm text-muted-foreground">
        INV-1042 · Acme Co. · $2,400 · Due Sep 1
      </TabsContent>
      <TabsContent value="settings" className="p-4 text-sm text-muted-foreground">
        Workspace preferences and integrations.
      </TabsContent>
    </Tabs>
  );
}
