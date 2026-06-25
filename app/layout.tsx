import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jheyson Saavedra",
  description: "Data analyst and philosophy student",
  metadataBase: new URL("https://jheysonsaavedra.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="color-scheme" content="light dark" />
        <style>{`@font-face{font-family:"Inter";src:url("/fonts/InterVariable.woff2") format("woff2");font-weight:100 900;font-display:swap}
@font-face{font-family:"Inter";src:url("/fonts/InterVariable-Italic.woff2") format("woff2");font-weight:100 900;font-style:italic;font-display:swap}
@font-face{font-family:"Newsreader";src:url("/fonts/Newsreader[opsz,wght].woff2") format("woff2");font-weight:200 800;font-display:swap}
@font-face{font-family:"Newsreader";src:url("/fonts/Newsreader-Italic[opsz,wght].woff2") format("woff2");font-weight:200 800;font-style:italic;font-display:swap}`}</style>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
