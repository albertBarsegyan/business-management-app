export function StepFooter({
  canGoBack,
  primaryLabel,
  onBack,
  onNext,
}: {
  canGoBack: boolean;
  primaryLabel: string;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div style={{ marginTop: "auto", paddingTop: 22, display: "flex", alignItems: "center", gap: 10 }}>
      {canGoBack && (
        <button
          onClick={onBack}
          className="zhamo-setup-tile"
          style={{ height: 36, padding: "0 15px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
        className="zhamo-setup-primary"
        style={{ height: 36, padding: "0 18px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
      >
        {primaryLabel}
      </button>
      <span style={{ marginLeft: "auto", fontSize: 11.5, color: "#A9AEB6" }}>You can change all of this later in settings.</span>
      <style>{`
        .zhamo-setup-tile:hover { border-color: #16161A; }
        .zhamo-setup-primary:hover { background: #F0B81F; }
      `}</style>
    </div>
  );
}
