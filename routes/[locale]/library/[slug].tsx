// deno-lint-ignore-file react-no-danger
import { define } from "../../../utils.ts";
import { getDictionary } from "../../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../../utils/locale.ts";
import { BackNavigation } from "../../../components/back-navigation.tsx";
import { SEO } from "../../../components/seo.tsx";
import { getSiteUrl } from "../../../utils/seo.ts";
import { formatDate, getPost } from "../../../utils/library.ts";

// deno-lint-ignore no-explicit-any
type Dict = any;

interface Data {
  dict: Dict;
  locale: string;
  slug: string;
  title: string;
  date: string;
  content: string;
  notFound: boolean;
}

export const handler = define.handlers<Data>(async (ctx) => {
  const locale = normalizeLocale(ctx.params.locale);
  const slug = ctx.params.slug;
  const dict = await getDictionary(locale);
  const post = await getPost(slug);

  if (!post) {
    return {
      data: {
        dict,
        locale,
        slug,
        title: "",
        date: "",
        content: "",
        notFound: true,
      },
    };
  }

  return {
    data: {
      dict,
      locale,
      slug: post.slug,
      title: post.title,
      date: post.date,
      content: post.content,
      notFound: false,
    },
  };
});

export default define.page<typeof handler>(({ data }) => {
  const { dict, locale, slug, title, date, content, notFound } = data;
  const siteUrl = getSiteUrl();

  if (notFound) {
    return (
      <div class="space-y-8 md:space-y-12">
        <SEO
          title={dict.pages.notFound.title}
          description=""
          path=""
          locale={locale}
          noindex
        />
        <BackNavigation
          href={`/${locale}/library`}
          label={dict.navigation.returnToShip}
        />
        <section class="text-center py-10 md:py-16">
          <h1 class="font-semibold text-6xl mb-4 tracking-tighter font-serif">
            404
          </h1>
          <h2 class="font-semibold text-2xl mb-6 md:mb-8 tracking-tighter font-serif">
            {dict.pages.notFound.title}
          </h2>
          <p class="mb-6 md:mb-8 max-w-md mx-auto">
            {dict.pages.notFound.description}
          </p>
        </section>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: title,
    inLanguage: locale,
    url: `${siteUrl}/${locale}/library/${slug}`,
    mainEntityOfPage: `${siteUrl}/${locale}/library/${slug}`,
    datePublished: date || undefined,
    author: { "@type": "Person", name: "Jheyson Saavedra" },
    publisher: { "@type": "Person", name: "Jheyson Saavedra" },
  };

  return (
    <div class="space-y-8 md:space-y-12">
      <SEO
        title={`${title} — ${dict.meta.description}`}
        description={title}
        path={`/library/${slug}`}
        locale={locale}
        article
        jsonLd={jsonLd}
      />
      <BackNavigation
        href={`/${locale}/library`}
        label={dict.navigation.returnToShip}
      />

      <article>
        <header class="mb-6 md:mb-8">
          <h1 class="text-[1.75rem] font-medium tracking-tight text-foreground mb-2 font-serif">
            {title}
          </h1>
          {date && (
            <time class="text-sm text-muted-foreground">
              {formatDate(date, locale)}
            </time>
          )}
        </header>
        <div
          class="markdown-body max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </div>
  );
});
