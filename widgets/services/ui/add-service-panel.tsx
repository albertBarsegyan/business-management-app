"use client";

import { useState } from "react";
import {
  useCreateServiceCategoryMutation,
  useCreateServiceMutation,
} from "@/shared/api/catalog/queries";
import type { ServiceCategory } from "@/shared/api/catalog/types";
import { useVenueQuery } from "@/shared/api/venue/queries";

const NEW_CATEGORY = "__new__";

const inputStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "#5B6069",
};

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function emptyState() {
  return {
    name: "",
    categoryId: "",
    durationMinutes: "30",
    price: "",
    onlineBookable: true,
    requiresStaff: true,
  };
}

export function AddServicePanel({
  open,
  onClose,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  categories: ServiceCategory[];
}) {
  const [form, setForm] = useState(emptyState);
  const [newCategoryName, setNewCategoryName] = useState("");
  const createService = useCreateServiceMutation();
  const createCategory = useCreateServiceCategoryMutation();
  const venueQuery = useVenueQuery();
  const currencyCode = venueQuery.data?.baseCurrencyCode ?? "USD";

  if (!open) return null;

  function handleClose() {
    setForm(emptyState());
    setNewCategoryName("");
    createService.reset();
    createCategory.reset();
    onClose();
  }

  function handleCreateCategory() {
    createCategory.mutate(
      { name: newCategoryName },
      {
        onSuccess: (category) => {
          setForm((f) => ({ ...f, categoryId: category.id }));
          setNewCategoryName("");
        },
      },
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const priceMinor = Math.round(Number(form.price) * 100).toString();
    const categoryId =
      form.categoryId && form.categoryId !== NEW_CATEGORY
        ? form.categoryId
        : undefined;
    createService.mutate(
      {
        service: {
          name: form.name,
          slug: slugify(form.name),
          categoryId,
          onlineBookable: form.onlineBookable,
          requiresStaff: form.requiresStaff,
        },
        variant: {
          durationMinutes: Number(form.durationMinutes),
          priceMinor,
          currencyCode,
        },
      },
      { onSuccess: handleClose },
    );
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20,20,26,0.42)",
          zIndex: 15,
        }}
      />
      <section
        style={{
          position: "fixed",
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
          animation: "zhamo-services-in 0.22s ease both",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            minHeight: 0,
          }}
        >
          <header
            style={{
              height: 52,
              flex: "0 0 auto",
              borderBottom: "1px solid #E6E8EB",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-zhamo-display)",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.018em",
              }}
            >
              Add service
            </span>
            <span
              onClick={handleClose}
              style={{
                marginLeft: "auto",
                width: 28,
                height: 28,
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
              gap: 14,
            }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Name</span>
              <input
                required
                placeholder="Balayage"
                value={form.name}
                onChange={(event) =>
                  setForm((f) => ({ ...f, name: event.target.value }))
                }
                style={inputStyle}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Category</span>
              <select
                value={form.categoryId}
                onChange={(event) =>
                  setForm((f) => ({ ...f, categoryId: event.target.value }))
                }
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                <option value={NEW_CATEGORY}>+ New category…</option>
              </select>
              {form.categoryId === NEW_CATEGORY ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    autoFocus
                    placeholder="Category name"
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    disabled={!newCategoryName || createCategory.isPending}
                    onClick={handleCreateCategory}
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
                    }}
                  >
                    {createCategory.isPending ? "Adding…" : "Add"}
                  </button>
                </div>
              ) : null}
              {createCategory.isError ? (
                <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
                  {createCategory.error.message}
                </p>
              ) : null}
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={labelStyle}>Duration (minutes)</span>
                <input
                  required
                  type="number"
                  min={1}
                  value={form.durationMinutes}
                  onChange={(event) =>
                    setForm((f) => ({
                      ...f,
                      durationMinutes: event.target.value,
                    }))
                  }
                  style={{
                    ...inputStyle,
                    fontFamily: "var(--font-zhamo-mono)",
                  }}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={labelStyle}>Price ({currencyCode})</span>
                <input
                  required
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, price: event.target.value }))
                  }
                  style={{
                    ...inputStyle,
                    fontFamily: "var(--font-zhamo-mono)",
                  }}
                />
              </label>
            </div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "11px 12px",
                border: "1px solid #E6E8EB",
                borderRadius: 8,
                background: "#FAFBFC",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>
                Online bookable
              </span>
              <span
                onClick={() =>
                  setForm((f) => ({ ...f, onlineBookable: !f.onlineBookable }))
                }
                style={{
                  width: 34,
                  height: 20,
                  flex: "0 0 auto",
                  borderRadius: 10,
                  background: form.onlineBookable ? "#16161A" : "#D5D9DE",
                  position: "relative",
                  display: "inline-block",
                  transition: "background 0.15s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: form.onlineBookable ? 16 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    transition: "left 0.15s ease",
                  }}
                />
              </span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "11px 12px",
                border: "1px solid #E6E8EB",
                borderRadius: 8,
                background: "#FAFBFC",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>
                Requires staff
              </span>
              <span
                onClick={() =>
                  setForm((f) => ({ ...f, requiresStaff: !f.requiresStaff }))
                }
                style={{
                  width: 34,
                  height: 20,
                  flex: "0 0 auto",
                  borderRadius: 10,
                  background: form.requiresStaff ? "#16161A" : "#D5D9DE",
                  position: "relative",
                  display: "inline-block",
                  transition: "background 0.15s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: form.requiresStaff ? 16 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    transition: "left 0.15s ease",
                  }}
                />
              </span>
            </label>
            {createService.isError ? (
              <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
                {createService.error.message}
              </p>
            ) : null}
          </div>
          <footer
            style={{
              flex: "0 0 auto",
              height: 60,
              borderTop: "1px solid #E6E8EB",
              background: "#FAFBFC",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 18px",
            }}
          >
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>
              Name, duration, and price are required.
            </span>
            <button
              type="button"
              onClick={handleClose}
              style={{
                marginLeft: "auto",
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={createService.isPending}
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
                cursor: createService.isPending ? "default" : "pointer",
                opacity: createService.isPending ? 0.7 : 1,
              }}
            >
              {createService.isPending ? "Saving…" : "Save service"}
            </button>
          </footer>
        </form>
      </section>
      <style>{`
        @keyframes zhamo-services-in { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }
      `}</style>
    </>
  );
}
