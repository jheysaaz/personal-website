import { define } from "../../utils.ts";
import { getDictionary } from "../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../utils/locale.ts";
import { projects } from "../../content/projects.ts";
import { BackNavigation } from "../../components/back-navigation.tsx";
import { TechBadgeList } from "../../components/tech-badge.tsx";
import { SquareArrowOutUpRight } from "lucide-preact";
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

        <div class="grid gap-8">
          {projectList.map((project) => (
            <div
              key={project.title}
              class="space-y-4 pb-8 border-b border-border last:border-0"
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
                    <SquareArrowOutUpRight class="w-3 h-3" />
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
                    <SquareArrowOutUpRight class="w-3 h-3" />
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
                    <SquareArrowOutUpRight class="w-3 h-3" />
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
