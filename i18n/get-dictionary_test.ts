import { assert, assertEquals } from "@std/assert";
import { getDictionary } from "./get-dictionary.ts";
import type { Locale } from "./config.ts";

const locales: Locale[] = ["en", "es"];

Deno.test("getDictionary returns dictionary for each locale", async () => {
  for (const locale of locales) {
    const dict = await getDictionary(locale);
    assertEquals(typeof dict, "object");
  }
});

Deno.test("dictionary has required top-level keys", async () => {
  const requiredKeys = ["bio", "nav", "social", "meta", "pages", "navigation"];

  for (const locale of locales) {
    const dict = await getDictionary(locale);
    for (const key of requiredKeys) {
      assert(key in dict, `Missing key '${key}' in ${locale} dictionary`);
    }
  }
});

Deno.test("dictionaries have the same top-level keys across locales", async () => {
  const en = await getDictionary("en");
  const es = await getDictionary("es");
  assertEquals(Object.keys(en), Object.keys(es));
});
