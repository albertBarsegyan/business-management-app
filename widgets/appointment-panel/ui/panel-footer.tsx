export function PanelFooter({
  title,
  meta,
  isEdit,
  isConflict,
}: {
  title: string;
  meta: string;
  isEdit: boolean;
  isConflict: boolean;
}) {
  return (
    <footer className="zhamo-toolbar-scroll" style={{ flex: "0 0 auto", height: 62, background: "#FFFFFF", borderTop: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 12, padding: "0 18px" }}>
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</span>
        <span style={{ fontSize: 11.5, color: "#8A9099" }}>{meta}</span>
      </span>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        {isEdit && (
          <button className="zhamo-apptpanel-delete" style={{ height: 36, padding: "0 14px", border: "1px solid #F3C7C7", borderRadius: 6, background: "#FFF5F5", color: "#C7302F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Delete appointment
          </button>
        )}
        <button className="zhamo-apptpanel-cancel" style={{ height: 36, padding: "0 14px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Cancel
        </button>
        <button
          disabled={isConflict}
          style={{
            height: 36,
            padding: "0 18px",
            border: 0,
            borderRadius: 6,
            background: isConflict ? "#EDEFF2" : "#FFC935",
            color: isConflict ? "#A9AEB6" : "#17170F",
            fontFamily: "inherit",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: isConflict ? "not-allowed" : "pointer",
          }}
        >
          {isEdit ? "Save changes" : "Save appointment"}
        </button>
      </div>
      <style>{`
        .zhamo-apptpanel-delete:hover { background: #FFEAEA; }
        .zhamo-apptpanel-cancel:hover { border-color: #16161A; }
      `}</style>
    </footer>
  );
}
