import { define } from "@/utils/state.ts";
import { getSiteUrl, siteDefaults } from "@/lib/seo.tsx";
import { listPosts } from "@/lib/library.ts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const handler = define.handlers({
  async GET(_ctx) {
    const posts = await listPosts();
    const siteUrl = getSiteUrl();
    const libraryUrl = `${siteUrl}/en/library`;
    const feedUrl = `${siteUrl}/rss.xml`;
    const year = new Date().getFullYear();

    const items = posts.map((post) => {
      const url = `${siteUrl}/en/library/${post.slug}`;
      const updated = post.date
        ? post.date.includes("T")
          ? new Date(post.date)
          : new Date(`${post.date}T00:00:00-05:00`)
        : undefined;

      if (updated && Number.isNaN(updated.getTime())) return null;

      const date = (updated || new Date()).toUTCString();
      const description = escapeXml(post.excerpt || post.title);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${date}</pubDate>
      <description>${description}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`;
    }).filter((item): item is string => item !== null);

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Jheyson's Library</title>
    <link>${libraryUrl}</link>
    <description>${
      escapeXml(
        `${siteDefaults.description} (Library posts in English and Espanol.)`,
      )
    }</description>
    <language>en</language>
    <copyright>${year} ${siteDefaults.name}</copyright>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${items.join("\n")}
  </channel>
</rss>
`;

    return new Response(body, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
});
