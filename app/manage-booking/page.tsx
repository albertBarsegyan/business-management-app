import { ManageBookingScreen } from "@/widgets/booking-widget/ui/manage-booking-screen";

export default async function ManageBookingPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <p style={{ fontSize: 13, color: "#8A9099" }}>
          This link is missing its booking token.
        </p>
      </div>
    );
  }

  return <ManageBookingScreen token={token} />;
}
