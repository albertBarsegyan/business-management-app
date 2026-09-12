import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("waitlist-entries");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("waitlist-entries", { method: "post", json });
}
