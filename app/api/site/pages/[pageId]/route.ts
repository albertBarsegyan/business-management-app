import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  const json = await request.json();
  return proxyAuthenticated(`site/pages/${pageId}`, { method: "patch", json });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  return proxyAuthenticated(`site/pages/${pageId}`, { method: "delete" });
}
