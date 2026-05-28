import { defaultLocale, type Locale, locales } from "../i18n/config.ts";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function normalizeLocale(value: string | undefined): Locale {
  if (value && isLocale(value)) {
    return value;
  }
  return defaultLocale;
}
