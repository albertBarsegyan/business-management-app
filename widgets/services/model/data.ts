export type ServiceRow = {
  name: string;
  category: string;
  duration: string;
  price: string;
  staff: string;
  online: boolean;
};

export const services: ServiceRow[] = [
  { name: "Men's haircut", category: "Hair", duration: "30 min", price: "6 000 ֏", staff: "Karen, Davit", online: true },
  { name: "Women's haircut", category: "Hair", duration: "45 min", price: "9 000 ֏", staff: "Karen, Davit", online: true },
  { name: "Balayage", category: "Colour", duration: "2 h 30 min", price: "18 000 ֏", staff: "Mariam", online: true },
  { name: "Root touch-up", category: "Colour", duration: "1 h 15 min", price: "9 500 ֏", staff: "Mariam", online: true },
  { name: "Beard trim", category: "Hair", duration: "20 min", price: "4 000 ֏", staff: "Karen, Davit", online: true },
  { name: "Gel manicure", category: "Nails", duration: "50 min", price: "6 000 ֏", staff: "Anna", online: true },
  { name: "Gel pedicure", category: "Nails", duration: "1 h", price: "8 000 ֏", staff: "Anna", online: false },
  { name: "Nail art (per nail)", category: "Nails", duration: "10 min", price: "800 ֏", staff: "Anna", online: false },
];

export const categories = ["All", "Hair", "Colour", "Nails"];
