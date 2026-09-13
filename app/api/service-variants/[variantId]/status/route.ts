import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ variantId: string }> },
) {
  const { variantId } = await params;
  const json = await request.json();
  return proxyAuthenticated(`service-variants/${variantId}/status`, {
    method: "patch",
    json,
  });
}
