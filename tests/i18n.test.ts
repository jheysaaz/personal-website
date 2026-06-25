import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

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

describe("i18n message files", () => {
  it("message files exist", () => {
    expect(existsSync("messages/en.json")).toBe(true);
    expect(existsSync("messages/es.json")).toBe(true);
  });

  it("both locales have the same top-level keys", () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it("both locales have identical key structure", () => {
    const enFlat = flattenKeys(en).sort();
    const esFlat = flattenKeys(es).sort();
    expect(enFlat).toEqual(esFlat);
  });

  it("all string values are non-empty", () => {
    function checkEmpty(obj: Record<string, unknown>, path = "") {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(value.trim().length, `${fullPath} in en.json`).toBeGreaterThan(0);
        } else if (value && typeof value === "object") {
          checkEmpty(value as Record<string, unknown>, fullPath);
        }
      }
    }
    checkEmpty(en);
    checkEmpty(es);
  });
});
