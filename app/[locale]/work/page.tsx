import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { workExperiences } from "@/content/work";
import { TechBadgeList } from "@/components/tech-badge";
import { getSiteUrl } from "@/lib/seo";

export const unstable_instant = false;
// unstable_instant = false: page awaits params for getTranslations. Same i18n
// pattern as the locale layout — kept as a documented Block.

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.work" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${getSiteUrl()}/${locale}/work` },
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const localeKey = locale as "en" | "es";

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="space-y-8 md:space-y-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {t("pages.work.title")}
          </h1>
          <p className="text-foreground">{t("pages.work.description")}</p>
        </div>

        <div>
          {workExperiences.map((exp, index) => (
            <div key={index}>
              {index > 0 && <hr className="border-border my-8 md:my-12" />}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-foreground">
                    {exp.title[localeKey]}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span>{exp.period[localeKey]}</span>
                  </div>
                </div>

                <p className="text-foreground">{exp.description[localeKey]}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-foreground flex">
                      <span className="mr-2 text-foreground">•</span>
                      <span>{achievement[localeKey]}</span>
                    </li>
                  ))}
                </ul>

                {exp.technologies && (
                  <TechBadgeList technologies={exp.technologies.map(t => t[localeKey])} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
