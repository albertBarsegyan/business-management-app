import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET(request: Request) {
  const { search } = new URL(request.url);
  return proxyAuthenticated(`audit-logs${search}`);
}
