import { define } from "../../utils.ts";
import { getDictionary } from "../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../utils/locale.ts";
import { BackNavigation } from "../../components/back-navigation.tsx";
import { Head } from "fresh/runtime";
import { canonicalUrl, siteDefaults } from "../../utils/seo.ts";

export const handler = define.handlers(async (ctx) => {
  const locale = normalizeLocale(ctx.params.locale);
  const dict = await getDictionary(locale);
  return { data: { dict, locale } };
});

export default define.page<typeof handler>(({ data }) => {
  const { dict, locale } = data;
  const canonical = canonicalUrl(`/${locale}/library`);

  return (
    <div class="space-y-12">
      <Head>
        <title>{dict.pages.library.title}</title>
        <meta name="description" content={dict.pages.library.description} />
        <meta name="keywords" content={siteDefaults.keywords} />
        <link rel="canonical" href={canonical} />
        <link
          rel="alternate"
          hrefLang="en"
          href={canonicalUrl("/en/library")}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={canonicalUrl("/es/library")}
        />
      </Head>
      <BackNavigation
        href={`/${locale}`}
        label={dict.navigation.returnToShip}
      />

      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
          {dict.pages.library.title}
        </h1>
        <p class="text-foreground">
          {dict.pages.library.description}
        </p>
      </div>
    </div>
  );
});
