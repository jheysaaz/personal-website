import { define } from "../utils.ts";
import { locales } from "../i18n/config.ts";
import { normalizeLocale } from "../utils/locale.ts";

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

  const acceptLanguage = ctx.req.headers.get("Accept-Language") || "";
  const preferred = locales.find((l) => acceptLanguage.includes(l));
  const locale = normalizeLocale(preferred);

  const dest = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return new Response(null, {
    status: 302,
    headers: { Location: dest },
  });
});
