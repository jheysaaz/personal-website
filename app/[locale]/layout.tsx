import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/language-switcher";
import SideNav from "@/components/side-nav";
import MobileNav from "@/components/mobile-nav";
import type { NavItem } from "@/components/side-nav";

export const unstable_instant = false;
// unstable_instant = false: locale-dependent layout needs request-time params
// to configure i18n. Kept as a documented Block — the locale is inherently
// per-request and the layout wraps all pages in NextIntlClientProvider.

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  const navItems: NavItem[] = [
    { key: "home", label: t("home"), href: `/${locale}` },
    { key: "work", label: t("work"), href: `/${locale}/work` },
    { key: "lab", label: t("lab"), href: `/${locale}/lab` },
    { key: "library", label: t("library"), href: `/${locale}/library` },
    { key: "music", label: t("music"), href: `/${locale}/music` },
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SideNav items={navItems} />
      <main className="max-w-2xl mx-auto px-4 py-6 md:py-12 sm:px-6 lg:px-8 w-full relative">
        <div className="flex items-center justify-between md:justify-end mb-3 md:mb-8">
          <MobileNav items={navItems} />
          <LanguageSwitcher />
        </div>
        <ViewTransition name="page">
          {children}
        </ViewTransition>
      </main>
    </NextIntlClientProvider>
  );
}
