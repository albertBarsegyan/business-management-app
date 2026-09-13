import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyAuthenticated(`bookings/${id}/confirm`, { method: "post" });
}
