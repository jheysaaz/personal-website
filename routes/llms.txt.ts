import { define } from "../utils.ts";
import { getSiteUrl, siteDefaults } from "../utils/seo.ts";
import en from "../i18n/dictionaries/en.json" with { type: "json" };

export const handler = define.handlers(() => {
  const siteUrl = getSiteUrl();
  const description = en.bio.description;
  const body = [
    `# ${siteDefaults.name}`,
    description,
    "",
    "## About",
    description,
    "",
    "## Languages",
    "- English: /en",
    "- Espanol: /es",
    "",
    "## Key Pages",
    `- Home: ${siteUrl}/en`,
    `- Work: ${siteUrl}/en/work`,
    `- Lab: ${siteUrl}/en/lab`,
    `- Library: ${siteUrl}/en/library`,
    `- Music: ${siteUrl}/en/music`,
    "",
    "## Paginas en Espanol",
    `- Inicio: ${siteUrl}/es`,
    `- Trabajo: ${siteUrl}/es/work`,
    `- Laboratorio: ${siteUrl}/es/lab`,
    `- Biblioteca: ${siteUrl}/es/library`,
    `- Musica: ${siteUrl}/es/music`,
    "",
    "## Sitemaps",
    `- ${siteUrl}/sitemap.xml`,
    "",
    "## Feeds",
    `- RSS (Library): ${siteUrl}/rss.xml`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
