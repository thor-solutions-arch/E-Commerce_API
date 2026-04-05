import type { Env, SortOrder } from "./types.ts";
import { getProducts, getProductById } from "./data.ts";
import { FILTER_META } from "./meta.ts";
import { json, notFound, methodNotAllowed } from "./response.ts";

const VALID_SORTS = new Set<SortOrder>(["relevance", "price-asc", "price-desc", "rating"]);

// GET /products  — list with optional query filters
export async function handleListProducts(request: Request, env: Env): Promise<Response> {
  if (request.method !== "GET") return methodNotAllowed(request);

  const url    = new URL(request.url);
  const params = url.searchParams;

  const categories = params.get("category")?.split(",").filter(Boolean)  ?? [];
  const firmness   = params.get("firmness")?.split(",").filter(Boolean)  ?? [];
  const sizes      = params.get("size")?.split(",").filter(Boolean)      ?? [];
  const priceRange = params.get("priceRange") ?? null;
  const search     = (params.get("search") ?? "").trim().toLowerCase();
  const sortRaw    = params.get("sort") ?? "relevance";
  const sort: SortOrder = VALID_SORTS.has(sortRaw as SortOrder)
    ? (sortRaw as SortOrder)
    : "relevance";

  const data = await getProducts(env, { categories, firmness, sizes, priceRange, search, sort });

  return json({ data, total: data.length, filters: FILTER_META }, request);
}

// GET /products/:id  — single product by id or slug
export async function handleGetProduct(request: Request, env: Env, id: string): Promise<Response> {
  if (request.method !== "GET") return methodNotAllowed(request);

  const product = await getProductById(env, id);
  if (!product) return notFound(request);

  return json({ data: product }, request);
}
