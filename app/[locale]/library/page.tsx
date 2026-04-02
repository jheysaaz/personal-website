import Link from 'next/link';
import { getDictionary } from '../../../i18n/get-dictionary';
import type { Locale } from '../../../i18n/config';
import { LanguageSwitcher } from '../../../components/language-switcher';

interface LibraryProps {
  params: Promise<{ locale: string }>;
}

export default async function Library({ params }: LibraryProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-start mb-16">
        <Link 
          href={`/${locale}`} 
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← {dict.bio.title}
        </Link>
        <LanguageSwitcher currentLocale={locale as Locale} />
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {dict.pages.library.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {dict.pages.library.description}
          </p>
        </div>

        <div className="border border-border rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-muted-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" 
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-foreground mb-2 font-serif">
            {dict.pages.library.wip}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-serif">
            This space will contain philosophical essays, academic writing, and reflections on epistemology, ethics, and the intersection of logic and data analysis.
          </p>
        </div>
      </div>
    </div>
  );
}