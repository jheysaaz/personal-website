import { define } from "@/utils/state.ts";
import { getSiteUrl } from "@/lib/seo.tsx";
import { listPosts } from "@/lib/library.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const siteUrl = getSiteUrl();
    const locales = ["en", "es"];
    const pages = ["", "/work", "/lab", "/library", "/music"];
    const posts = await listPosts();

    const entries: string[] = [];

    for (const locale of locales) {
      for (const page of pages) {
        const url = `${siteUrl}/${locale}${page}`;
        const alternates = locales.map((l) =>
          `<xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}${page}"/>`
        ).join("\n        ");
        entries.push(
          `<url><loc>${url}</loc><changefreq>${
            page === "" ? "weekly" : "monthly"
          }</changefreq><priority>${
            page === "" ? 1 : 0.8
          }</priority>\n        ${alternates}\n        <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/en${page}"/></url>`,
        );
      }
    }

    for (const post of posts) {
      for (const locale of locales) {
        const url = `${siteUrl}/${locale}/library/${post.slug}`;
        const alternates = locales.map((l) =>
          `<xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}/library/${post.slug}"/>`
        ).join("\n        ");
        entries.push(
          `<url><loc>${url}</loc><changefreq>monthly</changefreq><priority>0.7</priority>${
            post.date ? `<lastmod>${post.date}</lastmod>` : ""
          }\n        ${alternates}\n        <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/en/library/${post.slug}"/></url>`,
        );
      }
    }

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${entries.join("\n  ")}
</urlset>
`;

    return new Response(body, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  },
});
