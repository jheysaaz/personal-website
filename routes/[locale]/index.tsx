import { define } from "@/utils/state.ts";
import { getSiteUrl, SeoHead } from "@/lib/seo.tsx";

export default define.page((props) => {
  const { intl } = props.state;
  const locale = intl.locale;

  return (
    <>
      <SeoHead
        title={`${intl.t("bio.name")} - ${intl.t("meta.description")}`}
        description={intl.t("bio.description")}
        url={`${getSiteUrl()}/${locale}`}
      />
      <div class="space-y-8">
        <div>
          <div class="mb-6">
            <p class="text-lg text-foreground mb-1">{intl.t("bio.greeting")}</p>
            <h1 class="font-serif text-3xl font-semibold tracking-tight text-foreground">
              {intl.t("bio.name")}
            </h1>
          </div>

          <div class="space-y-5 text-foreground leading-relaxed">
            <p>{intl.t("bio.description")}</p>
            <p>{intl.t("bio.background")}</p>
            <p>
              {intl.t("bio.personal.prefix")}{" "}
              <a class="primary-link" href={`/${locale}/work`}>
                {intl.t("bio.personal.work")}
              </a>
              {intl.t("bio.personal.afterWork")}{" "}
              <a class="primary-link" href={`/${locale}/lab`}>
                {intl.t("bio.personal.lab")}
              </a>{" "}
              {intl.t("bio.personal.afterLab")}{" "}
              <a class="primary-link" href={`/${locale}/library`}>
                {intl.t("bio.personal.library")}
              </a>{" "}
              {intl.t("bio.personal.afterLibrary")}{" "}
              <a class="primary-link" href={`/${locale}/music`}>
                {intl.t("bio.personal.music")}
              </a>
              {intl.t("bio.personal.suffix")}
            </p>
            <p>
              {intl.t("bio.connect.prefix")}{" "}
              <a
                class="primary-link external-link"
                href="https://github.com/jheysaaz"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.t("bio.connect.code")}
              </a>
              {intl.t("bio.connect.afterCode")}{" "}
              <a
                class="primary-link external-link"
                href="https://linkedin.com/in/jheysaaz"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.t("bio.connect.linkedin")}
              </a>
              {intl.t("bio.connect.afterLinkedin")}{" "}
              <a
                class="primary-link external-link"
                href="https://x.com/jheysaaz"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.t("bio.connect.twitter")}
              </a>{" "}
              {intl.t("bio.connect.afterTwitter")}{" "}
              <a class="primary-link" href="mailto:contact@jheysonsaavedra.com">
                {intl.t("bio.connect.email")}
              </a>{" "}
              {intl.t("bio.connect.suffix")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
});
