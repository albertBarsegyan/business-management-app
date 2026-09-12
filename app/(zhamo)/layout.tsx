import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireUser } from "@/entities/session";
import { SessionProvider } from "@/entities/session/ui/session-provider";
import { zhamoFontVariables } from "@/shared/config/zhamo-fonts";

export const metadata: Metadata = {
  title: "Zhamo",
  description: "Zhamo — booking and front-desk system for service businesses.",
};

/**
 * The real auth check for every staff-facing route (Phase 2, D1). `/customer`
 * (public booking) deliberately lives outside this route group — see
 * `app/customer/layout.tsx`. `requireUser()` redirects to /sign-in on its
 * own if there's no valid session; from there we only need the onboarding
 * check, using the `venueId` already on that same cached response (null
 * until venue onboarding completes — see `AuthenticatedUser`'s doc comment
 * in the backend) rather than a second call to GET /venues/me.
 */
export default async function ZhamoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const pathname = (await headers()).get("x-pathname") ?? "";

  if (!user.venueId && pathname !== "/setup") {
    redirect("/setup");
  }

  return (
    <div
      className={zhamoFontVariables}
      style={{
        fontFamily: "var(--font-zhamo-sans), Helvetica, Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <SessionProvider user={user}>{children}</SessionProvider>
    </div>
  );
}
