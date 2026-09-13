import { ACCENT_DEEP, type BookingFlow } from "../../lib/use-booking-flow";
import { BottomBar } from "./bottom-bar";
import { StepConfirmed } from "./step-confirmed";
import { StepDatetime } from "./step-datetime";
import { StepDetails } from "./step-details";
import { StepServices } from "./step-services";
import { StepSpecialist } from "./step-specialist";
import { WidgetHeader } from "./widget-header";

export function MobileWidget({ flow }: { flow: BookingFlow }) {
  return (
    <>
      <div
        className="zhamo-mobile-widget-frame"
        style={{
          width: 390,
          flex: "0 0 auto",
          borderRadius: 30,
          background: "#16161A",
          padding: 10,
          boxShadow: "0 24px 60px rgba(10,10,14,0.28)",
        }}
      >
        <div
          className="zhamo-mobile-widget-screen"
          style={{
            borderRadius: 22,
            background: "#FFFFFF",
            overflow: "hidden",
            height: 780,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="zhamo-mobile-widget-statusbar"
            style={{
              height: 32,
              flex: "0 0 auto",
              background: ACCENT_DEEP,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 18px",
              color: "#FFFFFF",
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 10.5,
            }}
          >
            <span>9:41</span>
            <span>▮▮▮ ⌁ ▰</span>
          </div>

          <WidgetHeader flow={flow} />

          <div
            style={{
              flex: "1 1 auto",
              overflowY: "auto",
              borderTop: "1px solid #EEF0F2",
              background: "#FAFBFC",
            }}
          >
            {flow.isStep1 && <StepServices flow={flow} />}
            {flow.isStep2 && <StepSpecialist flow={flow} />}
            {flow.isStep3 && <StepDatetime flow={flow} />}
            {flow.isStep4 && <StepDetails flow={flow} />}
            {flow.isStep5 && <StepConfirmed flow={flow} />}
          </div>

          <BottomBar flow={flow} />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .zhamo-mobile-widget-frame {
            width: 100% !important;
            height: 100dvh !important;
            border-radius: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .zhamo-mobile-widget-screen {
            height: 100% !important;
            border-radius: 0 !important;
          }
          .zhamo-mobile-widget-statusbar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
