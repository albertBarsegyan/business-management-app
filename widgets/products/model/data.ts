import type { Stat } from "@/widgets/day-calendar";

export const productStats: Stat[] = [
  { label: "SKUs", value: "38" },
  { label: "Inventory value", value: "1 860 000 ֏" },
  { label: "Low stock", value: "4", sub: "Reorder soon", subColor: "#D64545" },
  { label: "Sold this month", value: "127 units" },
];

export type ProductRow = {
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  status: "In stock" | "Low stock" | "Out of stock";
};

export const products: ProductRow[] = [
  { name: "Argan repair shampoo 250ml", sku: "SHM-014", category: "Hair care", stock: 22, price: "6 500 ֏", status: "In stock" },
  { name: "Matte styling clay", sku: "STY-002", category: "Hair care", stock: 6, price: "5 200 ֏", status: "Low stock" },
  { name: "Colour-safe conditioner 250ml", sku: "CND-009", category: "Hair care", stock: 18, price: "6 900 ֏", status: "In stock" },
  { name: "Cuticle oil", sku: "NAI-021", category: "Nail care", stock: 3, price: "3 400 ֏", status: "Low stock" },
  { name: "Gel top coat", sku: "NAI-034", category: "Nail care", stock: 0, price: "4 100 ֏", status: "Out of stock" },
  { name: "Beard oil 30ml", sku: "BRD-005", category: "Grooming", stock: 14, price: "4 800 ֏", status: "In stock" },
];
