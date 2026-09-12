import type { AppointmentPanelState } from "../model/use-appointment-panel";

export function PanelFooter({ state }: { state: AppointmentPanelState }) {
  const saveDisabled = state.isEdit ? false : state.isSaving;

  return (
    <footer
      className="zhamo-toolbar-scroll"
      style={{
        flex: "0 0 auto",
        height: 62,
        background: "#FFFFFF",
        borderTop: "1px solid #E6E8EB",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 18px",
      }}
    >
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>
          {state.footerTitle}
        </span>
        <span style={{ fontSize: 11.5, color: "#8A9099" }}>
          {state.footerMeta}
        </span>
      </span>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {state.isEdit && (
          <button
            onClick={state.onIssueAccessToken}
            disabled={state.isIssuingAccessToken}
            style={{
              height: 36,
              padding: "0 14px",
              border: "1px solid #D5D9DE",
              borderRadius: 6,
              background: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              cursor: state.isIssuingAccessToken ? "default" : "pointer",
            }}
          >
            {state.isIssuingAccessToken
              ? "Creating link…"
              : "Share self-service link"}
          </button>
        )}
        {state.isEdit && (
          <button
            onClick={state.onCancelAppointment}
            disabled={state.isCanceling}
            className="zhamo-apptpanel-delete"
            style={{
              height: 36,
              padding: "0 14px",
              border: "1px solid #F3C7C7",
              borderRadius: 6,
              background: "#FFF5F5",
              color: "#C7302F",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              cursor: state.isCanceling ? "default" : "pointer",
            }}
          >
            {state.isCanceling ? "Canceling…" : "Cancel appointment"}
          </button>
        )}
        <button
          onClick={state.onClose}
          className="zhamo-apptpanel-cancel"
          style={{
            height: 36,
            padding: "0 14px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            background: "#FFFFFF",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Close
        </button>
        {!state.isEdit && (
          <button
            onClick={state.onSave}
            disabled={saveDisabled}
            style={{
              height: 36,
              padding: "0 18px",
              border: 0,
              borderRadius: 6,
              background: saveDisabled ? "#EDEFF2" : "#FFC935",
              color: saveDisabled ? "#A9AEB6" : "#17170F",
              fontFamily: "inherit",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: saveDisabled ? "not-allowed" : "pointer",
            }}
          >
            {state.isSaving ? "Saving…" : "Save appointment"}
          </button>
        )}
      </div>
      <style>{`
        .zhamo-apptpanel-delete:hover { background: #FFEAEA; }
        .zhamo-apptpanel-cancel:hover { border-color: #16161A; }
      `}</style>
    </footer>
  );
}
