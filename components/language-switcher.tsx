'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  
  // Determine current locale and clean path
  const isSpanish = pathname.startsWith('/es');
  const currentLocale = isSpanish ? 'es' : 'en';
  
  // Extract the actual path without locale prefix
  const cleanPath = isSpanish 
    ? pathname.replace(/^\/es/, '') || '/' 
    : pathname.replace(/^\/en/, '') || '/';
  
  const getLocalizedPath = (locale: 'en' | 'es') => {
    if (locale === 'en') {
      // For English: use clean path directly (or /en + clean path)
      return cleanPath === '/' ? '/en' : `/en${cleanPath}`;
    } else {
      // For Spanish: add /es prefix to clean path  
      return cleanPath === '/' ? '/es' : `/es${cleanPath}`;
    }
  };

  return (
    <div className="language-switcher flex gap-2 text-sm">
      <Link
        href={getLocalizedPath('en')}
        className={currentLocale === 'en' ? 'active' : ''}
      >
        EN
      </Link>
      <Link
        href={getLocalizedPath('es')}
        className={currentLocale === 'es' ? 'active' : ''}
      >
        ES
      </Link>
    </div>
  );
}