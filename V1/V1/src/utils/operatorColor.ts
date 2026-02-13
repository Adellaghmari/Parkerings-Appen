const operatorColors: Record<string, string> = {
  "Aimo Park": "#7c3aed",
  Apcoa: "#0ea5e9",
  Parkman: "#f97316",
  Kommunal: "#10b981",
  "Stockholm Parkering": "#2563eb",
  "Göteborgs Stads Parkering": "#06b6d4",
  "Malmö Stads Parkering": "#ec4899",
  "Uppsala Parkering": "#84cc16",
  "Linköpings Kommun": "#f59e0b",
};

export const operatorColor = (operator: string) =>
  operatorColors[operator] ?? "#6366f1";
