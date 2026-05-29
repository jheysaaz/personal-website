// deno-lint-ignore-file react-no-danger
import { define } from "../../../utils.ts";
import { getDictionary } from "../../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../../utils/locale.ts";
import { BackNavigation } from "../../../components/back-navigation.tsx";
import { Head } from "fresh/runtime";
import { canonicalUrl, getSiteUrl, siteDefaults } from "../../../utils/seo.ts";
import { formatDate, getPost, gfmCss } from "../../../utils/library.ts";

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
  const canonical = canonicalUrl(`/${locale}/library/${slug}`);

  if (notFound) {
    return (
      <div class="space-y-8 md:space-y-12">
        <Head>
          <title>{dict.pages.notFound.title}</title>
          <link rel="canonical" href={canonical} />
        </Head>
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

  return (
    <div class="space-y-8 md:space-y-12">
      <Head>
        <title>
          {title} — {dict.meta.description}
        </title>
        <meta name="description" content={title} />
        <meta name="keywords" content={siteDefaults.keywords} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content={siteDefaults.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={`${siteUrl}${siteDefaults.image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={siteDefaults.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={title} />
        <meta
          name="twitter:image"
          content={`${siteUrl}${siteDefaults.image}`}
        />
        <link rel="canonical" href={canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              description: title,
              inLanguage: locale,
              url: canonical,
              mainEntityOfPage: canonical,
              datePublished: date || undefined,
              author: {
                "@type": "Person",
                name: siteDefaults.name,
              },
              publisher: {
                "@type": "Person",
                name: siteDefaults.name,
              },
              image: canonicalUrl(siteDefaults.image),
            }),
          }}
        />
        <style>{gfmCss}</style>
      </Head>
      <BackNavigation
        href={`/${locale}/library`}
        label={dict.navigation.returnToShip}
      />

      <article>
        <header class="mb-6 md:mb-8">
          <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-2 font-serif">
            {title}
          </h1>
          {date && (
            <time class="text-sm text-muted-foreground">
              {formatDate(date, locale)}
            </time>
          )}
        </header>
        <div
          class="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </div>
  );
});
