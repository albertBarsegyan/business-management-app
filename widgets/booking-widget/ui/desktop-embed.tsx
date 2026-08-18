import { COVER_A, COVER_B, type BookingFlow } from "../lib/use-booking-flow";
import { BottomBar } from "./mobile-widget/bottom-bar";
import { StepConfirmed } from "./mobile-widget/step-confirmed";
import { StepDatetime } from "./mobile-widget/step-datetime";
import { StepDetails } from "./mobile-widget/step-details";
import { StepServices } from "./mobile-widget/step-services";
import { StepSpecialist } from "./mobile-widget/step-specialist";

export function DesktopEmbed({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ width: "100%", maxWidth: 880, background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 10, overflow: "hidden", boxShadow: "0 12px 32px rgba(10,10,14,0.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: 560 }}>
        <div style={{ borderRight: "1px solid #E6E8EB", padding: 20, display: "flex", flexDirection: "column", gap: 16, background: "#FAFBFC" }}>
          <div
            style={{
              height: 74,
              borderRadius: 8,
              background: `repeating-linear-gradient(135deg, ${COVER_A} 0 8px, ${COVER_B} 8px 16px)`,
              display: "flex",
              alignItems: "flex-end",
              padding: "8px 10px",
            }}
          >
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)" }}>{flow.biz.initial}</span>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{flow.biz.name}</span>
              <span style={{ fontSize: 12.5, color: "#5B6069" }}>{flow.biz.address}</span>
              <span style={{ fontSize: 12.5 }}>
                <span style={{ color: "#8A6A05", fontWeight: 600 }}>★ 4.9</span> <span style={{ color: "#8A9099" }}>· 218 reviews · till 22:00</span>
              </span>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #E6E8EB", paddingTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>Your booking</span>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.015em" }}>{flow.cartTotal}</span>
            <span style={{ fontSize: 12.5, color: "#8A9099" }}>{flow.cartMeta}</span>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {flow.indicator.map((s) => (
                <span key={s.n} style={{ flex: 1, height: 3, borderRadius: 2, background: s.bg }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "#8A9099" }}>
              STEP {flow.stepNum}/5 · {flow.stepTitle.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ padding: "22px 24px 0" }}>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.024em" }}>{flow.stepTitle}</span>
          </div>

          <div style={{ flex: "1 1 auto", overflowY: "auto", padding: "18px 24px 0", maxWidth: 480 }}>
            {flow.isStep1 && <StepServices flow={flow} />}
            {flow.isStep2 && <StepSpecialist flow={flow} />}
            {flow.isStep3 && <StepDatetime flow={flow} />}
            {flow.isStep4 && <StepDetails flow={flow} />}
            {flow.isStep5 && <StepConfirmed flow={flow} />}
          </div>

          <div style={{ maxWidth: 480, width: "100%" }}>
            <BottomBar flow={flow} />
          </div>
          <span style={{ padding: "0 24px 16px", fontSize: 11.5, color: "#A9AEB6" }}>Powered by Zhamo</span>
        </div>
      </div>
    </div>
  );
}
