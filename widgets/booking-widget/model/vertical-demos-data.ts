export type VerticalDemoItem = {
  name: string;
  meta: string;
  price: string;
  checked: boolean;
};

export type VerticalDemo = {
  name: string;
  initial: string;
  meta: string;
  vertical: string;
  accent: string;
  accentDeep: string;
  tint: string;
  coverA: string;
  coverB: string;
  prompt: string;
  total: string;
  cta: string;
  items: VerticalDemoItem[];
};

export const verticalDemos: VerticalDemo[] = [
  {
    name: "Studio Aram",
    initial: "A",
    meta: "Barbershop · Kentron, Yerevan",
    vertical: "Beauty",
    accent: "oklch(0.64 0.16 350)",
    accentDeep: "oklch(0.42 0.13 350)",
    tint: "oklch(0.96 0.03 350)",
    coverA: "oklch(0.5 0.1 350)",
    coverB: "oklch(0.44 0.1 350)",
    prompt: "Pick your services — combine as many as you like",
    total: "12 500 ֏ · 75 min",
    cta: "Choose barber",
    items: [
      { name: "Men's cut & beard trim", meta: "45 min · with wash", price: "7 500 ֏", checked: true },
      { name: "Head shave & hot towel", meta: "30 min", price: "5 000 ֏", checked: true },
      { name: "Kids cut (under 12)", meta: "30 min", price: "4 000 ֏", checked: false },
    ],
  },
  {
    name: "Dentix Clinic",
    initial: "D",
    meta: "Dental clinic · Arabkir, Yerevan",
    vertical: "Healthcare",
    accent: "oklch(0.64 0.16 225)",
    accentDeep: "oklch(0.42 0.13 225)",
    tint: "oklch(0.96 0.03 225)",
    coverA: "oklch(0.5 0.1 225)",
    coverB: "oklch(0.44 0.1 225)",
    prompt: "What do you need? One appointment at a time",
    total: "8 000 ֏ · 40 min",
    cta: "Choose doctor",
    items: [
      { name: "Consultation & X-ray", meta: "40 min · Dr. Sargsyan", price: "8 000 ֏", checked: true },
      { name: "Professional hygiene", meta: "60 min", price: "22 000 ֏", checked: false },
      { name: "Filling (one tooth)", meta: "45 min · referral needed", price: "from 25 000 ֏", checked: false },
    ],
  },
];
