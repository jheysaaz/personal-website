import { define } from "../utils.ts";

const siteUrl = Deno.env.get("SITE_URL") ||
  "https://jheysonsaavedra.com";

export const handler = define.handlers(() => {
  const locales = ["en", "es"];
  const pages = ["", "/work", "/lab", "/library", "/music"];

  const urls = locales.flatMap((locale) =>
    pages.map((page) => {
      const url = `${siteUrl}/${locale}${page}`;
      const alternates = locales.map((l) =>
        `      <xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}${page}" />`
      ).join("\n");

      return `  <url>
    <loc>${url}</loc>
    <changefreq>${page === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
${alternates}
  </url>`;
    })
  ).join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
});
