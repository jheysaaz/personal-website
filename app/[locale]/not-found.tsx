import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const unstable_instant = false;
// unstable_instant = false: page awaits params for getTranslations. Same i18n
// pattern as the locale layout — kept as a documented Block.

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) ?? {};
  const t = await getTranslations({ locale: locale ?? "en", namespace: "pages.notFound" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleNotFound({ params }: Props) {
  const { locale } = (await params) ?? {};
  const t = await getTranslations({ locale: locale ?? "en" });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <section className="text-center py-10 md:py-16">
        <h1 className="font-semibold text-6xl mb-4 tracking-tighter font-serif">
          404
        </h1>
        <h2 className="font-semibold text-2xl mb-6 md:mb-8 tracking-tighter font-serif">
          {t("pages.notFound.title")}
        </h2>
        <p className="mb-6 md:mb-8 max-w-md mx-auto">
          {t("pages.notFound.description")}
        </p>
        <Link
          href={`/${locale}`}
          className="underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {t("navigation.backToGround")}
        </Link>
      </section>
    </div>
  );
}
