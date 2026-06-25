import { describe, it, expect } from "vitest";
import {
  parseFrontmatter,
  listPosts,
  getPost,
  formatDate,
} from "@/lib/library";

describe("parseFrontmatter", () => {
  it("parses title and date from frontmatter", () => {
    const text = `---
title: Hello World
date: 2026-01-15
---
Content here`;
    const result = parseFrontmatter(text);
    expect(result.title).toBe("Hello World");
    expect(result.date).toBe("2026-01-15");
    expect(result.body).toBe("Content here");
    expect(result.status).toBe("complete");
  });

  it("defaults status to complete when omitted", () => {
    const text = `---
title: No Status
date: 2026-01-15
---
Some body`;
    expect(parseFrontmatter(text).status).toBe("complete");
  });

  it("parses draft status", () => {
    const text = `---
title: Draft
date: 2026-01-15
status: draft
---
Body`;
    expect(parseFrontmatter(text).status).toBe("draft");
  });

  it("normalizes In Progress to in-progress", () => {
    const text = `---
title: WIP
date: 2026-06-01
status: In Progress
---
Body`;
    const result = parseFrontmatter(text);
    expect(result.status).toBe("in-progress");
  });

  it("normalizes in-progress to in-progress", () => {
    const text = `---
title: WIP
date: 2026-06-01
status: in-progress
---
Body`;
    expect(parseFrontmatter(text).status).toBe("in-progress");
  });

  it("handles unknown status as complete", () => {
    const text = `---
title: Unknown
date: 2026-01-15
status: archived
---
Body`;
    expect(parseFrontmatter(text).status).toBe("complete");
  });

  it("returns defaults for text without frontmatter", () => {
    const result = parseFrontmatter("Just a plain text");
    expect(result.title).toBe("Untitled");
    expect(result.date).toBe("");
    expect(result.body).toBe("Just a plain text");
    expect(result.status).toBe("complete");
  });
});

describe("formatDate", () => {
  it("formats a full ISO datetime in English", () => {
    const result = formatDate("2026-06-01T12:00:00Z", "en");
    expect(result).toContain("June");
  });

  it("formats a full ISO datetime in Spanish", () => {
    const result = formatDate("2026-06-01T12:00:00Z", "es");
    expect(result).toContain("junio");
  });

  it("returns empty string for empty input", () => {
    expect(formatDate("", "en")).toBe("");
  });

  it("handles date-only strings", () => {
    const result = formatDate("2026-06-01", "en");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("listPosts", () => {
  it("excludes draft posts", async () => {
    const posts = await listPosts();
    const slugs = posts.map((p) => p.slug);
    expect(slugs).not.toContain("draft-post");
  });

  it("includes in-progress posts", async () => {
    const posts = await listPosts();
    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("in-progress-post");
  });

  it("includes complete posts", async () => {
    const posts = await listPosts();
    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("first-post");
  });

  it("returns posts sorted by date descending", async () => {
    const posts = await listPosts();
    for (let i = 1; i < posts.length; i++) {
      if (posts[i - 1].date && posts[i].date) {
        expect(new Date(posts[i - 1].date).getTime())
          .toBeGreaterThanOrEqual(new Date(posts[i].date).getTime());
      }
    }
  });

  it("every post has required fields", async () => {
    const posts = await listPosts();
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.content).toBeTruthy();
      expect(["draft", "in-progress", "complete"]).toContain(post.status);
    }
  });
});

describe("getPost", () => {
  it("returns draft post when accessed directly", async () => {
    const post = await getPost("draft-post");
    expect(post).not.toBeNull();
    expect(post!.slug).toBe("draft-post");
    expect(post!.status).toBe("draft");
  });

  it("returns in-progress post", async () => {
    const post = await getPost("in-progress-post");
    expect(post).not.toBeNull();
    expect(post!.slug).toBe("in-progress-post");
    expect(post!.status).toBe("in-progress");
  });

  it("returns null for non-existent slug", async () => {
    const post = await getPost("this-does-not-exist");
    expect(post).toBeNull();
  });

  it("renders markdown content to HTML", async () => {
    const post = await getPost("first-post");
    expect(post).not.toBeNull();
    expect(post!.content).toContain("<h2>");
    expect(post!.content).toContain("<p>");
    expect(post!.content).not.toContain("##");
  });

  it("every accessible post has an excerpt", async () => {
    const post = await getPost("first-post");
    expect(post).not.toBeNull();
    expect(post!.excerpt.length).toBeGreaterThan(0);
  });
});
