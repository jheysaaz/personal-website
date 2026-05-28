import { assertEquals } from "@std/assert";
import { isLocale, normalizeLocale } from "./locale.ts";

Deno.test("isLocale returns true for valid locales", () => {
  assertEquals(isLocale("en"), true);
  assertEquals(isLocale("es"), true);
});

Deno.test("isLocale returns false for invalid locales", () => {
  assertEquals(isLocale("fr"), false);
  assertEquals(isLocale(""), false);
  assertEquals(isLocale("en-US"), false);
});

Deno.test("normalizeLocale returns the locale when valid", () => {
  assertEquals(normalizeLocale("en"), "en");
  assertEquals(normalizeLocale("es"), "es");
});

Deno.test("normalizeLocale returns default for undefined", () => {
  assertEquals(normalizeLocale(undefined), "en");
});

Deno.test("normalizeLocale returns default for invalid locale", () => {
  assertEquals(normalizeLocale("fr"), "en");
  assertEquals(normalizeLocale("en-US"), "en");
});
