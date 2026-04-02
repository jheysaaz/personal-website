import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '../../i18n/get-dictionary';
import type { Locale } from '../../i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jheysonsaavedra.com';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  
  return {
    title: `${dict.bio.name} - ${dict.meta.description}`,
    description: dict.bio.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
      },
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jheyson Saavedra',
    url: siteUrl,
    jobTitle: 'Data Analyst',
    description: dict.bio.description,
    sameAs: [
      'https://github.com/jheysaaz',
      'https://linkedin.com/in/jheysaaz',
      'https://x.com/jheysaaz',
    ],
    knowsAbout: ['Data Analysis', 'Philosophy', 'SQL', 'BigQuery', 'Looker Studio', 'Fraud Detection'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <div>
          <div className="mb-6">
            <p className="text-lg text-foreground mb-1">{dict.bio.greeting}</p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              {dict.bio.name}
            </h1>
          </div>
          
          <div className="space-y-5 text-foreground leading-relaxed">
            <p>{dict.bio.description}</p>
            <p>{dict.bio.current}</p>
            <p className="hidden md:block">{dict.bio.background}</p>
            <p>
              {dict.bio.personal.prefix}{' '}
              <Link href={`/${locale}/work`} className="body-link">{dict.bio.personal.work}</Link>
              {dict.bio.personal.afterWork}{' '}
              <Link href={`/${locale}/lab`} className="body-link">{dict.bio.personal.lab}</Link>
              {' '}{dict.bio.personal.afterLab}{' '}
              <Link href={`/${locale}/library`} className="body-link">{dict.bio.personal.library}</Link>
              {' '}{dict.bio.personal.afterLibrary}{' '}
              <Link href={`/${locale}/music`} className="body-link">{dict.bio.personal.music}</Link>
              {dict.bio.personal.suffix}
            </p>
            <p>
              {dict.bio.connect.prefix}{' '}
              <a href="https://github.com/jheysaaz" target="_blank" rel="noopener noreferrer" className="body-link">{dict.bio.connect.code}</a>
              {dict.bio.connect.afterCode}{' '}
              <a href="https://linkedin.com/in/jheysaaz" target="_blank" rel="noopener noreferrer" className="body-link">{dict.bio.connect.linkedin}</a>
              {dict.bio.connect.afterLinkedin}{' '}
              <a href="https://x.com/jheysaaz" target="_blank" rel="noopener noreferrer" className="body-link">{dict.bio.connect.twitter}</a>
              {' '}{dict.bio.connect.afterTwitter}{' '}
              <a href="mailto:contact@jheysonsaavedra.com" className="body-link">{dict.bio.connect.email}</a>
              {' '}{dict.bio.connect.suffix}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}