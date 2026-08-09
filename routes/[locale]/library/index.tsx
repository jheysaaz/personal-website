import { define } from "@/utils/state.ts";
import { getSiteUrl, SeoHead } from "@/lib/seo.tsx";
import { formatDate, listPosts } from "@/lib/library.ts";
import { Badge } from "@/components/ui/badge.tsx";

export const handler = define.handlers({
  async GET(_ctx) {
    const posts = await listPosts();
    return { data: { posts } };
  },
});

export default define.page<typeof handler>((props) => {
  const { intl } = props.state;
  const locale = intl.locale;
  const { posts } = props.data;

  return (
    <>
      <SeoHead
        title={intl.t("pages.library.title")}
        description={intl.t("pages.library.description")}
        url={`${getSiteUrl()}/${locale}/library`}
      />
      <div class="space-y-8 md:space-y-12">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {intl.t("pages.library.title")}
          </h1>
          <p class="text-foreground mb-8 md:mb-12">
            {intl.t("pages.library.description")}
          </p>

          {posts.length === 0
            ? (
              <p class="text-muted-foreground">
                {intl.t("pages.library.wip")}
              </p>
            )
            : (
              <div class="space-y-2">
                {posts.map((post) => (
                  <div key={post.slug} class="flex items-baseline gap-2">
                    <a
                      href={`/${locale}/library/${post.slug}`}
                      class="no-underline text-foreground hover:opacity-70 transition-opacity"
                    >
                      {post.title}
                    </a>
                    <time class="text-muted-foreground text-sm shrink-0">
                      {formatDate(post.date, locale)}
                    </time>
                    {post.status === "in-progress" && (
                      <Badge
                        variant="secondary"
                        class="text-[10px] px-1.5 py-0"
                      >
                        WIP
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </>
  );
});
