"use client";

import { useEffect } from "react";
import { useAppointmentPanel } from "./model/use-appointment-panel";
import { CartColumn } from "./ui/cart-column";
import { ClientColumn } from "./ui/client-column";
import { ConflictBanner } from "./ui/conflict-banner";
import { PanelFooter } from "./ui/panel-footer";
import { PanelHeader } from "./ui/panel-header";
import { SavedToast } from "./ui/saved-toast";
import { TimingColumn } from "./ui/timing-column";

/**
 * A slide-over sidebar for viewing/editing one appointment (or creating a
 * new one when `appointmentId` is null). Meant to be mounted directly
 * inside a calendar screen, over the real page content — not routed to as
 * its own page.
 */
export function AppointmentSidebar({
  appointmentId,
  onClose,
  onAppointmentSaved,
}: {
  appointmentId: string | null;
  onClose: () => void;
  onAppointmentSaved?: (appointmentId: string) => void;
}) {
  const state = useAppointmentPanel({
    appointmentId,
    onRequestClose: onClose,
    onAppointmentSaved,
  });

  useEffect(() => {
    if (!state.toastMessage) return;
    const timer = setTimeout(() => state.clearToast(), 4000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.toastMessage]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      data-screen-label="Appointment panel"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,20,26,0.42)",
        }}
      />
      {state.toastMessage && <SavedToast message={state.toastMessage} />}

      <section
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(1180px, 92%)",
          background: "#F7F8FA",
          borderLeft: "1px solid #E6E8EB",
          boxShadow: "-20px 0 60px rgba(10,10,14,0.22)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {state.isLoading ? (
          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#8A9099",
            }}
          >
            Loading appointment…
          </div>
        ) : state.notFound ? (
          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#C7302F",
            }}
          >
            Appointment not found.
          </div>
        ) : (
          <>
            <PanelHeader state={state} />
            {state.conflictAlternatives && <ConflictBanner state={state} />}
            {state.formError && (
              <p
                style={{
                  margin: "10px 18px 0",
                  fontSize: 12.5,
                  color: "#C7302F",
                }}
              >
                {state.formError}
              </p>
            )}

            <div
              className="zhamo-grid-3"
              style={{
                flex: "1 1 auto",
                overflowY: "auto",
                padding: "14px 18px 18px",
                display: "grid",
                gridTemplateColumns: "1fr 1.15fr 1fr",
                gap: 14,
                alignItems: "start",
              }}
            >
              <TimingColumn state={state} />
              <CartColumn state={state} />
              <ClientColumn state={state} />
            </div>

            <PanelFooter state={state} />
          </>
        )}
      </section>
    </div>
  );
}
