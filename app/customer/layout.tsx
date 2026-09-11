import type { Metadata } from "next";
import { zhamoFontVariables } from "@/shared/config/zhamo-fonts";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: "Public booking flow — no staff sign-in required.",
};

/**
 * Deliberately outside `app/(zhamo)/layout.tsx` — that layout carries the
 * staff auth/onboarding guard (Phase 2), and this is the one customer-facing,
 * unauthenticated page in the app. Duplicates the zhamo font wrapper so the
 * page keeps its visual identity despite sitting outside that route group.
 */
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={zhamoFontVariables}
      style={{
        fontFamily: "var(--font-zhamo-sans), Helvetica, Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {children}
    </div>
  );
}
