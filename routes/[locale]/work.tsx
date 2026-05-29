import { define } from "../../utils.ts";
import { getDictionary } from "../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../utils/locale.ts";
import { workExperiences } from "../../content/work.ts";
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
  const experiences = workExperiences[locale];
  const canonical = canonicalUrl(`/${locale}/work`);

  return (
    <div class="space-y-8 md:space-y-12">
      <Head>
        <title>{dict.pages.work.title}</title>
        <meta name="description" content={dict.pages.work.description} />
        <meta name="keywords" content={siteDefaults.keywords} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl("/en/work")} />
        <link rel="alternate" hrefLang="es" href={canonicalUrl("/es/work")} />
      </Head>
      <BackNavigation
        href={`/${locale}`}
        label={dict.navigation.backToBase}
      />

      <div class="space-y-8 md:space-y-12">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {dict.pages.work.title}
          </h1>
          <p class="text-foreground">
            {dict.pages.work.description}
          </p>
        </div>

        <div>
          {experiences.map((exp, index) => (
            <div key={index}>
              {index > 0 && <hr class="border-border my-8 md:my-12" />}
              <div class="space-y-4">
              <div>
                <h2 class="text-lg font-medium text-foreground">
                  {exp.title}
                </h2>
                <div class="flex items-center gap-2 text-sm text-foreground">
                  <span>{exp.company}</span>
                  <span>•</span>
                  <span>{exp.period}</span>
                </div>
              </div>

              <p class="text-foreground">
                {exp.description}
              </p>

              <ul class="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} class="text-sm text-foreground flex">
                    <span class="mr-2 text-foreground">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies && (
                <TechBadgeList technologies={exp.technologies} />
              )}
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
