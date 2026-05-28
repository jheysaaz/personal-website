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
        <title>Jheyson Saavedra</title>
        <link rel="canonical" href={url.href} />
        <link
          rel="preload"
          href="/fonts/InterVariable.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Newsreader[opsz,wght].woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <style>
          {`@font-face{font-family:"Inter";src:url("/fonts/InterVariable.woff2") format("woff2");font-weight:100 900;font-display:swap}
@font-face{font-family:"Inter";src:url("/fonts/InterVariable-Italic.woff2") format("woff2");font-weight:100 900;font-style:italic;font-display:swap}
@font-face{font-family:"Newsreader";src:url("/fonts/Newsreader[opsz,wght].woff2") format("woff2");font-weight:200 800;font-display:swap}
@font-face{font-family:"Newsreader";src:url("/fonts/Newsreader-Italic[opsz,wght].woff2") format("woff2");font-weight:200 800;font-style:italic;font-display:swap}`}
        </style>
      </head>
      <body
        f-client-nav
        f-view-transition
        class="min-h-full flex flex-col"
      >
        <Partial name="page">
          <main class="max-w-2xl mx-auto px-4 py-6 md:py-12 sm:px-6 lg:px-8 w-full">
            <div class="flex justify-end mb-3 md:mb-8">
              <LanguageSwitcher pathname={url.pathname} />
            </div>
            <Component />
          </main>
        </Partial>
      </body>
    </html>
  );
});
