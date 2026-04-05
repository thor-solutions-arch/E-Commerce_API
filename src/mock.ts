import type { Product } from "./types.ts";

// ─────────────────────────────────────────────────────────────────────────────
// This file is the ONLY place where mock data lives.
// When D1 is ready, delete this file and update data.ts to query the DB.
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p001", name: "Noctis Látex Natural", slug: "noctis-latex-natural",
    category: "latex", price: 289000, originalPrice: 340000,
    rating: 4.8, reviewCount: 124, badge: "Más vendido",
    firmness: "medium-firm", sizes: ["plaza", "plaza-y-media", "matrimonial", "king"],
    features: ["Látex natural 100%", "Funda removible", "Doble cara"],
    description: "El equilibrio perfecto entre soporte y confort. Fabricado con látex natural certificado.",
  },
  {
    id: "p002", name: "Somnia Memory Foam", slug: "somnia-memory-foam",
    category: "memory-foam", price: 215000, originalPrice: null,
    rating: 4.6, reviewCount: 89, badge: null,
    firmness: "medium", sizes: ["plaza", "plaza-y-media", "matrimonial"],
    features: ["Viscoelástico de alta densidad", "Adaptable al cuerpo", "Anti-ácaros"],
    description: "Tecnología viscoelástica que se adapta a la forma de tu cuerpo para un descanso sin presiones.",
  },
  {
    id: "p003", name: "Aura Resortes Pocket", slug: "aura-resortes-pocket",
    category: "resortes", price: 175000, originalPrice: 195000,
    rating: 4.4, reviewCount: 203, badge: "Oferta",
    firmness: "firm", sizes: ["plaza", "plaza-y-media", "matrimonial", "king", "twin"],
    features: ["1200 resortes individuales", "Movimiento independiente", "Alta ventilación"],
    description: "Sistema de resortes ensacados que aíslan el movimiento y garantizan ventilación permanente.",
  },
  {
    id: "p004", name: "Sereno Ortopédico Pro", slug: "sereno-ortopedico-pro",
    category: "ortopedico", price: 320000, originalPrice: null,
    rating: 4.9, reviewCount: 57, badge: "Premium",
    firmness: "firm", sizes: ["plaza", "matrimonial", "king"],
    features: ["Soporte lumbar reforzado", "Espuma HR50", "Garantía 10 años"],
    description: "Diseñado con fisioterapeutas para máximo soporte de columna y alineación postural perfecta.",
  },
  {
    id: "p005", name: "Luna Híbrido Gel", slug: "luna-hibrido-gel",
    category: "hibrido", price: 265000, originalPrice: 310000,
    rating: 4.7, reviewCount: 76, badge: "Nuevo",
    firmness: "medium-soft", sizes: ["plaza-y-media", "matrimonial", "king"],
    features: ["Gel termorregulador", "Resortes + memory foam", "Funda 3D transpirable"],
    description: "Lo mejor de dos mundos: el soporte de los resortes con el confort del memory foam y regulación térmica.",
  },
  {
    id: "p006", name: "Bruma Soft Touch", slug: "bruma-soft-touch",
    category: "espuma", price: 98000, originalPrice: null,
    rating: 4.2, reviewCount: 312, badge: null,
    firmness: "soft", sizes: ["twin", "plaza", "plaza-y-media", "matrimonial"],
    features: ["Espuma HR35", "Ultra suave", "Ideal colchoneta auxiliar"],
    description: "Confort accesible sin sacrificar calidad. Ideal para cuartos de huéspedes o uso secundario.",
  },
  {
    id: "p007", name: "Cima Látex Firm", slug: "cima-latex-firm",
    category: "latex", price: 305000, originalPrice: 350000,
    rating: 4.7, reviewCount: 44, badge: null,
    firmness: "firm", sizes: ["plaza", "matrimonial", "king"],
    features: ["Látex sintético premium", "Firmeza extrema", "Ideal deportistas"],
    description: "Para quienes prefieren una superficie firme. Soporte máximo y durabilidad excepcional.",
  },
  {
    id: "p008", name: "Ébano Box Top", slug: "ebano-box-top",
    category: "resortes", price: 240000, originalPrice: null,
    rating: 4.5, reviewCount: 91, badge: null,
    firmness: "medium-soft", sizes: ["plaza", "plaza-y-media", "matrimonial", "king"],
    features: ["Pillow top integrado", "Resortes bicónicos", "Acolchado extra"],
    description: "El clásico reinterpretado. Resortes de alta resistencia con capa de acolchado que envuelve el cuerpo.",
  },
];
