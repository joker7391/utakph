export const fieldConfig = [
  {
    name: "category",
    label: "Category",
    type: "select",
    options: ["Burgers", "Fries", "Drinks", "Desserts"],
    required: true,
  },
  { name: "name", label: "Name", type: "text", required: true },
  {
    name: "options",
    label: "Options (if applicable)",
    type: "select",
    options: ["None", "Small", "Medium", "Large"],
  },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "cost", label: "Cost", type: "number", required: true },
  { name: "stock", label: "Amount in Stock", type: "number", required: true },
];
