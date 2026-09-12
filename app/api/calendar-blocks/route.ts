import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET() {
  return proxyAuthenticated("calendar-blocks");
}

export async function POST(request: Request) {
  const json = await request.json();
  return proxyAuthenticated("calendar-blocks", { method: "post", json });
}
