import { assert, assertEquals, assertMatch } from "@std/assert";
import {
  formatDate,
  getPost,
  listPosts,
  parseFrontmatter,
  toPost,
} from "./library.ts";

Deno.test("parseFrontmatter extracts title, date, and body", () => {
  const text = `---
title: My First Post
date: 2026-01-15
---
This is the body content.`;
  const result = parseFrontmatter(text);
  assertEquals(result.title, "My First Post");
  assertEquals(result.date, "2026-01-15");
  assertEquals(result.body, "This is the body content.");
});

Deno.test("parseFrontmatter handles multiline body", () => {
  const text = `---
title: Another Post
date: 2026-03-20
---
First paragraph.

Second paragraph with **bold** text.`;
  const result = parseFrontmatter(text);
  assertEquals(result.title, "Another Post");
  assertEquals(result.date, "2026-03-20");
  assertMatch(result.body, /First paragraph/);
  assertMatch(result.body, /Second paragraph/);
});

Deno.test("parseFrontmatter returns defaults when no frontmatter", () => {
  const text = "Just a plain text body.";
  const result = parseFrontmatter(text);
  assertEquals(result.title, "Untitled");
  assertEquals(result.date, "");
  assertEquals(result.body, "Just a plain text body.");
});

Deno.test("parseFrontmatter handles missing optional fields", () => {
  const text = `---
title: Only Title
---
Body content here.`;
  const result = parseFrontmatter(text);
  assertEquals(result.title, "Only Title");
  assertEquals(result.date, "");
  assertEquals(result.body, "Body content here.");
});

Deno.test("toPost renders markdown and generates excerpt", () => {
  const raw = {
    slug: "test-post",
    title: "Test Post",
    date: "2026-01-15",
    content: "First paragraph here.\n\nSecond paragraph with **bold**.",
  };
  const post = toPost(raw);
  assertEquals(post.slug, "test-post");
  assertEquals(post.title, "Test Post");
  assertEquals(post.date, "2026-01-15");
  assertMatch(post.excerpt, /First paragraph/);
  assertMatch(post.content, /<p>/);
  assertMatch(post.content, /<strong>/);
});

Deno.test("toPost returns empty excerpt when title is Untitled", () => {
  const raw = {
    slug: "untitled",
    title: "Untitled",
    date: "2026-01-15",
    content: "Some content here.",
  };
  const post = toPost(raw);
  assertEquals(post.excerpt, "");
});

Deno.test("getPost returns post for existing slug", async () => {
  const post = await getPost("first-post");
  assert(post !== null, "Expected post to exist");
  const p = post!;
  assertEquals(p.slug, "first-post");
  assertEquals(p.title, "Hello, World");
  assertEquals(p.date, "2026-05-28");
  assertMatch(p.excerpt, /This is my first post/);
  assertMatch(p.content, /<p>/);
});

Deno.test("getPost returns null for nonexistent slug", async () => {
  const post = await getPost("nonexistent-post");
  assertEquals(post, null);
});

Deno.test("listPosts returns posts and uses cache on second call", async () => {
  const first = await listPosts();
  assert(first.length > 0);
  assertEquals(first[0].slug, "first-post");

  const second = await listPosts();
  assertEquals(second.length, first.length);
  assertEquals(second[0].slug, "first-post");
});

Deno.test("formatDate returns formatted date for valid ISO string", () => {
  const result = formatDate("2026-01-15T12:00:00Z", "en");
  assertEquals(result, "January 15, 2026");
});

Deno.test("formatDate returns formatted date for Spanish locale", () => {
  const result = formatDate("2026-01-15T12:00:00Z", "es");
  assertEquals(result, "15 de enero de 2026");
});

Deno.test("formatDate returns empty string for empty input", () => {
  assertEquals(formatDate("", "en"), "");
});

Deno.test("formatDate returns raw input on invalid date", () => {
  const result = formatDate("not-a-date", "en");
  assertEquals(result, "not-a-date");
});
