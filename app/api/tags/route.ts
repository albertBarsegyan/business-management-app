import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("tags");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("tags", { method: "post", json });
}
