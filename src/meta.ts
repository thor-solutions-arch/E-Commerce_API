// Static lookup tables — these will also move to D1 eventually
// but for now they're served inline with every /products response.

export const FILTER_META = {
  categories: [
    { id: "latex",       label: "Látex" },
    { id: "memory-foam", label: "Memory Foam" },
    { id: "resortes",    label: "Resortes" },
    { id: "ortopedico",  label: "Ortopédico" },
    { id: "hibrido",     label: "Híbrido" },
    { id: "espuma",      label: "Espuma" },
  ],
  firmnessOptions: [
    { id: "soft",        label: "Suave" },
    { id: "medium-soft", label: "Medio-Suave" },
    { id: "medium",      label: "Medio" },
    { id: "medium-firm", label: "Medio-Firme" },
    { id: "firm",        label: "Firme" },
  ],
  sizeOptions: [
    { id: "twin",          label: "Twin" },
    { id: "plaza",         label: "1 Plaza" },
    { id: "plaza-y-media", label: "1½ Plaza" },
    { id: "matrimonial",   label: "Matrimonial" },
    { id: "king",          label: "King" },
  ],
  priceRanges: [
    { id: "0-150000",      label: "Hasta $150.000" },
    { id: "150000-250000", label: "$150.000 – $250.000" },
    { id: "250000-320000", label: "$250.000 – $320.000" },
    { id: "320000+",       label: "Más de $320.000" },
  ],
  sortOptions: [
    { id: "relevance",  label: "Relevancia" },
    { id: "price-asc",  label: "Menor precio" },
    { id: "price-desc", label: "Mayor precio" },
    { id: "rating",     label: "Mejor valorados" },
  ],
} as const;
