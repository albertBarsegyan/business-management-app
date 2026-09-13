import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("site/draft");
}

export async function PATCH(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("site/draft", { method: "patch", json });
}
