import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { listPosts, formatDate } from "@/lib/library";

export const unstable_instant = false;
// unstable_instant = false: page awaits params for getTranslations. Same i18n
// pattern as the locale layout — kept as a documented Block.
import { getSiteUrl } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.library" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${getSiteUrl()}/${locale}/library` },
  };
}

export default async function LibraryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const posts = await listPosts();

  return (
    <div className="space-y-8 md:space-y-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
          {t("pages.library.title")}
        </h1>
        <p className="text-foreground mb-8 md:mb-12">
          {t("pages.library.description")}
        </p>

        {posts.length === 0
          ? <p className="text-muted-foreground">{t("pages.library.wip")}</p>
          : (
            <div className="space-y-2">
              {posts.map((post) => (
                <div key={post.slug} className="flex items-baseline gap-2">
                  <Link
                    href={`/${locale}/library/${post.slug}`}
                    className="no-underline text-foreground hover:opacity-70 transition-opacity"
                  >
                    {post.title}
                  </Link>
                  <time className="text-muted-foreground text-sm shrink-0">
                    {formatDate(post.date, locale)}
                  </time>
                  {post.status === "in-progress" && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      WIP
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
