import { define } from "@/utils/state.ts";
import { HttpError } from "fresh";
import { getSiteUrl, SeoHead } from "@/lib/seo.tsx";
import { formatDate, getPost } from "@/lib/library.ts";
import { Badge } from "@/components/ui/badge.tsx";

export const handler = define.handlers({
  async GET(ctx) {
    const slug = ctx.params.slug;
    const post = await getPost(slug);
    if (!post) throw new HttpError(404);
    return { data: { post } };
  },
});

export default define.page<typeof handler>((props) => {
  const { intl } = props.state;
  const locale = intl.locale;
  const { post } = props.data;

  const statusLabel = post.status === "in-progress"
    ? "In Progress"
    : post.status === "draft"
    ? "Draft"
    : null;

  return (
    <>
      <SeoHead
        title={`${post.title} — Jheyson Saavedra`}
        description={post.excerpt || post.title}
        url={`${getSiteUrl()}/${locale}/library/${post.slug}`}
        publishedTime={post.date || undefined}
      />
      <div class="space-y-8 md:space-y-12">
        <article>
          <header class="mb-6 md:mb-8">
            <h1 class="text-[1.75rem] font-medium tracking-tight text-foreground mb-2 font-serif">
              {post.title}
            </h1>
            <div class="flex items-center gap-3">
              {post.date && (
                <time class="text-sm text-muted-foreground">
                  {formatDate(post.date, locale)}
                </time>
              )}
              {statusLabel && (
                <Badge variant="secondary" class="text-[10px]">
                  {statusLabel}
                </Badge>
              )}
            </div>
          </header>
          <div
            class="markdown-body max-w-none"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </>
  );
});
