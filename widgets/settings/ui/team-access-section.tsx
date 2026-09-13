"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSessionUser } from "@/entities/session/ui/session-provider";
import { ApiError } from "@/shared/api/http";
import {
  useInviteMembershipMutation,
  useMembershipsQuery,
} from "@/shared/api/venues/queries";
import { INVITABLE_ROLES } from "@/shared/api/venues/types";
import { getInitials } from "@/shared/lib/get-initials";
import { Button } from "@/shared/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const SECTION_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-zhamo-mono)",
  fontSize: 10.5,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8A9099",
};

/**
 * Team access — who can sign in to this venue's dashboard, distinct from
 * "Team working hours" above (`TeamMember` scheduling rows, no login
 * required). Backed by `POST/GET /venues/memberships` (built after the
 * Phase 7 final report flagged there was no way to add staff beyond the
 * single owner created at onboarding).
 */
export function TeamAccessSection() {
  const user = useSessionUser();
  const canManage = user.permissions.includes("venue.manage");

  const membershipsQuery = useMembershipsQuery();
  const inviteMutation = useInviteMembershipMutation();

  const [email, setEmail] = useState("");
  const [roleCode, setRoleCode] = useState(INVITABLE_ROLES[0].code);

  if (!canManage) {
    return (
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span style={SECTION_LABEL_STYLE}>Team access</span>
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Only owners and managers can view and manage who has access to this
          dashboard.
        </p>
      </div>
    );
  }

  function handleInvite(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    inviteMutation.mutate(
      { email: email.trim(), roleCode },
      {
        onSuccess: (membership) => {
          toast.success(`${membership.displayName} now has access.`);
          setEmail("");
        },
        onError: (error) => {
          toast.error(
            error instanceof ApiError
              ? error.message
              : "Couldn't add that person.",
          );
        },
      },
    );
  }

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E6E8EB",
        borderRadius: 8,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <span style={SECTION_LABEL_STYLE}>Team access</span>
      <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
        Add someone who already has a Zhamo account — there&apos;s no way to
        email an invite yet, so they need to have signed up first.
      </p>

      <form
        onSubmit={handleInvite}
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <FieldGroup style={{ flex: "1 1 220px" }}>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <FieldGroup style={{ flex: "0 0 180px" }}>
          <Field>
            <FieldLabel>Role</FieldLabel>
            <Select value={roleCode} onValueChange={setRoleCode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INVITABLE_ROLES.map((role) => (
                  <SelectItem key={role.code} value={role.code}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <Button type="submit" disabled={inviteMutation.isPending}>
          {inviteMutation.isPending ? "Adding…" : "Add to team"}
        </Button>
      </form>

      {membershipsQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Loading team access…
        </p>
      ) : membershipsQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {membershipsQuery.error.message}
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {membershipsQuery.data.map((membership) => (
            <div
              key={membership.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                border: "1px solid #EEF0F2",
                borderRadius: 6,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#F0B81F22",
                  color: "#8A6A05",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {getInitials(membership.displayName)}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  {membership.displayName}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "#8A9099",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {membership.email ?? "—"}
                </span>
              </div>
              <span style={{ fontSize: 11.5, color: "#5B6069" }}>
                {membership.roles.map((role) => role.name).join(", ") || "—"}
              </span>
              {membership.status !== "active" && (
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: "#F5F6F8",
                    color: "#8A9099",
                  }}
                >
                  {membership.status}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
