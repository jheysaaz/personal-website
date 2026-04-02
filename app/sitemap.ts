import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jheysonsaavedra.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'es'];
  const pages = ['', '/work', '/lab', '/library', '/music'];

  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for each locale and page combination
  for (const locale of locales) {
    for (const page of pages) {
      routes.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}/en${page}`,
            es: `${siteUrl}/es${page}`,
          },
        },
      });
    }
  }

  return routes;
}
