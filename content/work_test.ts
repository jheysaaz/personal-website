import { assert, assertEquals } from "@std/assert";
import { workExperiences } from "./work.ts";

const locales = ["en", "es"] as const;

Deno.test("workExperiences has entries for all locales", () => {
  for (const locale of locales) {
    assert(
      workExperiences[locale].length > 0,
      `Missing work entries for locale: ${locale}`,
    );
  }
});

Deno.test("each work entry has required fields", () => {
  for (const locale of locales) {
    for (const entry of workExperiences[locale]) {
      assertEquals(typeof entry.title, "string", `Missing title in ${locale}`);
      assertEquals(
        typeof entry.company,
        "string",
        `Missing company in ${locale}`,
      );
      assertEquals(
        typeof entry.period,
        "string",
        `Missing period in ${locale}`,
      );
      assertEquals(
        typeof entry.description,
        "string",
        `Missing description in ${locale}`,
      );
      assert(
        Array.isArray(entry.achievements),
        `Missing achievements in ${locale}`,
      );
      assert(entry.achievements.length > 0, `Empty achievements in ${locale}`);
    }
  }
});

Deno.test("work entries have same count across locales", () => {
  assertEquals(workExperiences.en.length, workExperiences.es.length);
});
