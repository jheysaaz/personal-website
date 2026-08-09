import { assert, assertEquals } from "@std/assert";
import en from "@/messages/en.json" with { type: "json" };
import es from "@/messages/es.json" with { type: "json" };

function flattenKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

Deno.test("i18n message files both locales have the same top-level keys", () => {
  const enKeys = Object.keys(en).sort();
  const esKeys = Object.keys(es).sort();
  assertEquals(enKeys, esKeys);
});

Deno.test("i18n message files both locales have identical key structure", () => {
  const enFlat = flattenKeys(en).sort();
  const esFlat = flattenKeys(es).sort();
  assertEquals(enFlat, esFlat);
});

Deno.test("i18n message files all string values are non-empty", () => {
  function checkEmpty(obj: Record<string, unknown>, path = "") {
    for (const [key, value] of Object.entries(obj)) {
      const fullPath = path ? `${path}.${key}` : key;
      if (typeof value === "string") {
        assert(value.trim().length > 0, `${fullPath} in en.json`);
      } else if (value && typeof value === "object") {
        checkEmpty(value as Record<string, unknown>, fullPath);
      }
    }
  }
  checkEmpty(en);
  checkEmpty(es);
});
