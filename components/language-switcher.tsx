"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const locales = ["en", "es"] as const;

export function LanguageSwitcher() {
  const pathname = usePathname();

  const currentLocale = pathname.startsWith("/es") ? "es" : "en";

  function getLocalizedPath(locale: string): string {
    const clean = locales.reduce<string>((p, l) => {
      return p.startsWith(`/${l}`) ? p.replace(`/${l}`, "") || "/" : p;
    }, pathname);
    return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
  }

  return (
    <div className="flex gap-2 text-sm select-none">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          className={
            currentLocale === locale
              ? "no-underline opacity-100 font-semibold"
              : "no-underline opacity-75 hover:opacity-100 transition-opacity"
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
