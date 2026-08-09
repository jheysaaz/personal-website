import { define } from "@/utils/state.ts";
import { getSiteUrl, SeoHead } from "@/lib/seo.tsx";
import { projects } from "@/content/projects.ts";
import { TechBadgeList } from "@/components/tech-badge.tsx";

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="w-3 h-3"
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default define.page((props) => {
  const { intl } = props.state;
  const locale = intl.locale;
  const localeKey = locale as "en" | "es";

  return (
    <>
      <SeoHead
        title={intl.t("pages.lab.title")}
        description={intl.t("pages.lab.description")}
        url={`${getSiteUrl()}/${locale}/lab`}
      />
      <div class="space-y-8 md:space-y-12">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {intl.t("pages.lab.title")}
          </h1>
          <p class="text-foreground">{intl.t("pages.lab.description")}</p>
        </div>

        <div>
          {projects.map((project, i) => (
            <div key={project.title}>
              {i > 0 && <hr class="border-border my-6 md:my-8" />}
              <div class="space-y-4">
                <div>
                  <h2 class="text-lg font-medium text-foreground mb-2">
                    {project.title}
                  </h2>
                  <p class="text-foreground text-sm mb-4">
                    {project.description[localeKey]}
                  </p>
                </div>

                <TechBadgeList technologies={project.technologies} />

                <div class="flex gap-4 pt-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-foreground no-underline inline-flex items-center gap-1"
                    >
                      GitHub <ExternalLinkIcon />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-foreground no-underline inline-flex items-center gap-1"
                    >
                      Demo <ExternalLinkIcon />
                    </a>
                  )}
                  {project.links.chrome && (
                    <a
                      href={project.links.chrome}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-foreground no-underline inline-flex items-center gap-1"
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
    </>
  );
});
