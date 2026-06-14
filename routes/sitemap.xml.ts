import { define } from "../utils.ts";
import { listPosts } from "../utils/library.ts";

const siteUrl = Deno.env.get("SITE_URL") ||
  "https://jheysonsaavedra.com";

export const handler = define.handlers(async () => {
  const locales = ["en", "es"];
  const pages = ["", "/work", "/lab", "/library", "/music"];

  const posts = await listPosts();

  const buildAlternates = (subPath: string) => {
    const cleanSubPath = subPath.replace(/^\/(en|es)/, "");
    const basePath = cleanSubPath === "/" || cleanSubPath === ""
      ? ""
      : cleanSubPath;
    const links = locales.map((l) =>
      `      <xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${l}${basePath}" />`
    );
    links.push(
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/en${basePath}" />`,
    );
    return links.join("\n");
  };

  const buildUrl = (
    path: string,
    options: { changefreq: string; priority: string; lastmod?: string },
    includeAlternates = true,
  ) => {
    const url = `${siteUrl}${path}`;
    const alternates = includeAlternates ? buildAlternates(path) : "";
    const lastmod = options.lastmod
      ? `    <lastmod>${options.lastmod}</lastmod>\n`
      : "";

    return `  <url>
    <loc>${url}</loc>
${lastmod}    <changefreq>${options.changefreq}</changefreq>
    <priority>${options.priority}</priority>
${alternates}
  </url>`;
  };

  const staticUrls = locales.flatMap((locale) =>
    pages.map((page) => {
      const path = `/${locale}${page}`;
      return buildUrl(path, {
        changefreq: page === "" ? "weekly" : "monthly",
        priority: page === "" ? "1.0" : "0.8",
      });
    })
  );

  const postUrls = posts.flatMap((post) =>
    locales.map((locale) => {
      const path = `/${locale}/library/${post.slug}`;
      return buildUrl(path, {
        changefreq: "monthly",
        priority: "0.7",
        lastmod: post.date || undefined,
      });
    })
  );

  const urls = [...staticUrls, ...postUrls].join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    "</urlset>",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
