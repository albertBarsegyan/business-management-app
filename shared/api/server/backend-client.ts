import "server-only";
import ky from "ky";

if (!process.env.BACKEND_API_BASE_URL) {
  throw new Error("BACKEND_API_BASE_URL is not set");
}

export const backendClient = ky.create({
  prefix: process.env.BACKEND_API_BASE_URL,
  throwHttpErrors: false,
});
