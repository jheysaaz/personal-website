import Link from 'next/link';
import { getDictionary } from '../../i18n/get-dictionary';
import type { Locale } from '../../i18n/config';
import { LanguageSwitcher } from '../../components/language-switcher';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-start mb-16">
        <div></div>
        <LanguageSwitcher currentLocale={locale as Locale} />
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
            {dict.bio.title}
          </h1>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{dict.bio.description}</p>
            <p>{dict.bio.current}</p>
            <p>{dict.bio.personal}</p>
          </div>
        </div>

        <nav className="flex gap-6 pt-4 border-t border-border">
          <Link 
            href={`/${locale}/work`} 
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            {dict.nav.work}
          </Link>
          <Link 
            href={`/${locale}/library`} 
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            {dict.nav.library}
          </Link>
          <Link 
            href={`/${locale}/lab`} 
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            {dict.nav.lab}
          </Link>
        </nav>

        <footer className="flex gap-4 pt-8">
          <a 
            href="https://github.com/jheysaaz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.social.github}
          </a>
          <a 
            href="https://linkedin.com/in/jheysaaz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.social.linkedin}
          </a>
          <a 
            href="https://x.com/jheysaaz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.social.twitter}
          </a>
          <a 
            href="mailto:contact@jheysonsaavedra.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.nav.contact}
          </a>
        </footer>
      </div>
    </div>
  );
}