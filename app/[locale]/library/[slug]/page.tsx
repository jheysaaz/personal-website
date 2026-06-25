import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPost, formatDate } from "@/lib/library";

export const unstable_instant = false;
// unstable_instant = false: page awaits params for getTranslations + dynamic
// slug data. Same i18n pattern as the locale layout — kept as a documented Block.
import { getSiteUrl } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} — Jheyson Saavedra`,
    description: post.excerpt || post.title,
    alternates: { canonical: `${getSiteUrl()}/${locale}/library/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.date || undefined,
      url: `${getSiteUrl()}/${locale}/library/${post.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  const t = await getTranslations({ locale });

  if (!post) {
    notFound();
  }

  const statusLabel =
    post.status === "in-progress" ? "In Progress" :
    post.status === "draft" ? "Draft" : null;

  return (
    <div className="space-y-8 md:space-y-12">
      <article>
        <header className="mb-6 md:mb-8">
          <h1 className="text-[1.75rem] font-medium tracking-tight text-foreground mb-2 font-serif">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            {post.date && (
              <time className="text-sm text-muted-foreground">
                {formatDate(post.date, locale)}
              </time>
            )}
            {statusLabel && (
              <Badge variant="secondary" className="text-[10px]">
                {statusLabel}
              </Badge>
            )}
          </div>
        </header>
        <div
          className="markdown-body max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
