import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("team-members");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("team-members", { method: "post", json });
}
