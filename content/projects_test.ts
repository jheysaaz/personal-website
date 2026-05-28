import { assert, assertEquals } from "@std/assert";
import { projects } from "./projects.ts";

const locales = ["en", "es"] as const;

Deno.test("projects has entries for all locales", () => {
  for (const locale of locales) {
    assert(
      projects[locale].length > 0,
      `Missing projects for locale: ${locale}`,
    );
  }
});

Deno.test("each project entry has required fields", () => {
  for (const locale of locales) {
    for (const entry of projects[locale]) {
      assertEquals(typeof entry.title, "string", `Missing title in ${locale}`);
      assertEquals(
        typeof entry.description,
        "string",
        `Missing description in ${locale}`,
      );
      assertEquals(
        typeof entry.longDescription,
        "string",
        `Missing longDescription in ${locale}`,
      );
      assert(
        Array.isArray(entry.technologies),
        `Missing technologies in ${locale}`,
      );
      assert(entry.technologies.length > 0, `Empty technologies in ${locale}`);
      assertEquals(
        typeof entry.status,
        "string",
        `Missing status in ${locale}`,
      );
      assertEquals(
        typeof entry.featured,
        "boolean",
        `Missing featured in ${locale}`,
      );
      assert(
        ["active", "completed", "archived"].includes(entry.status),
        `Invalid status '${entry.status}' in ${locale}`,
      );
    }
  }
});

Deno.test("projects have same count across locales", () => {
  assertEquals(projects.en.length, projects.es.length);
});

Deno.test("project links contain at least one URL", () => {
  for (const locale of locales) {
    for (const entry of projects[locale]) {
      const hasLink = entry.links.github || entry.links.demo ||
        entry.links.chrome;
      assert(hasLink, `No links for project '${entry.title}' in ${locale}`);
    }
  }
});
