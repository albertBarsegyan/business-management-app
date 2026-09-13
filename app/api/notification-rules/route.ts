import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("notification-rules");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("notification-rules", { method: "post", json });
}
