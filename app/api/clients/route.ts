import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("clients");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("clients", { method: "post", json });
}
