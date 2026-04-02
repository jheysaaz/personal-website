'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '../i18n/config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  
  const getLocalizedPath = (locale: Locale) => {
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, '');
    return `/${locale}${pathWithoutLocale}`;
  };

  return (
    <div className="flex gap-2 text-sm">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          className={`${
            currentLocale === locale 
              ? 'text-foreground font-medium' 
              : 'text-muted-foreground hover:text-foreground'
          } transition-colors`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}