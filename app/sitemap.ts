import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/library";

const siteUrl = process.env.SITE_URL || "https://jheysonsaavedra.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["en", "es"];
  const pages = ["", "/work", "/lab", "/library", "/music"];
  const posts = await listPosts();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}/en${page}`,
            es: `${siteUrl}/es${page}`,
            "x-default": `${siteUrl}/en${page}`,
          },
        },
      });
    }
  }

  for (const post of posts) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/library/${post.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
        lastModified: post.date || undefined,
        alternates: {
          languages: {
            en: `${siteUrl}/en/library/${post.slug}`,
            es: `${siteUrl}/es/library/${post.slug}`,
            "x-default": `${siteUrl}/en/library/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
