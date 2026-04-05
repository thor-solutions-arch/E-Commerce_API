import type { Env, Product, SortOrder } from "./types.ts";
import { MOCK_PRODUCTS } from "./mock.ts";

export interface QueryParams {
  categories:  string[];
  firmness:    string[];
  sizes:       string[];
  priceRange:  string | null;
  search:      string;
  sort:        SortOrder;
}

// ─────────────────────────────────────────────────────────────────────────────
// getProducts
//
// NOW  → filters + sorts the in-memory mock array.
// LATER → replace the body with D1 queries. The signature stays the same,
//         so no other file needs to change.
//
// Example D1 migration (pseudocode):
//
//   const conditions: string[] = [];
//   const bindings:   unknown[] = [];
//   if (params.categories.length) {
//     conditions.push(`category IN (${params.categories.map(()=>"?").join(",")})`);
//     bindings.push(...params.categories);
//   }
//   ... etc ...
//   const rows = await env.DB!
//     .prepare(`SELECT * FROM products WHERE ${conditions.join(" AND ")} ORDER BY ...`)
//     .bind(...bindings)
//     .all<Product>();
//   return rows.results;
// ─────────────────────────────────────────────────────────────────────────────
export async function getProducts(env: Env, params: QueryParams): Promise<Product[]> {
  // ── Switch to D1 here when ready ────────────────────────────────────────
  // if (env.DB) return getProductsFromD1(env.DB, params);

  let result = [...MOCK_PRODUCTS];

  if (params.categories.length)
    result = result.filter(p => params.categories.includes(p.category));

  if (params.firmness.length)
    result = result.filter(p => params.firmness.includes(p.firmness));

  if (params.sizes.length)
    result = result.filter(p => params.sizes.some(s => p.sizes.includes(s)));

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (params.priceRange) {
    if (params.priceRange === "320000+") {
      result = result.filter(p => p.price >= 320000);
    } else {
      const [min, max] = params.priceRange.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max))
        result = result.filter(p => p.price >= min && p.price <= max);
    }
  }

  switch (params.sort) {
    case "price-asc":  result.sort((a, b) => a.price - b.price); break;
    case "price-desc": result.sort((a, b) => b.price - a.price); break;
    case "rating":     result.sort((a, b) => b.rating - a.rating); break;
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// getProductById
// ─────────────────────────────────────────────────────────────────────────────
export async function getProductById(env: Env, id: string): Promise<Product | null> {
  // ── Switch to D1 here when ready ────────────────────────────────────────
  // if (env.DB) {
  //   const row = await env.DB
  //     .prepare("SELECT * FROM products WHERE id = ? OR slug = ? LIMIT 1")
  //     .bind(id, id)
  //     .first<Product>();
  //   return row ?? null;
  // }

  return MOCK_PRODUCTS.find(p => p.id === id || p.slug === id) ?? null;
}
