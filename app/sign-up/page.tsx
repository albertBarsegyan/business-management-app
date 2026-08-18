import Link from "next/link";
import type { Metadata } from "next";
import { SignUpForm } from "@/features/sign-up/ui/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up — Business Management",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-16 sm:px-6">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <Link href="/" className="flex items-center justify-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
            B
          </span>
          Business Management
        </Link>

        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-xl font-semibold tracking-tight">
              Create your business account
            </h1>
            <p className="text-sm text-muted-foreground">
              Set up scheduling, clients, and invoicing for your business in
              minutes.
            </p>
          </div>

          <SignUpForm />
        </div>

        <Link
          href="/"
          className="text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
