"use client";

import { useState } from "react";
import { buildBrandingViewModel, initialBrandingState, type BrandingSections } from "./lib/build-view-model";
import type { TemplateId } from "./model/template-catalog";
import { AppNav } from "./ui/app-nav";
import { CatalogueSection } from "./ui/catalogue-section";
import { EditorPanel } from "./ui/editor-panel";
import { LivePreview } from "./ui/live-preview";
import { TemplateList } from "./ui/template-list";
import { TopBar } from "./ui/top-bar";

export function BrandingBuilderScreen() {
  const [state, setState] = useState(initialBrandingState);
  const vals = buildBrandingViewModel(state);

  const pickTemplate = (id: TemplateId) => setState((p) => ({ ...p, template: id, published: false }));
  const pickDevice = (device: "desktop" | "phone") => setState((p) => ({ ...p, device }));
  const publish = () => setState((p) => ({ ...p, published: !p.published }));
  const pickAccent = (hex: string) => setState((p) => ({ ...p, accent: hex, published: false }));
  const toggleSection = (key: keyof BrandingSections) =>
    setState((p) => ({ ...p, sections: { ...p.sections, [key]: !p.sections[key] } }));

  return (
    <div>
      <div data-screen-label="Branding page builder" style={{ display: "flex", height: "100vh", minHeight: 840, overflow: "hidden" }}>
        <AppNav accent={vals.accent} />
        <main style={{ flex: "1 1 auto", minWidth: 0, overflowX: "auto", display: "flex", flexDirection: "column", background: "#F5F6F8" }}>
          <TopBar vals={vals} onPickDevice={pickDevice} onPublish={publish} />
          <div style={{ flex: "1 1 auto", minHeight: 0, display: "grid", gridTemplateColumns: "268px minmax(440px, 1fr) 316px", minWidth: 1024 }}>
            <TemplateList selectedTemplate={state.template} accent={vals.accent} onPick={pickTemplate} />
            <LivePreview vals={vals} />
            <EditorPanel vals={vals} onPickAccent={pickAccent} onToggleSection={toggleSection} />
          </div>
        </main>
      </div>

      <CatalogueSection accent={vals.accent} />
    </div>
  );
}
