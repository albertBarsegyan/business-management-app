"use client";

import * as React from "react";
import { MoreHorizontal, Pencil } from "lucide-react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

const WIDTH_PRESETS = [
  { label: "375 · phone", value: 375 },
  { label: "768 · tablet", value: 768 },
  { label: "1280 · desktop", value: 1280 },
  { label: "Full width", value: null },
] as const;

function DemoFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [width, setWidth] = React.useState<number | null>(null);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {WIDTH_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              size="xs"
              variant={width === preset.value ? "default" : "outline"}
              onClick={() => setWidth(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      <div
        className="max-w-full resize-x overflow-auto rounded-xl border border-border bg-card"
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {children}
      </div>
    </section>
  );
}

function ActionsCell() {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="@max-md/table:size-11"
        aria-label="Edit"
      >
        <Pencil />
      </Button>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="@max-md/table:size-11"
        aria-label="More actions"
      >
        <MoreHorizontal />
      </Button>
    </div>
  );
}

const clientRows = [
  {
    name: "Anna Petrosyan",
    phone: "+374 91 234 567",
    email: "anna.petrosyan@example.com",
    visits: 24,
    lastVisit: "Aug 12, 2026",
    spend: "֏128,400",
    vip: true,
  },
  {
    name: "Séraphine Okonkwo-Vandenberghe",
    phone: "+374 55 019 284",
    email: "seraphine.okonkwo-vandenberghe.appointments@example.com",
    visits: 3,
    lastVisit: "Jul 2, 2026",
    spend: "֏123,456,789",
    vip: false,
  },
  {
    name: "Karen Sahakyan",
    phone: "+374 93 771 042",
    email: "karen.s@example.com",
    visits: 0,
    lastVisit: null,
    spend: "֏0",
    vip: false,
  },
  {
    name: "Mariam Ghukasyan",
    phone: "+374 77 460 918",
    email: "mariam.ghukasyan@example.com",
    visits: 41,
    lastVisit: "Aug 18, 2026",
    spend: "֏612,900",
    vip: true,
  },
  {
    name: "Tigran Avetisyan",
    phone: "+374 41 220 356",
    email: "t.avetisyan@example.com",
    visits: 12,
    lastVisit: "Jun 29, 2026",
    spend: "֏89,300",
    vip: false,
  },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const clientDetailRows = [
  {
    name: "Anahit Grigoryan",
    phone: "+374 77 214 508",
    email: "anahit.g@mail.am",
    sold: "96 000 ֏",
    balance: "0 ֏",
    visits: 14,
    discount: "10%",
    lastVisit: "02.07.2026",
    firstVisit: "14.02.2024",
    vip: true,
  },
  {
    name: "Séraphine Okonkwo-Vandenberghe",
    phone: "+374 55 019 284",
    email: "seraphine.okonkwo-vandenberghe.appointments@example.com",
    sold: "123 456 789 ֏",
    balance: "12 000 ֏",
    visits: 3,
    discount: "0%",
    lastVisit: "02.07.2026",
    firstVisit: "18.05.2026",
    vip: false,
  },
  {
    name: "Karen Sahakyan",
    phone: "+374 93 771 042",
    email: "karen.s@example.com",
    sold: "0 ֏",
    balance: "0 ֏",
    visits: 0,
    discount: "0%",
    lastVisit: null,
    firstVisit: null,
    vip: false,
  },
];

const teamRows = [
  {
    name: "Karen Sahakyan",
    initials: "KS",
    role: "Barber",
    branch: "Downtown — Amiryan St.",
    status: "Active" as const,
  },
  {
    name: "Mariam Petrosyan",
    initials: "MP",
    role: "Colourist",
    branch: "Downtown — Amiryan St.",
    status: "Active" as const,
  },
  {
    name: "Tigran Avetisyan",
    initials: "TA",
    role: "No position",
    branch: "Northside — Komitas Ave.",
    status: "Invited" as const,
  },
  {
    name: "Lilit Harutyunyan",
    initials: "LH",
    role: "Nail technician",
    branch: "Northside — Komitas Ave.",
    status: "On leave" as const,
  },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Active: "default",
  Invited: "secondary",
  "On leave": "outline",
};

const catalogRows = [
  {
    id: "SV-001",
    service: "Classic haircut",
    category: "Hair",
    duration: "30 min",
    price: "֏8,500",
    staff: "Karen S.",
    room: "Chair 1",
    online: "Yes",
    buffer: "5 min",
    tax: "20%",
    stock: "—",
    updated: "Aug 10",
  },
  {
    id: "SV-014",
    service: "Full colour + toner",
    category: "Colour",
    duration: "120 min",
    price: "֏42,000",
    staff: "Mariam P.",
    room: "Chair 3",
    online: "Yes",
    buffer: "15 min",
    tax: "20%",
    stock: "—",
    updated: "Aug 9",
  },
  {
    id: "SV-027",
    service: "Gel manicure",
    category: "Nails",
    duration: "45 min",
    price: "֏12,000",
    staff: "Lilit H.",
    room: "Nail bar",
    online: "No",
    buffer: "10 min",
    tax: "20%",
    stock: "—",
    updated: "Jul 30",
  },
  {
    id: "SV-032",
    service: "Beard trim",
    category: "Hair",
    duration: "15 min",
    price: "֏3,500",
    staff: "Karen S.",
    room: "Chair 1",
    online: "Yes",
    buffer: "0 min",
    tax: "20%",
    stock: "—",
    updated: "Aug 12",
  },
];

const settingsRows = [
  { setting: "Business name", value: "Zhamo Studio" },
  { setting: "Time zone", value: "Asia/Yerevan (UTC+4)" },
  { setting: "Online booking", value: "Enabled" },
  { setting: "Cancellation window", value: "24 hours" },
];

export default function TableDemoPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          shared/ui/table
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Table primitive — responsive variants
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Each section renders the same primitive with a different{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">variant</code>.
          Use the width buttons (or drag the container&apos;s resize handle) to
          check behaviour at 375px, 768px, and 1280px.
        </p>
      </header>

      <DemoFrame
        title="Clients — priority variant"
        description="12 columns worth of detail collapse behind a chevron as the container narrows; the name column never hides."
      >
        <Table variant="priority" density="comfortable">
          <TableCaption className="sr-only">Client list</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead priority="primary">Name</TableHead>
              <TableHead priority="secondary">Phone</TableHead>
              <TableHead priority="tertiary">Email</TableHead>
              <TableHead align="end" priority="tertiary">
                Visits
              </TableHead>
              <TableHead priority="secondary">Last visit</TableHead>
              <TableHead align="end" priority="secondary">
                Total spend
              </TableHead>
              <TableHead align="end" priority="secondary">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientRows.map((client) => (
              <TableRow key={client.name}>
                <TableCell>
                  <span className="inline-flex items-center gap-2">
                    {client.name}
                    {client.vip && <Badge variant="secondary">VIP</Badge>}
                  </span>
                </TableCell>
                <TableCell label="Phone">{client.phone}</TableCell>
                <TableCell label="Email" truncate>
                  {client.email}
                </TableCell>
                <TableCell label="Visits">{client.visits}</TableCell>
                <TableCell label="Last visit">{client.lastVisit}</TableCell>
                <TableCell label="Total spend">{client.spend}</TableCell>
                <TableCell label="Actions">
                  <ActionsCell />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoFrame>

      <DemoFrame
        title="Clients — stack variant, grouped bands"
        description="Identity (checkbox + avatar + name + VIP), contact (phone · email, tappable), a metrics grid, and actions pinned to the footer — composed via TableHead's group prop."
      >
        <Table variant="stack">
          <TableCaption className="sr-only">Client list</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead align="center" group="identity">
                <span className="sr-only">Select</span>
              </TableHead>
              <TableHead group="identity">Name</TableHead>
              <TableHead group="contact">Phone</TableHead>
              <TableHead group="contact">Email</TableHead>
              <TableHead align="end" group="metric">
                Sold
              </TableHead>
              <TableHead align="end" group="metric">
                Balance
              </TableHead>
              <TableHead align="end" group="metric">
                Visits
              </TableHead>
              <TableHead align="end" group="metric">
                Discount
              </TableHead>
              <TableHead group="metric">Last visit</TableHead>
              <TableHead group="metric">First visit</TableHead>
              <TableHead align="end" group="actions">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientDetailRows.map((client) => (
              <TableRow key={client.name}>
                <TableCell align="center">
                  <Checkbox aria-label={`Select ${client.name}`} />
                </TableCell>
                <TableCell>
                  <Avatar size="sm">
                    <AvatarFallback>{initialsOf(client.name)}</AvatarFallback>
                  </Avatar>
                  {client.name}
                  {client.vip && (
                    <Badge variant="secondary" className="ms-auto">
                      VIP
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell truncate>{client.email}</TableCell>
                <TableCell align="end">{client.sold}</TableCell>
                <TableCell align="end">{client.balance}</TableCell>
                <TableCell align="end">{client.visits}</TableCell>
                <TableCell align="end">{client.discount}</TableCell>
                <TableCell>{client.lastVisit}</TableCell>
                <TableCell>{client.firstVisit}</TableCell>
                <TableCell align="end">
                  <ActionsCell />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoFrame>

      <DemoFrame
        title="Team — stack variant"
        description="Below the container's md breakpoint each row becomes a card: name is the title, Role/Branch/Status form a metrics row, actions pin to the footer."
      >
        <Table variant="stack">
          <TableCaption className="sr-only">Team members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead group="identity">Team member</TableHead>
              <TableHead group="metric">Role</TableHead>
              <TableHead group="metric">Branch</TableHead>
              <TableHead align="center" group="metric">
                Status
              </TableHead>
              <TableHead align="end" group="actions">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamRows.map((member) => (
              <TableRow key={member.name}>
                <TableCell>
                  <Avatar size="sm">
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  {member.name}
                </TableCell>
                <TableCell label="Role">{member.role}</TableCell>
                <TableCell label="Branch">{member.branch}</TableCell>
                <TableCell label="Status" align="center">
                  <Badge variant={statusVariant[member.status]}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell label="Actions" align="end">
                  <ActionsCell />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoFrame>

      <DemoFrame
        title="Service catalog — scroll variant, 12 columns"
        description="Sticky header and sticky first column, with edge fades that only appear once there's something to scroll to."
      >
        <Table variant="scroll" density="compact" stickyHeader stickyColumn>
          <TableCaption className="sr-only">Service catalog</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Category</TableHead>
              <TableHead align="end">Duration</TableHead>
              <TableHead align="end">Price</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead>Room</TableHead>
              <TableHead align="center">Online</TableHead>
              <TableHead align="end">Buffer</TableHead>
              <TableHead align="end">Tax</TableHead>
              <TableHead align="end">Stock</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {catalogRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground">
                  {row.id}
                </TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="end">{row.duration}</TableCell>
                <TableCell align="end">{row.price}</TableCell>
                <TableCell>{row.staff}</TableCell>
                <TableCell>{row.room}</TableCell>
                <TableCell align="center">{row.online}</TableCell>
                <TableCell align="end">{row.buffer}</TableCell>
                <TableCell align="end">{row.tax}</TableCell>
                <TableCell align="end">{row.stock}</TableCell>
                <TableCell truncate>{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoFrame>

      <DemoFrame
        title="Business settings — stack variant, 2 columns"
        description="The minimal case: a setting/value pair. Below md it still reads as a labelled list, not a grid."
      >
        <Table variant="stack">
          <TableCaption className="sr-only">Business settings</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead group="identity">Setting</TableHead>
              <TableHead group="metric">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settingsRows.map((row) => (
              <TableRow key={row.setting}>
                <TableCell>{row.setting}</TableCell>
                <TableCell label="Value">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoFrame>
    </div>
  );
}
