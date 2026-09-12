"use client";

import { useState } from "react";
import {
  useAssignClientTagMutation,
  useClientAddressesQuery,
  useClientConsentsQuery,
  useClientContactsQuery,
  useClientNotesQuery,
  useClientTagsQuery,
  useCreateClientAddressMutation,
  useCreateClientConsentMutation,
  useCreateClientContactMutation,
  useCreateClientNoteMutation,
  useTagsQuery,
  useUnassignClientTagMutation,
  useUpdateClientMutation,
} from "@/shared/api/clients/queries";
import type {
  Client,
  ClientConsentStatus,
  ClientContactType,
} from "@/shared/api/clients/types";

const inputStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};

const sectionHeadingStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-zhamo-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8A9099",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function ContactsSection({ clientId }: { clientId: string }) {
  const contactsQuery = useClientContactsQuery(clientId);
  const createContact = useCreateClientContactMutation(clientId);
  const [type, setType] = useState<ClientContactType>("phone");
  const [value, setValue] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    createContact.mutate(
      {
        type,
        valueDisplay: value,
        valueNormalized:
          type === "phone"
            ? value.replace(/[^\d+]/g, "")
            : value.trim().toLowerCase(),
        isPrimary,
      },
      {
        onSuccess: () => {
          setValue("");
          setIsPrimary(false);
        },
      },
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Contacts</h3>

      {contactsQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : contactsQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {contactsQuery.error.message}
        </p>
      ) : contactsQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No contacts yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {contactsQuery.data.map((contact) => (
            <div
              key={contact.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                border: "1px solid #EEF0F2",
                borderRadius: 6,
                fontSize: 12.5,
              }}
            >
              <span
                style={{
                  textTransform: "capitalize",
                  color: "#8A9099",
                  width: 48,
                  flex: "0 0 auto",
                }}
              >
                {contact.type}
              </span>
              <span
                style={{
                  flex: "1 1 auto",
                  fontFamily: "var(--font-zhamo-mono)",
                }}
              >
                {contact.valueDisplay}
              </span>
              {contact.isPrimary ? (
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
                  }}
                >
                  Primary
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <select
          value={type}
          onChange={(event) => setType(event.target.value as ClientContactType)}
          style={{ ...inputStyle, cursor: "pointer", flex: "0 0 auto" }}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </select>
        <input
          required
          placeholder={
            type === "phone" ? "+374 77 000 000" : "name@example.com"
          }
          value={value}
          onChange={(event) => setValue(event.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11.5,
            color: "#5B6069",
            flex: "0 0 auto",
          }}
        >
          <input
            type="checkbox"
            checked={isPrimary}
            onChange={(event) => setIsPrimary(event.target.checked)}
          />
          Primary
        </label>
        <button
          type="submit"
          disabled={createContact.isPending}
          style={{
            height: 32,
            padding: "0 12px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            background: "#FFFFFF",
            fontFamily: "inherit",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
            flex: "0 0 auto",
          }}
        >
          {createContact.isPending ? "Adding…" : "Add"}
        </button>
      </form>
      {createContact.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {createContact.error.message}
        </p>
      ) : null}
    </div>
  );
}

function NotesSection({ clientId }: { clientId: string }) {
  const notesQuery = useClientNotesQuery(clientId);
  const createNote = useCreateClientNoteMutation(clientId);
  const [body, setBody] = useState("");

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    createNote.mutate(
      { body },
      {
        onSuccess: () => setBody(""),
      },
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Notes</h3>

      {notesQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : notesQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {notesQuery.error.message}
        </p>
      ) : notesQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No notes yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {notesQuery.data.map((note) => (
            <div
              key={note.id}
              style={{
                padding: "8px 10px",
                border: "1px solid #EEF0F2",
                borderRadius: 6,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 12.5, whiteSpace: "pre-wrap" }}>
                {note.body}
              </span>
              <span style={{ fontSize: 10.5, color: "#8A9099" }}>
                {dateFormatter.format(new Date(note.createdAt))}
              </span>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <textarea
          required
          placeholder="Anything the team should know…"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          style={{
            minHeight: 56,
            padding: "8px 10px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            fontFamily: "inherit",
            fontSize: 13,
            resize: "vertical",
          }}
        />
        <button
          type="submit"
          disabled={createNote.isPending}
          style={{
            alignSelf: "flex-start",
            height: 32,
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
          {createNote.isPending ? "Adding…" : "Add note"}
        </button>
      </form>
      {createNote.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {createNote.error.message}
        </p>
      ) : null}
    </div>
  );
}

function AddressesSection({ clientId }: { clientId: string }) {
  const addressesQuery = useClientAddressesQuery(clientId);
  const createAddress = useCreateClientAddressMutation(clientId);
  const [label, setLabel] = useState("Home");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!addressLine1.trim()) return;
    createAddress.mutate(
      { label, addressLine1, city: city || undefined },
      {
        onSuccess: () => {
          setAddressLine1("");
          setCity("");
        },
      },
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Addresses</h3>

      {addressesQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : addressesQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {addressesQuery.error.message}
        </p>
      ) : addressesQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No addresses on file.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {addressesQuery.data.map((address) => (
            <div
              key={address.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: "8px 10px",
                border: "1px solid #EEF0F2",
                borderRadius: 6,
                fontSize: 12.5,
              }}
            >
              <span style={{ fontWeight: 600 }}>{address.label}</span>
              <span style={{ fontSize: 11, color: "#8A9099" }}>
                {[address.addressLine1, address.city]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <input
            placeholder="Label (e.g. Home)"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="City (optional)"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            style={inputStyle}
          />
        </div>
        <input
          required
          placeholder="Address line 1"
          value={addressLine1}
          onChange={(event) => setAddressLine1(event.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={createAddress.isPending || !addressLine1.trim()}
          style={{
            alignSelf: "flex-start",
            height: 32,
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
          {createAddress.isPending ? "Adding…" : "Add address"}
        </button>
      </form>
      {createAddress.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {createAddress.error.message}
        </p>
      ) : null}
    </div>
  );
}

const CONSENT_STATUSES: ClientConsentStatus[] = [
  "granted",
  "denied",
  "withdrawn",
];

function ConsentsSection({ clientId }: { clientId: string }) {
  const consentsQuery = useClientConsentsQuery(clientId);
  const createConsent = useCreateClientConsentMutation(clientId);
  const [purpose, setPurpose] = useState("marketing");
  const [status, setStatus] = useState<ClientConsentStatus>("granted");

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!purpose.trim()) return;
    createConsent.mutate({
      purpose,
      status,
      policyVersion: 1,
      capturedVia: "staff_manual_entry",
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Consents</h3>

      {consentsQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : consentsQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {consentsQuery.error.message}
        </p>
      ) : consentsQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No consent records yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {consentsQuery.data.map((consent) => (
            <div
              key={consent.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                border: "1px solid #EEF0F2",
                borderRadius: 6,
                fontSize: 12.5,
              }}
            >
              <span style={{ fontWeight: 600 }}>{consent.purpose}</span>
              <span style={{ fontSize: 11, color: "#8A9099" }}>
                {consent.status}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 11,
                  color: "#8A9099",
                  fontFamily: "var(--font-zhamo-mono)",
                }}
              >
                {dateFormatter.format(new Date(consent.capturedAt))}
              </span>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
      >
        <input
          required
          placeholder="Purpose (e.g. marketing)"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          style={inputStyle}
        />
        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ClientConsentStatus)
          }
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          {CONSENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={createConsent.isPending || !purpose.trim()}
          style={{
            gridColumn: "1 / -1",
            alignSelf: "flex-start",
            height: 32,
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
          {createConsent.isPending ? "Recording…" : "Record consent"}
        </button>
      </form>
      {createConsent.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {createConsent.error.message}
        </p>
      ) : null}
    </div>
  );
}

function TagsSection({ clientId }: { clientId: string }) {
  const clientTagsQuery = useClientTagsQuery(clientId);
  const allTagsQuery = useTagsQuery();
  const assignTag = useAssignClientTagMutation(clientId);
  const unassignTag = useUnassignClientTagMutation(clientId);
  const [tagId, setTagId] = useState("");

  const assignedIds = new Set((clientTagsQuery.data ?? []).map((t) => t.id));
  const availableTags = (allTagsQuery.data ?? []).filter(
    (t) => !assignedIds.has(t.id),
  );
  const selectedTagId = tagId || availableTags[0]?.id || "";

  function handleAssign(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedTagId) return;
    assignTag.mutate(
      { tagId: selectedTagId },
      { onSuccess: () => setTagId("") },
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Tags</h3>

      {clientTagsQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : clientTagsQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {clientTagsQuery.error.message}
        </p>
      ) : clientTagsQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No tags assigned.
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {clientTagsQuery.data.map((tag) => (
            <span
              key={tag.id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 8px",
                border: "1px solid #EEF0F2",
                borderRadius: 999,
                fontSize: 12,
              }}
            >
              {tag.name}
              <button
                type="button"
                onClick={() => unassignTag.mutate(tag.id)}
                disabled={unassignTag.isPending}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#8A9099",
                  fontSize: 11,
                  padding: 0,
                }}
                aria-label={`Remove tag ${tag.name}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {availableTags.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12, color: "#8A9099" }}>
          {(allTagsQuery.data?.length ?? 0) === 0
            ? "No tags exist yet for this business."
            : "Every tag is already assigned."}
        </p>
      ) : (
        <form onSubmit={handleAssign} style={{ display: "flex", gap: 8 }}>
          <select
            value={selectedTagId}
            onChange={(event) => setTagId(event.target.value)}
            style={{ ...inputStyle, flex: 1, cursor: "pointer" }}
          >
            {availableTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={assignTag.isPending}
            style={{
              height: 32,
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
            {assignTag.isPending ? "Adding…" : "Assign"}
          </button>
        </form>
      )}
      {assignTag.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {assignTag.error.message}
        </p>
      ) : null}
    </div>
  );
}

function VipToggle({ client }: { client: Client }) {
  const updateClient = useUpdateClientMutation(client.id);
  const isVip = client.importance === "vip";

  return (
    <button
      type="button"
      onClick={() =>
        updateClient.mutate({ importance: isVip ? "regular" : "vip" })
      }
      disabled={updateClient.isPending}
      title={isVip ? "Remove VIP status" : "Mark as VIP"}
      style={{
        height: 24,
        padding: "0 8px",
        border: "1px solid #E6E8EB",
        borderRadius: 5,
        background: isVip ? "#FEF6E0" : "#FFFFFF",
        color: isVip ? "#8A6A05" : "#8A9099",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {isVip ? "★ VIP" : "☆ Mark VIP"}
    </button>
  );
}

export function ClientDetailPanel({
  client,
  onClose,
}: {
  client: Client | null;
  onClose: () => void;
}) {
  if (!client) return null;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,20,26,0.42)",
          zIndex: 15,
        }}
        onClick={onClose}
      />
      <section
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 460,
          maxWidth: "100%",
          background: "#FFFFFF",
          borderLeft: "1px solid #E6E8EB",
          boxShadow: "-20px 0 60px rgba(10,10,14,0.22)",
          zIndex: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            flex: "0 0 auto",
            borderBottom: "1px solid #E6E8EB",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-zhamo-display)",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "-0.016em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {client.displayName}
            </span>
            <span
              style={{
                fontSize: 11.5,
                color: "#8A9099",
                textTransform: "capitalize",
              }}
            >
              {client.status.replace("_", " ")}
            </span>
          </div>
          <VipToggle client={client} />
          <span
            onClick={onClose}
            style={{
              marginLeft: 8,
              width: 28,
              height: 28,
              flex: "0 0 auto",
              borderRadius: 6,
              border: "1px solid #E6E8EB",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#5B6069",
              cursor: "pointer",
            }}
          >
            ✕
          </span>
        </header>

        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: 18,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <ContactsSection clientId={client.id} />
          <AddressesSection clientId={client.id} />
          <NotesSection clientId={client.id} />
          <ConsentsSection clientId={client.id} />
          <TagsSection clientId={client.id} />
        </div>
      </section>
    </>
  );
}
