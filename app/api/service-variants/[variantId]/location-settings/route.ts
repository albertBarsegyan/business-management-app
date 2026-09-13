import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ variantId: string }> },
) {
  const { variantId } = await params;
  return proxyAuthenticated(`service-variants/${variantId}/location-settings`);
}
