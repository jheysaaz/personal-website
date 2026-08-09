import { assert, assertEquals, assertNotEquals } from "@std/assert";
import {
  formatDate,
  getPost,
  listPosts,
  parseFrontmatter,
} from "@/lib/library.ts";

Deno.test("parseFrontmatter parses title and date from frontmatter", () => {
  const text = `---
title: Hello World
date: 2026-01-15
---
Content here`;
  const result = parseFrontmatter(text);
  assertEquals(result.title, "Hello World");
  assertEquals(result.date, "2026-01-15");
  assertEquals(result.body, "Content here");
  assertEquals(result.status, "complete");
});

Deno.test("parseFrontmatter defaults status to complete when omitted", () => {
  const text = `---
title: No Status
date: 2026-01-15
---
Some body`;
  assertEquals(parseFrontmatter(text).status, "complete");
});

Deno.test("parseFrontmatter parses draft status", () => {
  const text = `---
title: Draft
date: 2026-01-15
status: draft
---
Body`;
  assertEquals(parseFrontmatter(text).status, "draft");
});

Deno.test("parseFrontmatter normalizes In Progress to in-progress", () => {
  const text = `---
title: WIP
date: 2026-06-01
status: In Progress
---
Body`;
  assertEquals(parseFrontmatter(text).status, "in-progress");
});

Deno.test("parseFrontmatter normalizes in-progress to in-progress", () => {
  const text = `---
title: WIP
date: 2026-06-01
status: in-progress
---
Body`;
  assertEquals(parseFrontmatter(text).status, "in-progress");
});

Deno.test("parseFrontmatter handles unknown status as complete", () => {
  const text = `---
title: Unknown
date: 2026-01-15
status: archived
---
Body`;
  assertEquals(parseFrontmatter(text).status, "complete");
});

Deno.test("parseFrontmatter returns defaults for text without frontmatter", () => {
  const result = parseFrontmatter("Just a plain text");
  assertEquals(result.title, "Untitled");
  assertEquals(result.date, "");
  assertEquals(result.body, "Just a plain text");
  assertEquals(result.status, "complete");
});

Deno.test("formatDate formats a full ISO datetime in English", () => {
  const result = formatDate("2026-06-01T12:00:00Z", "en");
  assert(result.includes("June"));
});

Deno.test("formatDate formats a full ISO datetime in Spanish", () => {
  const result = formatDate("2026-06-01T12:00:00Z", "es");
  assert(result.includes("junio"));
});

Deno.test("formatDate returns empty string for empty input", () => {
  assertEquals(formatDate("", "en"), "");
});

Deno.test("formatDate handles date-only strings", () => {
  const result = formatDate("2026-06-01", "en");
  assert(result.length > 0);
});

Deno.test("listPosts excludes draft posts", async () => {
  const posts = await listPosts();
  const slugs = posts.map((p) => p.slug);
  assert(!slugs.includes("draft-post"));
});

Deno.test("listPosts includes in-progress posts", async () => {
  const posts = await listPosts();
  const slugs = posts.map((p) => p.slug);
  assert(slugs.includes("in-progress-post"));
});

Deno.test("listPosts includes complete posts", async () => {
  const posts = await listPosts();
  const slugs = posts.map((p) => p.slug);
  assert(slugs.includes("first-post"));
});

Deno.test("listPosts returns posts sorted by date descending", async () => {
  const posts = await listPosts();
  for (let i = 1; i < posts.length; i++) {
    if (posts[i - 1].date && posts[i].date) {
      const prev = new Date(posts[i - 1].date).getTime();
      const curr = new Date(posts[i].date).getTime();
      assert(prev >= curr);
    }
  }
});

Deno.test("listPosts every post has required fields", async () => {
  const posts = await listPosts();
  for (const post of posts) {
    assert(post.slug);
    assert(post.title);
    assert(post.content);
    assert(["draft", "in-progress", "complete"].includes(post.status));
  }
});

Deno.test("getPost returns draft post when accessed directly", async () => {
  const post = await getPost("draft-post");
  assert(post !== null);
  assertEquals(post!.slug, "draft-post");
  assertEquals(post!.status, "draft");
});

Deno.test("getPost returns in-progress post", async () => {
  const post = await getPost("in-progress-post");
  assert(post !== null);
  assertEquals(post!.slug, "in-progress-post");
  assertEquals(post!.status, "in-progress");
});

Deno.test("getPost returns null for non-existent slug", async () => {
  const post = await getPost("this-does-not-exist");
  assertEquals(post, null);
});

Deno.test("getPost renders markdown content to HTML", async () => {
  const post = await getPost("first-post");
  assert(post !== null);
  assert(post!.content.includes("<h2"));
  assert(post!.content.includes("<p>"));
  assertNotEquals(post!.content, "");
  assert(!post!.content.includes("##"));
});

Deno.test("getPost every accessible post has an excerpt", async () => {
  const post = await getPost("first-post");
  assert(post !== null);
  assert(post!.excerpt.length > 0);
});
