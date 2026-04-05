import type { Env } from "./types.ts";
import { getCorsHeaders, json, notFound, serverError } from "./response.ts";
import { handleListProducts, handleGetProduct } from "./products.ts";

// ─────────────────────────────────────────────────────────────────────────────
// Router
//
// Pattern: /segment  or  /segment/:param
// Extend this as you add cart, orders, auth, etc.
// ─────────────────────────────────────────────────────────────────────────────
function route(
  pathname: string,
  method: string
): { handler: string; params: Record<string, string> } | null {
  const segments = pathname.replace(/^\/|\/$/g, "").split("/");

  // GET /
  if (segments[0] === "" && method === "GET")
    return { handler: "health", params: {} };

  // /products
  if (segments[0] === "products") {
    // GET /products
    if (segments.length === 1)
      return { handler: "list-products", params: {} };

    // GET /products/:id
    if (segments.length === 2)
      return { handler: "get-product", params: { id: segments[1] } };
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch handler
// ─────────────────────────────────────────────────────────────────────────────
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request),
      });
    }

    const match = route(url.pathname, request.method);

    if (!match) return notFound(request);

    try {
      switch (match.handler) {
        case "health":
          return json(
            {
              ok: true,
              version: "1.0.0",
              endpoints: [
                "GET /products",
                "GET /products?category=latex,resortes&firmness=firm&size=king&priceRange=250000-320000&search=texto&sort=price-asc",
                "GET /products/:id",
              ],
            },
            request
          );

        case "list-products":
          return handleListProducts(request, env);

        case "get-product":
          return handleGetProduct(request, env, match.params.id);

        default:
          return notFound(request);
      }
    } catch (err) {
      return serverError(request, err);
    }
  },
} 
// satisfies ExportedHandler<Env>;
