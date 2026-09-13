import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ pageId: string; sectionId: string }> },
) {
  const { pageId, sectionId } = await params;
  const json = await request.json();
  return proxyAuthenticated(`site/pages/${pageId}/sections/${sectionId}`, {
    method: "patch",
    json,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ pageId: string; sectionId: string }> },
) {
  const { pageId, sectionId } = await params;
  return proxyAuthenticated(`site/pages/${pageId}/sections/${sectionId}`, {
    method: "delete",
  });
}
