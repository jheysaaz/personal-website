import { App, csp, staticFiles, trailingSlashes } from "fresh";

const fontCache = async (ctx: { url: URL; next: () => Promise<Response> }) => {
  const response = await ctx.next();
  if (ctx.url.pathname.startsWith("/fonts/")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
  }
  return response;
};

export const app = new App()
  .use(fontCache)
  .use(csp({
    csp: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "media-src 'self' data: blob:",
      "worker-src 'self' blob:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ],
  }))
  .use(staticFiles())
  .use(trailingSlashes("never"));

app.fsRoutes();

if (import.meta.main) {
  await app.listen();
}
