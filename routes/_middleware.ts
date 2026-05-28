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
    pathname.startsWith("/favicon")
  ) {
    return ctx.next();
  }

  const acceptLanguage = ctx.req.headers.get("Accept-Language") || "";
  const preferred = locales.find((l) => acceptLanguage.includes(l));
  const locale = normalizeLocale(preferred);

  const url = new URL(ctx.url);
  url.pathname = `/${locale}${pathname}`;
  return Response.redirect(url, 302);
});
