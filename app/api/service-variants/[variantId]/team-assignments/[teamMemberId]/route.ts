import { proxyAuthenticated } from "@/shared/api/server/proxy-response";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ variantId: string; teamMemberId: string }> },
) {
  const { variantId, teamMemberId } = await params;
  const json = await request.json();
  return proxyAuthenticated(
    `service-variants/${variantId}/team-assignments/${teamMemberId}`,
    { method: "put", json },
  );
}
