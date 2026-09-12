import type { Metadata } from "next";
import { requireUser } from "@/entities/session";
import { ProfileSettingsScreen } from "@/widgets/profile-settings";

export const metadata: Metadata = {
  title: "Profile — Zhamo",
};

export default async function ProfilePage() {
  const user = await requireUser();

  return <ProfileSettingsScreen user={user} />;
}
