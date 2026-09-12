import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyAuthenticated(`team-members/${id}/availability-exceptions`);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const json = await request.json();
  return proxyAuthenticated(`team-members/${id}/availability-exceptions`, {
    method: "post",
    json,
  });
}
