import { CSS, render, strip } from "@deno/gfm";

export { CSS as gfmCss };

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

interface RawPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

let cached: RawPost[] | null = null;

export function parseFrontmatter(text: string):
  & { title: string; date: string }
  & { body: string } {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (match) {
    const front = match[1];
    const body = match[2].trim();
    const title = front.match(/^title:\s*(.+)/m)?.[1]?.trim() || "Untitled";
    const date = front.match(/^date:\s*(.+)/m)?.[1]?.trim() || "";
    return { title, date, body };
  }
  return { title: "Untitled", date: "", body: text.trim() };
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await listPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function listPosts(): Promise<Post[]> {
  if (cached) {
    return cached.map(toPost);
  }

  const dir = `${Deno.cwd()}/assets/library`;
  const posts: RawPost[] = [];

  try {
    for await (const entry of Deno.readDir(dir)) {
      if (!entry.isFile || !entry.name.endsWith(".md")) continue;

      const slug = entry.name.replace(/\.md$/, "");
      const text = await Deno.readTextFile(`${dir}/${entry.name}`);
      const { title, date, body } = parseFrontmatter(text);
      posts.push({ slug, title, date, content: body });
    }
  } catch (_err) {
    cached = [];
    return [];
  }

  posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  cached = posts;
  return posts.map(toPost);
}

export function toPost(p: RawPost): Post {
  const rendered = render(p.content, {
    allowMath: false,
    disableHtmlSanitization: false,
  });
  const firstLine = p.content.split("\n\n")[0] ?? "";
  const excerpt = p.title === "Untitled" ? "" : strip(firstLine);
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt,
    content: rendered,
  };
}

export function formatDate(iso: string, locale: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}
