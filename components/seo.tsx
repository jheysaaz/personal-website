import { Head } from "fresh/runtime";
import type { ComponentChildren } from "preact";
import { siteDefaults, getSiteUrl } from "../utils/seo.ts";
import { locales } from "../i18n/config.ts";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  locale: string;
  article?: boolean;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
  children?: ComponentChildren;
}

export function SEO(
  { title, description, path, locale, article, noindex, jsonLd, children }:
    SEOProps,
) {
  const siteUrl = getSiteUrl();
  const localePath = path ? `/${locale}${path}` : `/${locale}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteDefaults.keywords} />
      {noindex && <meta name="robots" content="noindex" />}

      <link rel="canonical" href={`${siteUrl}${localePath}`} />
      {locales.map((l) => (
        <link
          rel="alternate"
          hrefLang={l}
          href={`${siteUrl}/${l}${path}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteUrl}/en${path}`}
      />

      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={`${siteUrl}${localePath}`} />
      <meta property="og:site_name" content={siteDefaults.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteDefaults.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}

      {children}
    </Head>
  );
}
