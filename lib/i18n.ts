import { createIntlKit } from "@intlkit/intlkit";
import type { TranslateOptions } from "@intlkit/intlkit";
import en from "@/messages/en.json" with { type: "json" };
import es from "@/messages/es.json" with { type: "json" };

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

const kit = createIntlKit({
  defaultLocale,
  fallbackLocale: defaultLocale,
  messages: { en, es },
});

export interface SiteIntl {
  locale: Locale;
  /** Translates a dot-paths key, e.g. `t("bio.personal.prefix")`. */
  t: (key: string, options?: TranslateOptions) => string;
  has: (key: string) => boolean;
}

/** Builds a per-request translator bound to a locale. */
export function getIntl(locale: string): SiteIntl {
  const l = isLocale(locale) ? locale : defaultLocale;
  const translator = kit.translator(l);
  return {
    locale: l,
    t: (key, options) => translator.t(key, options),
    has: (key) => translator.has(key),
  };
}
