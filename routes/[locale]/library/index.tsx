import { define } from "../../../utils.ts";
import { getDictionary } from "../../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../../utils/locale.ts";
import { BackNavigation } from "../../../components/back-navigation.tsx";
import { Head } from "fresh/runtime";
import { canonicalUrl, siteDefaults } from "../../../utils/seo.ts";
import { formatDate, listPosts, type Post } from "../../../utils/library.ts";

// deno-lint-ignore no-explicit-any
type Dict = any;

interface Data {
  dict: Dict;
  locale: string;
  posts: Post[];
}

export const handler = define.handlers<Data>(async (ctx) => {
  const locale = normalizeLocale(ctx.params.locale);
  const [dict, posts] = await Promise.all([getDictionary(locale), listPosts()]);
  return { data: { dict, locale, posts } };
});

export default define.page<typeof handler>(({ data }) => {
  const { dict, locale, posts } = data;
  const canonical = canonicalUrl(`/${locale}/library`);

  return (
    <div class="space-y-8 md:space-y-12">
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Library RSS"
          href={canonicalUrl("/rss.xml")}
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
        <p class="text-foreground mb-8 md:mb-12">
          {dict.pages.library.description}
        </p>

        {posts.length === 0 ? (
          <p class="text-muted-foreground">{dict.pages.library.wip}</p>
        ) : (
          <div class="space-y-2">
            {posts.map((post) => (
              <div key={post.slug} class="flex items-baseline gap-2">
                <a
                  href={`/${locale}/library/${post.slug}`}
                  class="no-persistent-underline text-foreground hover:opacity-70 transition-opacity"
                >
                  {post.title}
                </a>
                <time class="text-muted-foreground text-sm shrink-0">
                  {formatDate(post.date, locale)}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
