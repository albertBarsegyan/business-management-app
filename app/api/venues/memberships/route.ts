import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("venues/memberships");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("venues/memberships", { method: "post", json });
}
