import { define } from "../utils.ts";
import { LanguageSwitcher } from "../components/language-switcher.tsx";
import type { PageProps } from "fresh";
import { Partial } from "fresh/runtime";

export default define.page(function App({ Component, url }: PageProps) {
  const locale = url.pathname.split("/")[1] || "en";

  return (
    <html
      lang={locale}
      class="h-full antialiased"
    >
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url.href} />
      </head>
      <body
        f-client-nav
        f-view-transition
        class="min-h-full flex flex-col"
      >
        <Partial name="page">
          <div class="max-w-2xl mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-8 w-full">
            <div class="flex justify-end mb-4 md:mb-8">
              <LanguageSwitcher pathname={url.pathname} />
            </div>
            <Component />
          </div>
        </Partial>
      </body>
    </html>
  );
});
