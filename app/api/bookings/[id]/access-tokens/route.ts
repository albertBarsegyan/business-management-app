import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const json = await request.json();
  return proxyAuthenticated(`bookings/${id}/access-tokens`, {
    method: "post",
    json,
  });
}
