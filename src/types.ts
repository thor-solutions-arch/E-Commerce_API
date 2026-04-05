export type Category  = "latex" | "memory-foam" | "resortes" | "ortopedico" | "hibrido" | "espuma";
export type Firmness  = "soft" | "medium-soft" | "medium" | "medium-firm" | "firm";
export type Size      = "twin" | "plaza" | "plaza-y-media" | "matrimonial" | "king";
export type SortOrder = "relevance" | "price-asc" | "price-desc" | "rating";

export interface Product {
  id:            string;
  name:          string;
  slug:          string;
  category:      Category;
  price:         number;
  originalPrice: number | null;
  rating:        number;
  reviewCount:   number;
  badge:         string | null;
  firmness:      Firmness;
  sizes:         string[];
  features:      string[];
  description:   string;
}

// Env exposes Cloudflare bindings injected at runtime.
// DB is optional so the Worker starts fine before D1 is wired up.
export interface Env {
  DB?: IDBDatabase;
}
