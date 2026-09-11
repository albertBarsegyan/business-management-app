import type { z } from "zod";

/** First error message per field, for handing to RHF's `setError`. */
export function flattenZodFieldErrors<T extends Record<string, unknown>>(
  error: z.ZodError<T>,
): Partial<Record<keyof T, string>> {
  const flat = error.flatten().fieldErrors;
  const result: Partial<Record<keyof T, string>> = {};
  for (const key of Object.keys(flat) as (keyof T)[]) {
    const messages = flat[key];
    if (messages && messages.length > 0) {
      result[key] = messages[0];
    }
  }
  return result;
}
