import { z } from "zod";
import type { components } from "@/shared/api/generated/schema";
import type { Equals, Expect } from "@/shared/lib/assert-type";

/** Mirrors the backend's `LoginDto` class-validator constraints exactly. */
export const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export type SignInValues = z.infer<typeof signInSchema>;

// Breaks `pnpm build` if the backend's LoginDto shape drifts from this schema.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- compile-time-only check, never referenced at runtime
type _AssertSignInMatchesLoginDto = Expect<
  Equals<SignInValues, components["schemas"]["LoginDto"]>
>;
