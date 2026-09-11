import { z } from "zod";
import type { components } from "@/shared/api/generated/schema";
import type { Equals, Expect } from "@/shared/lib/assert-type";

/**
 * `businessName` is collected for UX (asked up front, feels natural) but
 * deliberately never sent to `POST /auth/register` — `RegisterDto` has no
 * such field; venue/business creation happens separately via the `/setup`
 * wizard's `POST /venues/onboarding`, which registration redirects into.
 * Field constraints below mirror the backend's class-validator decorators
 * on `RegisterDto` exactly (`displayName`: 1–200 chars, `password`: 10–72).
 */
export const signUpSchema = z.object({
  displayName: z
    .string()
    .min(1, "Enter your name.")
    .max(200, "Keep it under 200 characters."),
  businessName: z.string().min(1, "Enter your business name."),
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(10, "Use at least 10 characters.")
    .max(72, "Keep it under 72 characters."),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

/** The subset actually sent to the backend — see the comment above. */
type RegisterPayload = Pick<SignUpValues, "displayName" | "email" | "password">;

// Breaks `pnpm build` if the backend's RegisterDto shape drifts from this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- compile-time-only check, never referenced at runtime
type _AssertRegisterPayloadMatchesDto = Expect<
  Equals<RegisterPayload, components["schemas"]["RegisterDto"]>
>;
