import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { projects } from "@/content/projects";
import { TechBadgeList } from "@/components/tech-badge";
import { getSiteUrl } from "@/lib/seo";

export const unstable_instant = false;
// unstable_instant = false: page awaits params for getTranslations. Same i18n
// pattern as the locale layout — kept as a documented Block.

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.lab" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `${getSiteUrl()}/${locale}/lab` },
  };
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="w-3 h-3"
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const localeKey = locale as "en" | "es";

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="space-y-8 md:space-y-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {t("pages.lab.title")}
          </h1>
          <p className="text-foreground">{t("pages.lab.description")}</p>
        </div>

        <div>
          {projects.map((project, i) => (
            <div key={project.title}>
              {i > 0 && <hr className="border-border my-6 md:my-8" />}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-foreground mb-2">
                    {project.title}
                  </h2>
                  <p className="text-foreground text-sm mb-4">
                    {project.description[localeKey]}
                  </p>
                </div>

                <TechBadgeList technologies={project.technologies} />

                <div className="flex gap-4 pt-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground no-underline inline-flex items-center gap-1"
                    >
                      GitHub <ExternalLinkIcon />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground no-underline inline-flex items-center gap-1"
                    >
                      Demo <ExternalLinkIcon />
                    </a>
                  )}
                  {project.links.chrome && (
                    <a
                      href={project.links.chrome}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground no-underline inline-flex items-center gap-1"
                    >
                      Chrome Store <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
