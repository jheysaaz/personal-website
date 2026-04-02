import type { Locale } from '../../i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  return (
    <div lang={locale as Locale}>
      {children}
    </div>
  );
}
