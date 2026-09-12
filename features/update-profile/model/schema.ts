import { z } from "zod";
import type { components } from "@/shared/api/generated/schema";
import type { Equals, Expect } from "@/shared/lib/assert-type";

/** Mirrors the backend's `UpdateProfileDto` class-validator constraints exactly. */
export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, "Enter your name.")
    .max(200, "Name is too long.")
    .optional(),
  primaryPhoneE164: z.string().optional(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

// Breaks `pnpm build` if the backend's UpdateProfileDto shape drifts from this schema.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- compile-time-only check, never referenced at runtime
type _AssertUpdateProfileMatchesDto = Expect<
  Equals<UpdateProfileValues, components["schemas"]["UpdateProfileDto"]>
>;
