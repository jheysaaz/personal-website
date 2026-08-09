import type { PageProps } from "fresh";
import { HttpError } from "fresh";
import { Head } from "fresh/runtime";
import { getIntl } from "@/lib/i18n.ts";
import type { State } from "@/utils/state.ts";

export default function ErrorPage(props: PageProps) {
  const error = props.error;
  const locale = ((props.state as State | undefined)?.locale ?? "en") as
    | "en"
    | "es";
  const intl = getIntl(locale);

  let status = 500;
  if (error instanceof HttpError) status = error.status;
  else if (typeof error === "number") status = error;

  if (status === 404) {
    return (
      <>
        <Head>
          <title>{intl.t("pages.notFound.title")}</title>
        </Head>
        <div class="min-h-[70vh] flex items-center justify-center px-4">
          <section class="text-center py-10 md:py-16">
            <h1 class="font-semibold text-6xl mb-4 tracking-tighter font-serif">
              404
            </h1>
            <h2 class="font-semibold text-2xl mb-6 md:mb-8 tracking-tighter font-serif">
              {intl.t("pages.notFound.title")}
            </h2>
            <p class="mb-6 md:mb-8 max-w-md mx-auto">
              {intl.t("pages.notFound.description")}
            </p>
            <a
              href={`/${locale}`}
              class="underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              {intl.t("navigation.backToGround")}
            </a>
          </section>
        </div>
      </>
    );
  }

  return (
    <div class="min-h-[70vh] flex items-center justify-center px-4">
      <section class="text-center py-10 md:py-16">
        <h1 class="font-semibold text-6xl mb-4 tracking-tighter font-serif">
          {status}
        </h1>
        <h2 class="font-semibold text-2xl mb-6 md:mb-8 tracking-tighter font-serif">
          {intl.t("pages.notFound.title")}
        </h2>
        <a
          href={`/${locale}`}
          class="underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {intl.t("navigation.backToGround")}
        </a>
      </section>
    </div>
  );
}
