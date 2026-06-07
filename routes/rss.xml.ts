import { Rss } from "@feed/feed";
import { define } from "../utils.ts";
import { listPosts } from "../utils/library.ts";
import { getSiteUrl, siteDefaults } from "../utils/seo.ts";

const toDate = (value: string | undefined): Date | undefined => {
  if (!value) return undefined;
  const date = value.includes("T")
    ? new Date(value)
    : new Date(`${value}T00:00:00-05:00`);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export const handler = define.handlers(async () => {
  const posts = await listPosts();
  const siteUrl = getSiteUrl();
  const libraryUrl = `${siteUrl}/en/library`;
  const feedUrl = `${siteUrl}/rss.xml`;

  const feed = new Rss({
    title: "Jheyson's Library",
    description:
      `${siteDefaults.description} (Library posts in English and Espanol.)`,
    link: libraryUrl,
    id: feedUrl,
    authors: [
      {
        name: siteDefaults.name,
      },
    ],
    language: "en",
    feed: feedUrl,
    copyright: `${new Date().getFullYear()} ${siteDefaults.name}`,
  });

  for (const post of posts) {
    const url = `${siteUrl}/en/library/${post.slug}`;
    const updated = toDate(post.date);
    feed.addItem({
      title: post.title,
      link: url,
      id: url,
      updated,
      description: post.excerpt || post.title,
      content: {
        body: post.content,
        type: "html",
      },
    });
  }

  const body = feed.build();

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
