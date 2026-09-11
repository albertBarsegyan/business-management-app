import "server-only";
import type { KyResponse } from "ky";
import type { components } from "@/shared/api/generated/schema";

type ErrorResponseDto = components["schemas"]["ErrorResponseDto"];

/**
 * Server-side counterpart to `shared/api/http.ts`'s client-side `ApiError`
 * — used by Server Actions/DAL code that calls the backend directly
 * (never through the browser-facing `/api/*` proxy). Same shape, kept
 * separate because the two run in different environments.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: Partial<ErrorResponseDto>,
  ) {
    super(message);
  }
}

/**
 * Throws an `ApiError` for a non-2xx ky response, otherwise resolves to the
 * parsed body. `response.json()` on a 204 has no body — callers of a
 * void-returning endpoint should ignore the resolved value.
 */
export async function unwrapBackendResponse<T>(
  response: KyResponse,
): Promise<T> {
  if (!response.ok) {
    const body = (await response
      .json()
      .catch(() => null)) as Partial<ErrorResponseDto> | null;
    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : (body?.message ?? "Request failed");
    throw new ApiError(message, response.status, body ?? undefined);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json<T>();
}

/**
 * Nest's default `ValidationPipe` (no custom `exceptionFactory` — see
 * main.ts) emits one human-readable string per failed constraint, e.g.
 * `"email must be an email"`, not a field-keyed map. This heuristically
 * recovers the field name from the leading token, which matches every
 * class-validator message in this codebase today (verified against the
 * DTOs this phase touches). Anything that doesn't match a known field
 * falls through to `formError` instead of being silently dropped.
 */
export function splitValidationErrors(
  error: ApiError,
  knownFields: readonly string[],
): { fieldErrors: Record<string, string>; formError?: string } {
  const messages = Array.isArray(error.body?.message)
    ? error.body.message
    : [error.message];

  const fieldErrors: Record<string, string> = {};
  const unmatched: string[] = [];

  for (const raw of messages) {
    const field = knownFields.find((name) => raw.startsWith(name));
    if (field && !(field in fieldErrors)) {
      fieldErrors[field] = raw;
    } else {
      unmatched.push(raw);
    }
  }

  return {
    fieldErrors,
    formError: unmatched.length > 0 ? unmatched.join(", ") : undefined,
  };
}
