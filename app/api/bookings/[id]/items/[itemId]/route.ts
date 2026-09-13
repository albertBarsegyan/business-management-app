import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  const { id, itemId } = await params;
  const json = await request.json();
  return proxyAuthenticated(`bookings/${id}/items/${itemId}`, {
    method: "patch",
    json,
  });
}
