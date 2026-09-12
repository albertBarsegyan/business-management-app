import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const json = await request.json();
  return proxyAuthenticated(`clients/${id}`, { method: "patch", json });
}
