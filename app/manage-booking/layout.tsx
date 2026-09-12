import type { Metadata } from "next";
import { zhamoFontVariables } from "@/shared/config/zhamo-fonts";

export const metadata: Metadata = {
  title: "Manage your booking",
  description: "View, reschedule, or cancel your booking — no account needed.",
};

/**
 * Outside `app/(zhamo)/layout.tsx` for the same reason as `app/customer` —
 * this is reached via a token in the URL (`x-booking-access-token`), never
 * a staff session, so it must not be behind the auth guard.
 */
export default function ManageBookingLayout({
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
