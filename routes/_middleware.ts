import { define } from "../utils.ts";
import { locales, defaultLocale } from "../i18n/config.ts";

const botPattern = /bot|crawler|spider|googlebot|bingbot|yandex|slurp|duckduckbot/i;

export const handler = define.middleware((ctx) => {
  const { pathname } = ctx.url;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return ctx.next();
  }

  if (
    pathname.startsWith("/robots.txt") || pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/favicon") || pathname.startsWith("/rss.xml") ||
    pathname.startsWith("/llms.txt")
  ) {
    return ctx.next();
  }

  const userAgent = ctx.req.headers.get("User-Agent") || "";
  const locale = botPattern.test(userAgent)
    ? defaultLocale
    : detectLocale(ctx.req.headers.get("Accept-Language") || "");

  const dest = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return new Response(null, {
    status: 301,
    headers: {
      Location: dest,
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
});

function detectLocale(acceptLanguage: string): string {
  const preferred = locales.find((l) => acceptLanguage.includes(l));
  return preferred ?? defaultLocale;
}
