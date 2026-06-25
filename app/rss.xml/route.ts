import { Feed } from "feed";
import { listPosts } from "@/lib/library";
import { getSiteUrl, siteDefaults } from "@/lib/seo";

export async function GET() {
  const posts = await listPosts();
  const siteUrl = getSiteUrl();
  const libraryUrl = `${siteUrl}/en/library`;
  const feedUrl = `${siteUrl}/rss.xml`;

  const feed = new Feed({
    title: "Jheyson's Library",
    description:
      `${siteDefaults.description} (Library posts in English and Espanol.)`,
    link: libraryUrl,
    id: feedUrl,
    author: { name: siteDefaults.name },
    language: "en",
    copyright: `${new Date().getFullYear()} ${siteDefaults.name}`,
    feed: feedUrl,
  });

  for (const post of posts) {
    const url = `${siteUrl}/en/library/${post.slug}`;
    const updated = post.date
      ? post.date.includes("T")
        ? new Date(post.date)
        : new Date(`${post.date}T00:00:00-05:00`)
      : undefined;

    if (updated && Number.isNaN(updated.getTime())) continue;

    feed.addItem({
      title: post.title,
      link: url,
      id: url,
      date: updated || new Date(),
      description: post.excerpt || post.title,
      content: post.content,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
