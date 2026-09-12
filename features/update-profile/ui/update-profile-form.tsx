"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { updateProfileAction } from "../model/actions";
import { updateProfileSchema, type UpdateProfileValues } from "../model/schema";

export function UpdateProfileForm({
  displayName,
  primaryPhoneE164,
}: {
  displayName: string;
  primaryPhoneE164: string | null;
}) {
  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      displayName,
      primaryPhoneE164: primaryPhoneE164 ?? "",
    },
  });

  async function onSubmit(values: UpdateProfileValues) {
    const result = await updateProfileAction(values);
    if (!result) {
      toast.success("Profile updated.");
      return;
    }
    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      form.setError(field as keyof UpdateProfileValues, { message });
    }
    if (result.formError) {
      form.setError("root", { message: result.formError });
      toast.error(result.formError);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.displayName}>
          <FieldLabel htmlFor="displayName">Name</FieldLabel>
          <Input
            id="displayName"
            autoComplete="name"
            aria-invalid={!!form.formState.errors.displayName}
            {...form.register("displayName")}
          />
          <FieldError errors={[form.formState.errors.displayName]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.primaryPhoneE164}>
          <FieldLabel htmlFor="primaryPhoneE164">Phone</FieldLabel>
          <Input
            id="primaryPhoneE164"
            type="tel"
            autoComplete="tel"
            placeholder="+374 77 000 000"
            aria-invalid={!!form.formState.errors.primaryPhoneE164}
            {...form.register("primaryPhoneE164")}
          />
          <FieldError errors={[form.formState.errors.primaryPhoneE164]} />
        </Field>
      </FieldGroup>

      <FieldError errors={[form.formState.errors.root]} />

      <Button
        type="submit"
        className="self-start"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
