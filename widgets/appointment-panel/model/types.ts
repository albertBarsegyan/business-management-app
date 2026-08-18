export type PanelMode = "new" | "edit" | "conflict";

export type VisitStatus = "Pending" | "Arrived" | "No-show" | "Confirmed";

export type PanelService = {
  id: string;
  name: string;
  meta: string;
  price: string;
  selected?: boolean;
  detail?: {
    price: string;
    discountPercent: string;
    duration: string;
    masterShare: string;
  };
};

export type PanelMatch = {
  name: string;
  phone: string;
  initials: string;
  avatar: string;
  visits: string;
  last: string;
  linked?: boolean;
};

export type BackdropBlock = { h: string; gap: string };
export type BackdropColumn = { blocks: BackdropBlock[] };
