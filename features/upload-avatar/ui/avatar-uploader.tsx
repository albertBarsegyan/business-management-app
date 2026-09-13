"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { assetUrl } from "@/shared/lib/asset-url";
import { getInitials } from "@/shared/lib/get-initials";
import { removeAvatarAction, uploadAvatarAction } from "../model/actions";

export function AvatarUploader({
  displayName,
  avatarAssetId,
}: {
  displayName: string;
  avatarAssetId: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSrc =
    preview ?? (avatarAssetId ? assetUrl(avatarAssetId) : undefined);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadAvatarAction(formData);
      URL.revokeObjectURL(objectUrl);
      setPreview(null);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Avatar updated.");
      }
      event.target.value = "";
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const result = await removeAvatarAction();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Avatar removed.");
      }
    });
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage src={currentSrc} alt={displayName} />
        <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
      </Avatar>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
        >
          {isPending ? "Uploading…" : "Upload photo"}
        </Button>
        {avatarAssetId && (
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={handleRemove}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
