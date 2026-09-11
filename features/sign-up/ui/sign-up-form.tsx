"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { signUpAction } from "../model/actions";
import { signUpSchema, type SignUpValues } from "../model/schema";

export function SignUpForm() {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      businessName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    const result = await signUpAction(values);
    if (!result) {
      return;
    }
    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      form.setError(field as keyof SignUpValues, { message });
    }
    if (result.formError) {
      form.setError("root", { message: result.formError });
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.displayName}>
          <FieldLabel htmlFor="display-name">Your name</FieldLabel>
          <Input
            id="display-name"
            autoComplete="name"
            placeholder="Jordan Lee"
            aria-invalid={!!form.formState.errors.displayName}
            {...form.register("displayName")}
          />
          <FieldError errors={[form.formState.errors.displayName]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.businessName}>
          <FieldLabel htmlFor="business-name">Business name</FieldLabel>
          <Input
            id="business-name"
            autoComplete="organization"
            placeholder="Alden & Rowe Studio"
            aria-invalid={!!form.formState.errors.businessName}
            {...form.register("businessName")}
          />
          <FieldError errors={[form.formState.errors.businessName]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="email">Work email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 10 characters"
            aria-invalid={!!form.formState.errors.password}
            {...form.register("password")}
          />
          <FieldError errors={[form.formState.errors.password]} />
        </Field>
      </FieldGroup>

      <FieldError errors={[form.formState.errors.root]} />

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
