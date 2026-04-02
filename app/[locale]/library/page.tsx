import type { Metadata } from 'next';
import { getDictionary } from '../../../i18n/get-dictionary';
import type { Locale } from '../../../i18n/config';
import { BackNavigation } from '../../../components/back-navigation';

interface LibraryProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LibraryProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  
  return {
    title: dict.pages.library.title,
    description: dict.pages.library.description,
    alternates: {
      canonical: `/${locale}/library`,
      languages: {
        en: '/en/library',
        es: '/es/library',
      },
    },
  };
}

export default async function Library({ params }: LibraryProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="space-y-12">
      <BackNavigation href={`/${locale}`} label={dict.navigation.backToGround} />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {dict.pages.library.title}
          </h1>
          <p className="text-foreground">
            {dict.pages.library.description}
          </p>
        </div>

        <div className="text-center py-16">
          <p className="text-foreground text-lg">
            {dict.pages.library.wip}
          </p>
        </div>
      </div>
    </div>
  );
}