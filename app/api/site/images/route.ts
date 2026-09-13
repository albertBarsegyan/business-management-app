import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function POST(request: Request) {
  const formData = await request.formData();
  return proxyAuthenticated("site/images", { method: "post", body: formData });
}
