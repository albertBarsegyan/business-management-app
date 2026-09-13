import ky from "ky";

/**
 * Client-side HTTP client. Always talks to this app's own /api/* route
 * handlers (same-origin, relative prefixUrl) — never to the NestJS backend
 * directly. Auth is carried by httpOnly cookies the browser sends
 * automatically, so no token handling belongs here.
 */
export const apiClient = ky.create({
  prefix: "/api",
  throwHttpErrors: false,
});
