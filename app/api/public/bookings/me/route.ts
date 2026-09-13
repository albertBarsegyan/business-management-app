import { NextResponse } from "next/server";
import { proxyPublic } from "@/shared/api/server/proxy-response";

export async function GET(request: Request) {
  const accessToken = request.headers.get("x-booking-access-token");
  if (!accessToken) {
    return NextResponse.json(
      { message: "Missing booking access token." },
      { status: 401 },
    );
  }
  return proxyPublic("public/bookings/me", accessToken);
}
