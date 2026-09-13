import Link from "next/link";
import { ArrowRight, CalendarDays, Menu, Receipt, Users } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const features = [
  {
    icon: CalendarDays,
    title: "Scheduling",
    description:
      "A shared calendar for your whole team, with booking pages clients can use to grab open slots themselves.",
  },
  {
    icon: Users,
    title: "Clients & team",
    description:
      "Keep contact details, notes, and history in one place so anyone on the team can pick up where you left off.",
  },
  {
    icon: Receipt,
    title: "Invoicing",
    description:
      "Turn appointments into invoices in a couple of clicks and track what's paid, pending, or overdue.",
  },
];

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              B
            </span>
            Business Management
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>

          <Button variant="outline" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Badge variant="outline">Now in beta</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Run your whole business from one place
            </h1>
            <p className="text-balance text-muted-foreground sm:text-lg">
              Scheduling, clients, and invoicing in a single, simple tool —
              built for small teams who&#39;d rather spend time on the work than
              the admin.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/sign-up">
                  Get started free
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-t border-border/60 bg-muted/30"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                Everything you need, nothing you don&#39;t
              </h2>
              <p className="mt-3 text-muted-foreground">
                Three tools that work together instead of three tabs you have to
                keep in sync.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="size-4.5" />
                    </div>
                    <CardTitle className="mt-3">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent />
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-t border-border/60">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 sm:py-24">
            <h2 className="text-3xl font-semibold tracking-tight">
              Ready to get organized?
            </h2>
            <p className="max-w-md text-balance text-muted-foreground">
              Start free — no credit card required. Upgrade whenever your team
              grows.
            </p>
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get started free
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="col-span-2 flex flex-col gap-2 sm:col-span-1">
              <span className="flex items-center gap-2 font-semibold tracking-tight">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
                  B
                </span>
                Business Management
              </span>
              <p className="text-sm text-muted-foreground">
                Scheduling, clients, and invoicing in one place.
              </p>
            </div>

            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-2">
                <span className="text-sm font-medium">{heading}</span>
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <Separator className="my-8" />

          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Business Management. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
