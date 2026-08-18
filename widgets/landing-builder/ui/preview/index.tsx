import type { LandingBuilderState } from "../../model/use-landing-builder";
import { PreviewFinalCta } from "./preview-final-cta";
import { PreviewFooter } from "./preview-footer";
import { PreviewHero } from "./preview-hero";
import { PreviewNavbar } from "./preview-navbar";
import { PreviewSection } from "./preview-section";

export function LivePreview({ state }: { state: LandingBuilderState }) {
  const deviceLabel = (state.device === "phone" ? "390 px" : "1280 px") + (state.scale < 0.995 ? ` at ${Math.round(state.scale * 100)}%` : "");
  const frameWidth = state.device === "phone" ? "390px" : "1280px";
  const frameRadius = state.device === "phone" ? "18px" : "10px";
  const frameTransform = state.scale ? `scale(${state.scale})` : "none";
  const wrapHeight = state.frameH ? `${Math.ceil(state.frameH)}px` : "auto";

  return (
    <div style={{ minWidth: 0, overflowY: "auto", background: "#EDEFF2", padding: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, alignSelf: "stretch" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
          Live preview · {deviceLabel} · {state.enabledCount} sections
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11.5, color: "#8A9099" }}>Click any section to edit it</span>
      </div>

      <div ref={state.wrapRef} style={{ width: "100%", alignSelf: "stretch", flex: "0 0 auto", overflow: "hidden", position: "relative", height: wrapHeight }}>
        <div
          ref={state.frameRef}
          style={{
            width: frameWidth,
            flex: "0 0 auto",
            transform: frameTransform,
            transformOrigin: "top left",
            borderRadius: frameRadius,
            overflow: "hidden",
            border: "1px solid #DDE0E4",
            background: state.pageBg,
            boxShadow: "0 12px 40px rgba(20,20,26,0.12)",
          }}
        >
          <PreviewNavbar state={state} />
          <PreviewHero state={state} />
          {state.renderedSections.map((sec) => (
            <PreviewSection key={sec.key} sec={sec} accent={state.accent} coverBg={state.coverBg} />
          ))}
          <PreviewFinalCta gutter={state.gutter} dark={state.dark} />
          <PreviewFooter state={state} />
        </div>
      </div>
    </div>
  );
}
