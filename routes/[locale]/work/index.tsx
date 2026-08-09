import { define } from "@/utils/state.ts";
import { getSiteUrl, SeoHead } from "@/lib/seo.tsx";
import { workExperiences } from "@/content/work.ts";
import { TechBadgeList } from "@/components/tech-badge.tsx";

export default define.page((props) => {
  const { intl } = props.state;
  const locale = intl.locale;
  const localeKey = locale as "en" | "es";

  return (
    <>
      <SeoHead
        title={intl.t("pages.work.title")}
        description={intl.t("pages.work.description")}
        url={`${getSiteUrl()}/${locale}/work`}
      />
      <div class="space-y-8 md:space-y-12">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {intl.t("pages.work.title")}
          </h1>
          <p class="text-foreground">{intl.t("pages.work.description")}</p>
        </div>

        <div>
          {workExperiences.map((exp, index) => (
            <div key={index}>
              {index > 0 && <hr class="border-border my-8 md:my-12" />}
              <div class="space-y-4">
                <div>
                  <h2 class="text-lg font-medium text-foreground">
                    {exp.title[localeKey]}
                  </h2>
                  <div class="flex items-center gap-2 text-sm text-foreground">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span>{exp.period[localeKey]}</span>
                  </div>
                </div>

                <p class="text-foreground">{exp.description[localeKey]}</p>

                <ul class="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} class="text-sm text-foreground flex">
                      <span class="mr-2 text-foreground">•</span>
                      <span>{achievement[localeKey]}</span>
                    </li>
                  ))}
                </ul>

                {exp.technologies && (
                  <TechBadgeList
                    technologies={exp.technologies.map((t) => t[localeKey])}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
