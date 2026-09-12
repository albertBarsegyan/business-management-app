import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("in-app-notifications");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("in-app-notifications", { method: "post", json });
}
