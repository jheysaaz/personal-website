import type { ComponentChildren } from "preact";
import { Partial } from "fresh/runtime";

export default function App(
  { Component }: { Component: () => ComponentChildren },
) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/InterVariable.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/Newsreader[opsz,wght].woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        f-client-nav
        f-view-transition
        class="min-h-full flex flex-col bg-background text-foreground font-sans antialiased"
      >
        <Partial name="body">
          <Component />
        </Partial>
      </body>
    </html>
  );
}
