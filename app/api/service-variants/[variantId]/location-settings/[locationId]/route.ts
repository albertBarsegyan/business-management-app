import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ variantId: string; locationId: string }> },
) {
  const { variantId, locationId } = await params;
  const json = await request.json();
  return proxyAuthenticated(
    `service-variants/${variantId}/location-settings/${locationId}`,
    { method: "put", json },
  );
}
