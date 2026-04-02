import { notFound } from 'next/navigation';
import { locales, type Locale } from '../../i18n/config';
import { PageTransition } from '../../components/page-transition';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <PageTransition>
      <main className="min-h-screen">
        {children}
      </main>
    </PageTransition>
  );
}