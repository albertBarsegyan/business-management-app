import type { Metadata } from "next";
import { requireUser } from "@/entities/session";
import { getInitials } from "@/shared/lib/get-initials";
import { PageHeader, PageShell } from "@/widgets/day-calendar";

export const metadata: Metadata = {
  title: "Profile — Zhamo",
};

/**
 * Deliberately minimal — exists so the sidebar's profile link has somewhere
 * real to go (Phase 3a). Editing, change password, and avatar upload are
 * Phase 4.
 */
export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <PageShell>
      <PageHeader title="Profile" subtitle="Your account details." />

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            width: 48,
            height: 48,
            flex: "0 0 auto",
            borderRadius: "50%",
            background: "oklch(0.64 0.16 350)",
            color: "#FFFFFF",
            fontSize: 17,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getInitials(user.displayName)}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            {user.displayName}
          </span>
          <span style={{ fontSize: 13, color: "#8A9099" }}>
            {user.primaryEmail ?? "No email on file"}
          </span>
          {user.primaryPhoneE164 && (
            <span style={{ fontSize: 13, color: "#8A9099" }}>
              {user.primaryPhoneE164}
            </span>
          )}
        </div>
      </div>
    </PageShell>
  );
}
