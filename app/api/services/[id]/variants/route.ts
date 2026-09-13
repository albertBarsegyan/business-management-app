import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyAuthenticated(`services/${id}/variants`);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const json = await request.json();
  return proxyAuthenticated(`services/${id}/variants`, {
    method: "post",
    json,
  });
}
