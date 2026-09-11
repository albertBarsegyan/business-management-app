import { Suspense } from "react";
import { CustomerBookingScreen } from "@/widgets/booking-widget";

export default function CustomerPage() {
  return (
    <Suspense fallback={null}>
      <CustomerBookingScreen />
    </Suspense>
  );
}
