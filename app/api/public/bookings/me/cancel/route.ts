import { NextResponse } from "next/server";
import { proxyPublic } from "@/shared/api/server/proxy-response";

export async function POST(request: Request) {
  const accessToken = request.headers.get("x-booking-access-token");
  if (!accessToken) {
    return NextResponse.json(
      { message: "Missing booking access token." },
      { status: 401 },
    );
  }
  const json = await request.json().catch(() => ({}));
  return proxyPublic("public/bookings/me/cancel", accessToken, {
    method: "post",
    json,
  });
}
