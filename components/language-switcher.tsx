import { locales } from "@/lib/i18n.ts";

const LANG_RE = /^\/(en|es)(?=\/|$)/;

export function LanguageSwitcher({ currentPath }: { currentPath: string }) {
  const pathWithoutLocale = currentPath.replace(LANG_RE, "") || "/";
  const currentLocale = currentPath.startsWith("/es") ? "es" : "en";

  return (
    <div class="flex gap-2 text-sm select-none">
      {locales.map((locale) => {
        const href = pathWithoutLocale === "/"
          ? `/${locale}`
          : `/${locale}${pathWithoutLocale}`;
        return (
          <a
            key={locale}
            href={href}
            class={currentLocale === locale
              ? "no-underline opacity-100 font-semibold"
              : "no-underline opacity-75 hover:opacity-100 transition-opacity"}
          >
            {locale.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
