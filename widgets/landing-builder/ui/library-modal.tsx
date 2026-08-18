import type { LandingBuilderState } from "../model/use-landing-builder";

export function LibraryModal({ state }: { state: LandingBuilderState }) {
  if (!state.libraryOpen) return null;

  return (
    <>
      <div onClick={state.closeLibrary} style={{ position: "absolute", inset: 0, background: "rgba(20,20,26,0.44)", zIndex: 20 }} />
      <section
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(880px, 92%)",
          maxHeight: "84%",
          background: "#FFFFFF",
          borderRadius: 12,
          boxShadow: "0 28px 72px rgba(10,10,14,0.36)",
          zIndex: 21,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <header style={{ padding: "18px 20px 14px", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 26, fontWeight: 700, letterSpacing: "-0.022em" }}>Add a section</span>
            <span style={{ fontSize: 12.5, color: "#5B6069" }}>Twelve blocks. Each one says what it needs before you add it.</span>
          </div>
          <span
            onClick={state.closeLibrary}
            style={{ marginLeft: "auto", width: 28, height: 28, borderRadius: 6, border: "1px solid #E6E8EB", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#5B6069", cursor: "pointer" }}
          >
            ✕
          </span>
        </header>
        <div style={{ flex: "1 1 auto", overflowY: "auto", padding: "16px 20px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(248px, 1fr))", gap: 10 }}>
          {state.library.map((l) => (
            <div
              key={l.key}
              onClick={l.added ? undefined : l.onAdd}
              className="zhamo-landing-library-card"
              style={{
                border: `1px solid ${l.added ? "#EEF0F2" : "#E6E8EB"}`,
                borderRadius: 9,
                padding: 13,
                display: "flex",
                flexDirection: "column",
                gap: 7,
                cursor: l.added ? "default" : "pointer",
                background: l.added ? "#FAFBFC" : "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 24, height: 24, borderRadius: 6, background: l.added ? "#EDEFF2" : "#16161A", color: l.added ? "#A9AEB6" : "#FFFFFF", fontFamily: "var(--font-zhamo-mono)", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {l.mono}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{l.name}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: l.added ? "#22C55E" : "#A9AEB6", fontWeight: 600 }}>{l.added ? "Added" : "Add"}</span>
              </div>
              <span style={{ fontSize: 12, lineHeight: 1.45, color: "#5B6069" }}>{l.body}</span>
              <span style={{ fontSize: 11, color: "#A9AEB6" }}>Needs: {l.needs}</span>
            </div>
          ))}
        </div>
      </section>
      <style>{`.zhamo-landing-library-card:hover { border-color: #16161A; }`}</style>
    </>
  );
}
