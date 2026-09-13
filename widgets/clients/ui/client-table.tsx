"use client";

import { useQueries } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { clientKeys } from "@/shared/api/clients/queries";
import type { Client, ClientContact } from "@/shared/api/clients/types";
import { unwrap } from "@/shared/api/http";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

function primaryContact(
  contacts: ClientContact[] | undefined,
  type: ClientContact["type"],
) {
  if (!contacts) return undefined;
  const matches = contacts.filter((contact) => contact.type === type);
  return (matches.find((contact) => contact.isPrimary) ?? matches[0])
    ?.valueDisplay;
}

const GRID_COLUMNS = "1.8fr 1.1fr 1.4fr 0.8fr 0.9fr";

export function ClientTable({
  clients,
  onOpenPanel,
  onSelectClient,
}: {
  clients: Client[];
  onOpenPanel: () => void;
  onSelectClient: (client: Client) => void;
}) {
  const contactQueries = useQueries({
    queries: clients.map((client) => ({
      queryKey: clientKeys.contacts(client.id),
      queryFn: () =>
        unwrap<ClientContact[]>(apiClient.get(`clients/${client.id}/contacts`)),
    })),
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-zhamo-display)",
            fontSize: "clamp(24px, 5vw, 34px)",
            lineHeight: 1.05,
            letterSpacing: "-0.022em",
            fontWeight: 700,
          }}
        >
          Client base
        </h1>
        <button
          onClick={onOpenPanel}
          className="zhamo-teamclients-primary-btn"
          style={{
            height: 32,
            padding: "0 14px",
            border: 0,
            borderRadius: 6,
            background: "#FFC935",
            color: "#17170F",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add client
        </button>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="zhamo-table-scroll" style={{ overflowX: "auto" }}>
          <div
            className="zhamo-table-head"
            style={{
              display: "grid",
              gridTemplateColumns: GRID_COLUMNS,
              minWidth: 640,
              height: 34,
              alignItems: "center",
              padding: "0 16px",
              gap: 8,
              background: "#FAFBFC",
              borderBottom: "1px solid #E6E8EB",
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#8A9099",
            }}
          >
            <span>Name</span>
            <span>Phone</span>
            <span>Email</span>
            <span>Status</span>
            <span>Added</span>
          </div>

          {clients.map((client, index) => {
            const contactsQuery = contactQueries[index];
            const phone = primaryContact(contactsQuery.data, "phone");
            const email = primaryContact(contactsQuery.data, "email");
            const placeholder = contactsQuery.isPending ? "…" : "—";

            return (
              <div
                key={client.id}
                onClick={() => onSelectClient(client)}
                className="zhamo-teamclients-row zhamo-table-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLUMNS,
                  minWidth: 640,
                  alignItems: "center",
                  padding: "8px 16px",
                  gap: 8,
                  borderBottom: "1px solid #EEF0F2",
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                <span
                  data-label="Name"
                  className="zhamo-table-cell"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      flex: "0 0 auto",
                      borderRadius: "50%",
                      background: "#8A9099",
                      color: "#FFFFFF",
                      fontSize: 9.5,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {initialsOf(client.displayName)}
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {client.displayName}
                  </span>
                  {client.importance === "vip" ? (
                    <span
                      style={{
                        height: 18,
                        padding: "0 6px",
                        borderRadius: 5,
                        background: "#FEF6E0",
                        color: "#8A6A05",
                        fontSize: 10,
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        flex: "0 0 auto",
                      }}
                    >
                      VIP
                    </span>
                  ) : null}
                </span>
                <span
                  data-label="Phone"
                  className="zhamo-table-cell"
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 11.5,
                    color: "#5B6069",
                  }}
                >
                  {phone ?? placeholder}
                </span>
                <span
                  data-label="Email"
                  className="zhamo-table-cell"
                  style={{
                    color: "#5B6069",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {email ?? placeholder}
                </span>
                <span
                  data-label="Status"
                  className="zhamo-table-cell"
                  style={{ color: "#5B6069", textTransform: "capitalize" }}
                >
                  {client.status.replace("_", " ")}
                </span>
                <span
                  data-label="Added"
                  className="zhamo-table-cell"
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 11.5,
                    color: "#8A9099",
                  }}
                >
                  {dateFormatter.format(new Date(client.createdAt))}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            background: "#FAFBFC",
          }}
        >
          <span style={{ fontSize: 12.5, color: "#8A9099" }}>
            {clients.length} client{clients.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>
      <style>{`
        .zhamo-teamclients-primary-btn:hover { background: #F0B81F; }
        .zhamo-teamclients-row:hover { background: #FAFBFC; }
      `}</style>
    </div>
  );
}
