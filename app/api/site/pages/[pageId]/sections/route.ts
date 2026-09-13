import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  return proxyAuthenticated(`site/pages/${pageId}/sections`);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> },
) {
  const { pageId } = await params;
  const json = await request.json();
  return proxyAuthenticated(`site/pages/${pageId}/sections`, {
    method: "post",
    json,
  });
}
