import { screenCards } from "./model/screens";
import { IndexHeader } from "./ui/index-header";
import { RoadmapNote } from "./ui/roadmap-note";
import { ScreenCardTile } from "./ui/screen-card";

export function ScreenIndex() {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 56px 120px", display: "flex", flexDirection: "column", alignItems: "center", background: "#14141A", color: "#FFFFFF" }}>
      <div style={{ width: "100%", maxWidth: 1080, display: "flex", flexDirection: "column", gap: 56 }}>
        <IndexHeader />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
          {screenCards.map((c) => (
            <ScreenCardTile key={c.n} c={c} />
          ))}
        </div>
        <RoadmapNote />
      </div>
    </div>
  );
}
