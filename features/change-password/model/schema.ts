import { z } from "zod";
import type { components } from "@/shared/api/generated/schema";
import type { Equals, Expect } from "@/shared/lib/assert-type";

/**
 * `confirmPassword` only exists for this form's own validation — it's never
 * sent to the backend, so it's excluded from the DTO-matching type below
 * rather than folded into `ChangePasswordDto` itself.
 */
export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    // Same policy as the backend's ChangePasswordDto.newPassword.
    newPassword: z
      .string()
      .min(10, "Password must be at least 10 characters.")
      .max(72, "Password must be at most 72 characters."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export type ChangePasswordValues = Omit<
  ChangePasswordFormValues,
  "confirmPassword"
>;

// Breaks `pnpm build` if the backend's ChangePasswordDto shape drifts from this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- compile-time-only check, never referenced at runtime
type _AssertChangePasswordMatchesDto = Expect<
  Equals<ChangePasswordValues, components["schemas"]["ChangePasswordDto"]>
>;
