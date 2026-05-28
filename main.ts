import { App, csp, staticFiles, trailingSlashes } from "fresh";

export const app = new App()
  .use(csp({
    csp: [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' https://fonts.gstatic.com",
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
