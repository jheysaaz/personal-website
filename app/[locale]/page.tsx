import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteUrl } from "@/lib/seo";

export const unstable_instant = false;
// unstable_instant = false: page awaits params for getTranslations. Needs a
// locale, which is inherently per-request. Kept as a documented Block until
// the i18n data flow can be restructured to use a cached caching boundary.

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bio" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const title = `${t("name")} - ${meta("description")}`;

  return {
    title,
    description: t("description"),
    alternates: {
      canonical: `${getSiteUrl()}/${locale}`,
    },
    openGraph: {
      title,
      description: t("description"),
      url: `${getSiteUrl()}/${locale}`,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bio" });

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-6">
          <p className="text-lg text-foreground mb-1">{t("greeting")}</p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            {t("name")}
          </h1>
        </div>

        <div className="space-y-5 text-foreground leading-relaxed">
          <p>{t("description")}</p>
          <p>{t("background")}</p>
          <p>
            {t("personal.prefix")}{" "}
            <Link className="primary-link" href={`/${locale}/work`}>{t("personal.work")}</Link>
            {t("personal.afterWork")}{" "}
            <Link className="primary-link" href={`/${locale}/lab`}>{t("personal.lab")}</Link>{" "}
            {t("personal.afterLab")}{" "}
            <Link className="primary-link" href={`/${locale}/library`}>{t("personal.library")}</Link>{" "}
            {t("personal.afterLibrary")}{" "}
            <Link className="primary-link" href={`/${locale}/music`}>{t("personal.music")}</Link>
            {t("personal.suffix")}
          </p>
          <p>
            {t("connect.prefix")}{" "}
            <a className="primary-link external-link" href="https://github.com/jheysaaz" target="_blank" rel="noopener noreferrer">
              {t("connect.code")}
            </a>
            {t("connect.afterCode")}{" "}
            <a className="primary-link external-link" href="https://linkedin.com/in/jheysaaz" target="_blank" rel="noopener noreferrer">
              {t("connect.linkedin")}
            </a>
            {t("connect.afterLinkedin")}{" "}
            <a className="primary-link external-link" href="https://x.com/jheysaaz" target="_blank" rel="noopener noreferrer">
              {t("connect.twitter")}
            </a>{" "}
            {t("connect.afterTwitter")}{" "}
            <a className="primary-link" href="mailto:contact@jheysonsaavedra.com">
              {t("connect.email")}
            </a>{" "}
            {t("connect.suffix")}
          </p>
        </div>
      </div>
    </div>
  );
}
