"use client";

import { useState } from "react";
import {
  useCancelPublicBookingMutation,
  usePublicBookingQuery,
  useReschedulePublicBookingMutation,
} from "@/shared/api/scheduling/public-queries";
import { ApiError } from "@/shared/api/http";

function formatMinor(priceMinor: string, currencyCode: string): string {
  return `${(Number(priceMinor) / 100).toLocaleString()} ${currencyCode}`;
}

export function ManageBookingScreen({ token }: { token: string }) {
  const bookingQuery = usePublicBookingQuery(token);
  const cancelMutation = useCancelPublicBookingMutation(token);
  const rescheduleMutation = useReschedulePublicBookingMutation(token);
  const [newStartsAt, setNewStartsAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  const wrapperStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background: "#F5F6F8",
  };
  const cardStyle: React.CSSProperties = {
    width: "min(440px, 100%)",
    background: "#FFFFFF",
    border: "1px solid #E6E8EB",
    borderRadius: 12,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  };

  if (bookingQuery.isPending) {
    return (
      <div style={wrapperStyle}>
        <p style={{ fontSize: 13, color: "#8A9099" }}>Loading your booking…</p>
      </div>
    );
  }
  if (bookingQuery.isError) {
    return (
      <div style={wrapperStyle}>
        <div style={cardStyle}>
          <p style={{ fontSize: 13, color: "#C7302F", margin: 0 }}>
            {bookingQuery.error instanceof ApiError
              ? bookingQuery.error.message
              : "This booking link is invalid or has expired."}
          </p>
        </div>
      </div>
    );
  }

  const { booking, items } = bookingQuery.data;
  const canManage = [
    "held",
    "pending_payment",
    "pending_confirmation",
    "confirmed",
  ].includes(booking.status);

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#A9AEB6",
          }}
        >
          Booking {booking.bookingNumber}
        </span>
        <span style={{ fontSize: 15, fontWeight: 700 }}>
          Status: {booking.status.replace(/_/g, " ")}
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13.5,
                borderBottom: "1px solid #EEF0F2",
                paddingBottom: 6,
              }}
            >
              <span>
                {item.variantNameSnapshot
                  ? `${item.serviceNameSnapshot} — ${item.variantNameSnapshot}`
                  : item.serviceNameSnapshot}
              </span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)" }}>
                {formatMinor(item.lineTotalMinor, item.currencyCode)}
              </span>
            </div>
          ))}
        </div>

        {error && (
          <p style={{ fontSize: 12.5, color: "#C7302F", margin: 0 }}>{error}</p>
        )}

        {canManage && (
          <>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>
                Reschedule to
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="datetime-local"
                  value={newStartsAt}
                  onChange={(e) => setNewStartsAt(e.target.value)}
                  style={{
                    flex: 1,
                    height: 36,
                    padding: "0 10px",
                    border: "1px solid #D5D9DE",
                    borderRadius: 6,
                    fontFamily: "inherit",
                    fontSize: 13,
                  }}
                />
                <button
                  disabled={!newStartsAt || rescheduleMutation.isPending}
                  onClick={() => {
                    setError(null);
                    rescheduleMutation
                      .mutateAsync({
                        newStartsAt: new Date(newStartsAt).toISOString(),
                      })
                      .catch((err) =>
                        setError(
                          err instanceof ApiError
                            ? err.message
                            : "Couldn't reschedule.",
                        ),
                      );
                  }}
                  style={{
                    height: 36,
                    padding: "0 14px",
                    border: "1px solid #D5D9DE",
                    borderRadius: 6,
                    background: "#FFFFFF",
                    fontFamily: "inherit",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {rescheduleMutation.isPending ? "Moving…" : "Move"}
                </button>
              </div>
            </label>
            <button
              disabled={cancelMutation.isPending}
              onClick={() => {
                setError(null);
                cancelMutation
                  .mutateAsync(undefined)
                  .catch((err) =>
                    setError(
                      err instanceof ApiError
                        ? err.message
                        : "Couldn't cancel.",
                    ),
                  );
              }}
              style={{
                height: 40,
                border: "1px solid #F3C7C7",
                borderRadius: 6,
                background: "#FFF5F5",
                color: "#C7302F",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {cancelMutation.isPending ? "Canceling…" : "Cancel booking"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
