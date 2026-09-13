import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("site/pages");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("site/pages", { method: "post", json });
}
