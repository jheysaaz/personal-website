import { define } from "../../utils.ts";
import { getDictionary } from "../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../utils/locale.ts";
import { getSiteUrl } from "../../utils/seo.ts";
import { SEO } from "../../components/seo.tsx";

export const handler = define.handlers(async (ctx) => {
  const locale = normalizeLocale(ctx.params.locale);
  const dict = await getDictionary(locale);
  return { data: { dict, locale } };
});

export default define.page<typeof handler>(({ data }) => {
  const { dict, locale } = data;
  const siteUrl = getSiteUrl();
  const title = `${dict.bio.name} - ${dict.meta.description}`;
  const description = dict.bio.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jheyson Saavedra",
    url: siteUrl,
    jobTitle: "Data Analyst",
    description: dict.bio.description,
    sameAs: [
      "https://github.com/jheysaaz",
      "https://linkedin.com/in/jheysaaz",
      "https://x.com/jheysaaz",
    ],
    knowsAbout: [
      "Data Analysis",
      "Philosophy",
      "SQL",
      "BigQuery",
      "Looker Studio",
      "Fraud Detection",
    ],
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        path=""
        locale={locale}
        jsonLd={jsonLd}
      />
      <div class="space-y-8">
        <div>
          <div class="mb-6">
            <p class="text-lg text-foreground mb-1">{dict.bio.greeting}</p>
            <h1 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
              {dict.bio.name}
            </h1>
          </div>

          <div class="space-y-5 text-foreground leading-relaxed">
            <p>{dict.bio.description}</p>
            <p>{dict.bio.background}</p>
            <p>
              {dict.bio.personal.prefix}{" "}
              <a href={`/${locale}/work`} class="body-link">
                {dict.bio.personal.work}
              </a>
              {dict.bio.personal.afterWork}{" "}
              <a href={`/${locale}/lab`} class="body-link">
                {dict.bio.personal.lab}
              </a>{" "}
              {dict.bio.personal.afterLab}{" "}
              <a href={`/${locale}/library`} class="body-link">
                {dict.bio.personal.library}
              </a>{" "}
              {dict.bio.personal.afterLibrary}{" "}
              <a href={`/${locale}/music`} class="body-link">
                {dict.bio.personal.music}
              </a>
              {dict.bio.personal.suffix}
            </p>
            <p>
              {dict.bio.connect.prefix}{" "}
              <a
                href="https://github.com/jheysaaz"
                target="_blank"
                rel="noopener noreferrer"
                class="body-link"
              >
                {dict.bio.connect.code}
              </a>
              {dict.bio.connect.afterCode}{" "}
              <a
                href="https://linkedin.com/in/jheysaaz"
                target="_blank"
                rel="noopener noreferrer"
                class="body-link"
              >
                {dict.bio.connect.linkedin}
              </a>
              {dict.bio.connect.afterLinkedin}{" "}
              <a
                href="https://x.com/jheysaaz"
                target="_blank"
                rel="noopener noreferrer"
                class="body-link"
              >
                {dict.bio.connect.twitter}
              </a>{" "}
              {dict.bio.connect.afterTwitter}{" "}
              <a href="mailto:contact@jheysonsaavedra.com" class="body-link">
                {dict.bio.connect.email}
              </a>{" "}
              {dict.bio.connect.suffix}
            </p>
          </div>
        </div>
      </div>
    </>
  );
});
