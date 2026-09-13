import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("service-categories");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("service-categories", { method: "post", json });
}
