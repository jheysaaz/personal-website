import type { Locale } from "./config.ts";

const dictionaries = {
  en: () =>
    import("./dictionaries/en.json", { with: { type: "json" } }).then(
      (m) => m.default,
    ),
  es: () =>
    import("./dictionaries/es.json", { with: { type: "json" } }).then(
      (m) => m.default,
    ),
};

export const getDictionary = async (locale: Locale) =>
  await dictionaries[locale]();
