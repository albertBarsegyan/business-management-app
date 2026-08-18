import type { BrandingViewModel } from "../lib/build-view-model";
import { PreviewGallery } from "./preview-sections/preview-gallery";
import { PreviewHeader } from "./preview-sections/preview-header";
import { PreviewHoursAndFooter } from "./preview-sections/preview-hours-and-footer";
import { PreviewServices } from "./preview-sections/preview-services";
import { PreviewTeamAndReview } from "./preview-sections/preview-team-and-review";

export function LivePreview({ vals }: { vals: BrandingViewModel }) {
  return (
    <div style={{ minWidth: 0, overflowY: "auto", background: "#EDEFF2", padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, alignSelf: "stretch" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
          Live preview · {vals.templateName} · {vals.deviceLabel}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11.5, color: "#8A9099" }}>Real page, real content — nothing here is a mockup.</span>
      </div>

      <div style={{ width: vals.frameWidth, maxWidth: "100%", flex: "0 0 auto", borderRadius: vals.frameRadius, overflow: "hidden", border: "1px solid #DDE0E4", background: vals.pageBg, boxShadow: "0 12px 40px rgba(20,20,26,0.12)" }}>
        <PreviewHeader vals={vals} />
        <PreviewGallery vals={vals} />
        <PreviewServices vals={vals} />
        <PreviewTeamAndReview vals={vals} />
        <PreviewHoursAndFooter vals={vals} />
      </div>
    </div>
  );
}
