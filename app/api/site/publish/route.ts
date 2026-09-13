import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function POST() {
  return proxyAuthenticated("site/publish", { method: "post" });
}
