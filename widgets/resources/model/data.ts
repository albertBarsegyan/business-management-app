export type ResourceRow = {
  name: string;
  type: "Chair" | "Room" | "Equipment";
  assignedTo: string;
  status: "Available" | "In use" | "Maintenance";
};

export const resources: ResourceRow[] = [
  { name: "Chair 1", type: "Chair", assignedTo: "Karen Sahakyan", status: "In use" },
  { name: "Chair 2", type: "Chair", assignedTo: "Davit Melkonyan", status: "Available" },
  { name: "Colour station", type: "Room", assignedTo: "Mariam Petrosyan", status: "In use" },
  { name: "Nail bar", type: "Room", assignedTo: "Anna Hakobyan", status: "Available" },
  { name: "Steamer unit", type: "Equipment", assignedTo: "Colour station", status: "Maintenance" },
  { name: "Hooded dryer", type: "Equipment", assignedTo: "Nail bar", status: "Available" },
];
