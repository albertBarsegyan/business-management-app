import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; tagId: string }> },
) {
  const { id, tagId } = await params;
  return proxyAuthenticated(`clients/${id}/tags/${tagId}`, {
    method: "delete",
  });
}
