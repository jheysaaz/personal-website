import { define } from "../../utils.ts";
import { getDictionary } from "../../i18n/get-dictionary.ts";
import { normalizeLocale } from "../../utils/locale.ts";
import { canonicalUrl, getSiteUrl, siteDefaults } from "../../utils/seo.ts";
import { Head } from "fresh/runtime";

export const handler = define.handlers(async (ctx) => {
  const locale = normalizeLocale(ctx.params.locale);
  const dict = await getDictionary(locale);
  return { data: { dict, locale } };
});

export default define.page<typeof handler>(({ data }) => {
  const { dict, locale } = data;
  const siteUrl = getSiteUrl();
  const canonical = canonicalUrl(`/${locale}`);
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
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={siteDefaults.keywords} />
        <meta name="author" content={siteDefaults.name} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content={siteDefaults.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${siteDefaults.image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={siteDefaults.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${siteUrl}${siteDefaults.image}`}
        />

        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl("/en")} />
        <link rel="alternate" hrefLang="es" href={canonicalUrl("/es")} />
      </Head>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
