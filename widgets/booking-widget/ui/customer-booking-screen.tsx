"use client";

import { useBookingFlow } from "../lib/use-booking-flow";
import { DesktopEmbed } from "./desktop-embed";
import { MobileWidget } from "./mobile-widget";

export function CustomerBookingScreen() {
  const flow = useBookingFlow();

  return (
    <div style={{ minHeight: "100dvh", background: "#E9EBEE" }}>
      <div className="zhamo-customer-mobile">
        <MobileWidget flow={flow} />
      </div>
      <div className="zhamo-customer-desktop">
        <DesktopEmbed flow={flow} />
      </div>

      <style>{`
        .zhamo-customer-mobile { display: none; }
        .zhamo-customer-desktop { display: flex; justify-content: center; padding: 56px 24px; }
        @media (max-width: 640px) {
          .zhamo-customer-mobile { display: block; }
          .zhamo-customer-desktop { display: none; }
        }
      `}</style>
    </div>
  );
}
