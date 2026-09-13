"use client";

import {
  useLocationSettingsQuery,
  useUpsertLocationSettingMutation,
} from "@/shared/api/catalog/queries";
import { useLocationsQuery } from "@/shared/api/locations/queries";

const sectionHeadingStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-zhamo-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8A9099",
};

export interface LocationSettingsPanelTarget {
  serviceId: string;
  serviceName: string;
  variantId: string;
}

function Toggle({
  on,
  disabled,
  onClick,
}: {
  on: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <span
      onClick={disabled ? undefined : onClick}
      style={{
        width: 34,
        height: 20,
        flex: "0 0 auto",
        borderRadius: 10,
        background: on ? "#16161A" : "#D5D9DE",
        position: "relative",
        display: "inline-block",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 0.15s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 16 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#FFFFFF",
          transition: "left 0.15s ease",
        }}
      />
    </span>
  );
}

function LocationSettingsList({ variantId }: { variantId: string }) {
  const locationsQuery = useLocationsQuery();
  const settingsQuery = useLocationSettingsQuery(variantId);
  const upsert = useUpsertLocationSettingMutation(variantId);
  const pendingLocationId = upsert.isPending
    ? upsert.variables?.locationId
    : undefined;

  if (locationsQuery.isPending || settingsQuery.isPending) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
    );
  }
  if (locationsQuery.isError) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
        {locationsQuery.error.message}
      </p>
    );
  }
  if (settingsQuery.isError) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
        {settingsQuery.error.message}
      </p>
    );
  }
  if (locationsQuery.data.length === 0) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
        No locations yet.
      </p>
    );
  }

  const settingByLocationId = new Map(
    settingsQuery.data.map((setting) => [setting.locationId, setting]),
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {locationsQuery.data.map((location) => {
        // No setting row means the defaults apply, both true.
        const setting = settingByLocationId.get(location.id);
        const enabled = setting?.enabled ?? true;
        const onlineBookable = setting?.onlineBookable ?? true;
        const isPendingRow = pendingLocationId === location.id;

        return (
          <div
            key={location.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 10px",
              border: "1px solid #EEF0F2",
              borderRadius: 6,
            }}
          >
            <span
              style={{
                flex: "1 1 auto",
                minWidth: 0,
                fontSize: 12.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {location.name}
            </span>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "#8A9099",
              }}
            >
              Enabled
              <Toggle
                on={enabled}
                disabled={isPendingRow}
                onClick={() =>
                  upsert.mutate({
                    locationId: location.id,
                    body: { enabled: !enabled },
                  })
                }
              />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "#8A9099",
              }}
            >
              Online
              <Toggle
                on={onlineBookable}
                disabled={isPendingRow}
                onClick={() =>
                  upsert.mutate({
                    locationId: location.id,
                    body: { onlineBookable: !onlineBookable },
                  })
                }
              />
            </label>
          </div>
        );
      })}
      {upsert.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {upsert.error.message}
        </p>
      ) : null}
    </div>
  );
}

export function LocationSettingsPanel({
  target,
  onClose,
}: {
  target: LocationSettingsPanelTarget | null;
  onClose: () => void;
}) {
  if (!target) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20,20,26,0.42)",
          zIndex: 15,
        }}
        onClick={onClose}
      />
      <section
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 420,
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
              Locations
            </span>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>
              {target.serviceName}
            </span>
          </div>
          <span
            onClick={onClose}
            style={{
              marginLeft: "auto",
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
            gap: 10,
          }}
        >
          <h3 style={sectionHeadingStyle}>Where this service is offered</h3>
          <LocationSettingsList variantId={target.variantId} />
        </div>
      </section>
    </>
  );
}
