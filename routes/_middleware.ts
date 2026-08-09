import { define } from "@/utils/state.ts";
import { defaultLocale, getIntl, isLocale } from "@/lib/i18n.ts";

export default define.middleware(async (ctx) => {
  const { pathname } = ctx.url;
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments.at(-1) ?? "";

  // Skip file-like paths: fonts, favicon, sitemap.xml, robots.txt, rss.xml, llms.txt.
  if (lastSegment.includes(".")) {
    return await ctx.next();
  }

  const first = segments[0];

  if (isLocale(first)) {
    ctx.state.locale = first;
    ctx.state.intl = getIntl(first);
    return await ctx.next();
  }

  // Not a known locale → redirect to the default locale.
  const target = `/${defaultLocale}/${segments.join("/")}`.replace(/\/$/, "");
  return new Response(null, {
    status: 307,
    headers: { location: target },
  });
});
