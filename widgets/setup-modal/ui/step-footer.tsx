export function StepFooter({
  canGoBack,
  primaryLabel,
  onBack,
  onNext,
  disabled,
  errorMessage,
}: {
  canGoBack: boolean;
  primaryLabel: string;
  onBack: () => void;
  onNext: () => void;
  disabled?: boolean;
  errorMessage?: string | null;
}) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: 22,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {errorMessage ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {errorMessage}
        </p>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {canGoBack && (
          <button
            onClick={onBack}
            disabled={disabled}
            className="zhamo-setup-tile"
            style={{
              height: 36,
              padding: "0 15px",
              border: "1px solid #D5D9DE",
              borderRadius: 6,
              background: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              cursor: disabled ? "default" : "pointer",
              opacity: disabled ? 0.6 : 1,
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={disabled}
          className="zhamo-setup-primary"
          style={{
            height: 36,
            padding: "0 18px",
            border: 0,
            borderRadius: 6,
            background: "#FFC935",
            color: "#17170F",
            fontFamily: "inherit",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: disabled ? "default" : "pointer",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {primaryLabel}
        </button>
        <span style={{ marginLeft: "auto", fontSize: 11.5, color: "#A9AEB6" }}>
          You can change all of this later in settings.
        </span>
      </div>
      <style>{`
        .zhamo-setup-tile:hover { border-color: #16161A; }
        .zhamo-setup-primary:hover { background: #F0B81F; }
      `}</style>
    </div>
  );
}
