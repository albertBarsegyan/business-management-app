import { galleryTiles } from "../../model/static-content";
import type { BrandingViewModel } from "../../lib/build-view-model";

export function PreviewGallery({ vals }: { vals: BrandingViewModel }) {
  if (!vals.galleryFirst) return null;
  return (
    <div style={{ padding: "0 16px 16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
      {galleryTiles.map((g, i) => (
        <span key={i} style={{ aspectRatio: "1 / 1", borderRadius: 7, background: g.bg, display: "flex", alignItems: "flex-end", padding: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 8.5, color: "rgba(255,255,255,0.8)" }}>
          {g.label}
        </span>
      ))}
    </div>
  );
}
