import { define } from "../../utils.ts";
import { getDictionary } from "../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../utils/locale.ts";
import { projects } from "../../content/projects.ts";
import { BackNavigation } from "../../components/back-navigation.tsx";
import { TechBadgeList } from "../../components/tech-badge.tsx";
import { Head } from "fresh/runtime";
import { canonicalUrl, siteDefaults } from "../../utils/seo.ts";

export const handler = define.handlers(async (ctx) => {
  const locale = normalizeLocale(ctx.params.locale);
  const dict = await getDictionary(locale);
  return { data: { dict, locale } };
});

export default define.page<typeof handler>(({ data }) => {
  const { dict, locale } = data;
  const projectList = projects[locale];
  const canonical = canonicalUrl(`/${locale}/lab`);

  return (
    <div class="space-y-12">
      <Head>
        <title>{dict.pages.lab.title}</title>
        <meta name="description" content={dict.pages.lab.description} />
        <meta name="keywords" content={siteDefaults.keywords} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl("/en/lab")} />
        <link rel="alternate" hrefLang="es" href={canonicalUrl("/es/lab")} />
      </Head>
      <BackNavigation
        href={`/${locale}`}
        label={dict.navigation.returnToShip}
      />

      <div class="space-y-12">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {dict.pages.lab.title}
          </h1>
          <p class="text-foreground">
            {dict.pages.lab.description}
          </p>
        </div>

        <div class="grid gap-4">
          {projectList.map((project) => (
            <div
              key={project.title}
              class="bg-card border border-border rounded-lg p-5 hover:bg-muted transition-colors duration-200 space-y-4"
            >
              <div>
                <h2 class="text-lg font-medium text-foreground mb-2">
                  {project.title}
                </h2>
                <p class="text-foreground text-sm mb-4">
                  {project.description}
                </p>
              </div>

              <TechBadgeList technologies={project.technologies} />

              <div class="flex gap-4 pt-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-foreground no-persistent-underline inline-flex items-center gap-1"
                  >
                    GitHub
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-3 h-3"
                    >
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-foreground no-persistent-underline inline-flex items-center gap-1"
                  >
                    Demo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-3 h-3"
                    >
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {project.links.chrome && (
                  <a
                    href={project.links.chrome}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-foreground no-persistent-underline inline-flex items-center gap-1"
                  >
                    Chrome Store
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-3 h-3"
                    >
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
