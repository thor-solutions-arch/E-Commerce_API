// Allowed origins for CORS.
// Add your Cloudflare Pages domain here before deploying.
const ALLOWED_ORIGINS = new Set([
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  // "https://dormirco.pages.dev",  // ← add when deployed
]);

const CORS_HEADERS_BASE = {
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age":       "86400",
};

export function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    ...CORS_HEADERS_BASE,
    "Access-Control-Allow-Origin": allowed,
  };
}

export function json(data: unknown, request: Request, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...getCorsHeaders(request),
    },
  });
}

export function notFound(request: Request): Response {
  return json({ error: "No encontrado" }, request, 404);
}

export function methodNotAllowed(request: Request): Response {
  return json({ error: "Método no permitido" }, request, 405);
}

export function serverError(request: Request, err?: unknown): Response {
  console.error("[Worker error]", err);
  return json({ error: "Error interno del servidor" }, request, 500);
}
