import fs from "node:fs";
import path from "node:path";
import { render as markdownRender } from "@dreamer/markdown";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  status: "draft" | "in-progress" | "complete";
}

interface RawPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  status: "draft" | "in-progress" | "complete";
}

let cached: RawPost[] | null = null;

const LIBRARY_DIR = path.join(Deno.cwd(), "assets", "library");

function isDev(): boolean {
  return !Deno.env.get("DENO_DEPLOYMENT_ID");
}

export function parseFrontmatter(text: string): {
  title: string;
  date: string;
  body: string;
  status: "draft" | "in-progress" | "complete";
} {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (match) {
    const front = match[1];
    const body = match[2].trim();
    const title = front.match(/^title:\s*(.+)/m)?.[1]?.trim() || "Untitled";
    const date = front.match(/^date:\s*(.+)/m)?.[1]?.trim() || "";
    const rawStatus =
      front.match(/^status:\s*(.+)/m)?.[1]?.trim().toLowerCase() || "complete";
    const status = rawStatus === "draft"
      ? "draft"
      : rawStatus === "in progress" || rawStatus === "in-progress"
      ? "in-progress"
      : "complete";
    return { title, date, body, status };
  }
  return {
    title: "Untitled",
    date: "",
    body: text.trim(),
    status: "complete",
  };
}

function renderMarkdown(content: string): string {
  return markdownRender(content, {
    frontMatter: false,
    toc: false,
    gfm: true,
    math: false,
    containers: false,
    emoji: false,
    footnotes: false,
    definitionList: false,
    highlight_text: false,
    insertDelete: false,
    keyboard: false,
    superSubScript: false,
    abbreviations: false,
    autolink: true,
  }).html;
}

export function toPost(p: RawPost): Post {
  const rendered = renderMarkdown(p.content);
  const firstLine = p.content.split("\n\n")[0] ?? "";
  const excerpt = p.title === "Untitled"
    ? ""
    : firstLine.replace(/[#*`\[\]]/g, "").slice(0, 200);
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt,
    content: rendered,
    status: p.status,
  };
}

export function normalizeSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

async function listPostsFromFiles(): Promise<RawPost[]> {
  if (cached && !isDev()) {
    return cached;
  }

  const posts: RawPost[] = [];

  try {
    const entries = await fs.promises.readdir(LIBRARY_DIR);
    for (const entry of entries) {
      if (!entry.endsWith(".md")) continue;

      const slug = normalizeSlug(entry.replace(/\.md$/, ""));
      const text = await fs.promises.readFile(
        path.join(LIBRARY_DIR, entry),
        "utf-8",
      );
      const { title, date, body, status } = parseFrontmatter(text);
      posts.push({ slug, title, date, content: body, status });
    }
  } catch {
    cached = [];
    return [];
  }

  posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (!isDev()) {
    cached = posts;
  }
  return posts;
}

export async function listPosts(): Promise<Post[]> {
  const raw = await listPostsFromFiles();
  const filtered = raw.filter((p) => p.status !== "draft");
  return Promise.all(filtered.map(toPost));
}

export async function getPost(slug: string): Promise<Post | null> {
  const raw = await listPostsFromFiles();
  const normalized = normalizeSlug(slug);
  const found = raw.find((p) => p.slug === normalized);
  if (!found) return null;
  return toPost(found);
}
