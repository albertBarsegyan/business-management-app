"use client";

import type { KyResponse, ResponsePromise } from "ky";

export interface ApiErrorBody {
  message: string | string[];
  error?: string;
  statusCode: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    /** The full parsed error body, when the backend sends structured
     * details beyond `message` (e.g. SchedulingConflictException's
     * `alternatives` array) — most callers only need `.message`. */
    public readonly body?: unknown,
  ) {
    super(message);
  }
}

/**
 * Unwraps a ky ResponsePromise into its parsed JSON body, throwing an
 * ApiError with the backend's message on non-2xx responses. Shared across
 * every module's queries.ts.
 */
export async function unwrap<T>(
  responsePromise: ResponsePromise<unknown>,
): Promise<T> {
  const response: KyResponse = await responsePromise;
  if (!response.ok) {
    const body = (await response
      .json()
      .catch(() => null)) as ApiErrorBody | null;
    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : (body?.message ?? "Request failed");
    throw new ApiError(message, response.status, body);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json<T>();
}
