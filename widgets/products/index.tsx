"use client";

import { DataTable, PageHeader, PageHeaderButton, PageShell, Pill, StatGrid } from "@/widgets/day-calendar";
import { productStats, products, type ProductRow } from "./model/data";

const statusStyle: Record<ProductRow["status"], { bg: string; color: string }> = {
  "In stock": { bg: "rgba(30,142,90,0.12)", color: "#1E8E5A" },
  "Low stock": { bg: "rgba(230,163,29,0.15)", color: "#B4780F" },
  "Out of stock": { bg: "rgba(214,69,69,0.12)", color: "#D64545" },
};

export function ProductsScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Products"
        subtitle="Manage retail products and inventory sold in-store."
        action={<PageHeaderButton>Add product</PageHeaderButton>}
      />

      <StatGrid stats={productStats} />

      <DataTable<ProductRow>
        rowKey={(row) => row.sku}
        columns={[
          { label: "Product", render: (row) => <span style={{ fontWeight: 600 }}>{row.name}</span>, width: "1.8fr" },
          { label: "SKU", render: (row) => <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: "#8A9099" }}>{row.sku}</span>, width: "1fr" },
          { label: "Category", render: (row) => row.category, width: "1fr" },
          { label: "Stock", render: (row) => `${row.stock} units`, align: "right", width: "0.9fr" },
          { label: "Price", render: (row) => row.price, align: "right", width: "0.9fr" },
          {
            label: "Status",
            render: (row) => (
              <Pill bg={statusStyle[row.status].bg} color={statusStyle[row.status].color}>
                {row.status}
              </Pill>
            ),
            width: "1fr",
          },
        ]}
        rows={products}
      />
    </PageShell>
  );
}
