const operatorColors: Record<string, string> = {
  EasyPark: "#7c3aed",
  "Aimo Park": "#22c55e",
  Parkster: "#166534",
  "Stockholm Parkering": "#2563eb",
  Parkman: "#f97316",
  Apcoa: "#f97316",
  Kommunal: "#a855f7",
  "Göteborgs Stads Parkering": "#0d9488",
  "Malmö Stads Parkering": "#db2777",
  "Uppsala Parkering": "#16a34a",
  "Linköpings Kommun": "#d97706",
};

export const operatorColor = (operator: string) =>
  operatorColors[operator] ?? "#64748b";

export const operatorFillColor = (operator: string, alpha = 0.32) => {
  const hex = operatorColor(operator).replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};
