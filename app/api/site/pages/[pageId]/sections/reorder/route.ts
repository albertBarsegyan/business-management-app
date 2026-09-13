import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  const json = await request.json();
  return proxyAuthenticated(`site/pages/${pageId}/sections/reorder`, {
    method: "patch",
    json,
  });
}
