import { Head } from "fresh/runtime";

export const siteDefaults = {
  name: "Jheyson Saavedra",
  title: "Jheyson Saavedra - Data Analyst & Philosophy Student",
  description:
    "Data analyst and philosophy student. I find patterns in chaos and turn them into decision-making systems easier to understand and harder to break.",
  keywords:
    "data analyst,philosophy,BigQuery,SQL,Looker Studio,fraud detection,dashboard,Colombia",
  twitter: "@jheysaaz",
} as const;

export function getSiteUrl(): string {
  return Deno.env.get("SITE_URL") || "https://jheysonsaavedra.com";
}

interface SeoHeadProps {
  title: string;
  description: string;
  url: string;
  publishedTime?: string;
}

export function SeoHead(
  { title, description, url, publishedTime }: SeoHeadProps,
) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
    </Head>
  );
}
