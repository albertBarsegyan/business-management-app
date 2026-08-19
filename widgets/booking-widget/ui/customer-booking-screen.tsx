"use client";

import { PublicLandingPage } from "@/widgets/landing-builder";
import { useBookingFlow } from "../lib/use-booking-flow";
import { DesktopEmbed } from "./desktop-embed";
import { MobileWidget } from "./mobile-widget";

export function CustomerBookingScreen() {
  const flow = useBookingFlow();

  return (
    <PublicLandingPage
      bookingSlot={
        <>
          <div className="zhamo-customer-mobile">
            <MobileWidget flow={flow} />
          </div>
          <div className="zhamo-customer-desktop">
            <DesktopEmbed flow={flow} />
          </div>

          <style>{`
            .zhamo-customer-mobile { display: none; }
            .zhamo-customer-desktop { display: flex; justify-content: center; }
            @media (max-width: 640px) {
              .zhamo-customer-mobile { display: flex; justify-content: center; }
              .zhamo-customer-desktop { display: none; }
            }
          `}</style>
        </>
      }
    />
  );
}
