export const siteDefaults = {
  name: "Jheyson Saavedra",
  title: "Jheyson Saavedra - Data Analyst & Philosophy Student",
  description:
    "Data analyst and philosophy student. I find patterns in chaos and turn them into decision-making systems easier to understand and harder to break.",
  keywords:
    "data analyst,philosophy,BigQuery,SQL,Looker Studio,fraud detection,dashboard,Colombia",
  twitter: "@jheysaaz",
  image: "/og-image.png",
} as const;

export function getSiteUrl(): string {
  return Deno.env.get("SITE_URL") || "https://jheysonsaavedra.com";
}

export function canonicalUrl(pathname: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}${pathname}`;
}
