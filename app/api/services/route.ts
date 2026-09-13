import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("services");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("services", { method: "post", json });
}
