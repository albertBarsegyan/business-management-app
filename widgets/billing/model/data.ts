export const currentPlan = {
  name: "Studio",
  price: "24 900 ֏ / month",
  renewsOn: "Sep 1, 2026",
  seats: "4 of 5 team members",
};

export const paymentMethod = {
  brand: "Visa",
  last4: "4242",
  expires: "09/28",
};

export type InvoiceRow = { date: string; amount: string; status: "Paid" | "Due"; invoiceNo: string };

export const invoices: InvoiceRow[] = [
  { date: "Aug 1, 2026", amount: "24 900 ֏", status: "Paid", invoiceNo: "INV-2026-08" },
  { date: "Jul 1, 2026", amount: "24 900 ֏", status: "Paid", invoiceNo: "INV-2026-07" },
  { date: "Jun 1, 2026", amount: "24 900 ֏", status: "Paid", invoiceNo: "INV-2026-06" },
  { date: "May 1, 2026", amount: "19 900 ֏", status: "Paid", invoiceNo: "INV-2026-05" },
];
