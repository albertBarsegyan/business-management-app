import { ChangePasswordForm } from "@/features/change-password/ui/change-password-form";
import { UpdateProfileForm } from "@/features/update-profile/ui/update-profile-form";
import { AvatarUploader } from "@/features/upload-avatar/ui/avatar-uploader";
import type { SessionUser } from "@/entities/session";
import { PageHeader, PageShell } from "@/widgets/day-calendar";

function SettingsCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-md flex-col gap-5 rounded-lg border border-border bg-background p-5">
      <h2 className="text-sm font-semibold">{title}</h2>
      {children}
    </div>
  );
}

export function ProfileSettingsScreen({ user }: { user: SessionUser }) {
  return (
    <PageShell>
      <PageHeader
        title="Profile"
        subtitle="Your account details, password, and photo."
      />

      <SettingsCard title="Photo">
        <AvatarUploader
          displayName={user.displayName}
          avatarAssetId={user.avatarAssetId}
        />
      </SettingsCard>

      <SettingsCard title="Account details">
        <UpdateProfileForm
          displayName={user.displayName}
          primaryPhoneE164={user.primaryPhoneE164}
        />
      </SettingsCard>

      <SettingsCard title="Password">
        <ChangePasswordForm />
      </SettingsCard>
    </PageShell>
  );
}
