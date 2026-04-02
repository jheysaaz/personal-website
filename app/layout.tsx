import type { Metadata } from "next";
import { inter, newsreader } from "../lib/fonts";
import { LanguageSwitcher } from "../components/language-switcher";
import { TransitionProvider } from "../components/transition-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jheysonsaavedra.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jheyson Saavedra - Data Analyst & Philosophy Student",
    template: "%s | Jheyson Saavedra",
  },
  description: "Data analyst and philosophy student. I find patterns in chaos and turn them into decision-making systems easier to understand and harder to break.",
  keywords: ["data analyst", "philosophy", "BigQuery", "SQL", "Looker Studio", "fraud detection", "dashboard", "Colombia"],
  authors: [{ name: "Jheyson Saavedra", url: siteUrl }],
  creator: "Jheyson Saavedra",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_CO",
    url: siteUrl,
    siteName: "Jheyson Saavedra",
    title: "Jheyson Saavedra - Data Analyst & Philosophy Student",
    description: "Data analyst and philosophy student. I find patterns in chaos and turn them into decision-making systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jheyson Saavedra - Data Analyst & Philosophy Student",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jheyson Saavedra - Data Analyst & Philosophy Student",
    description: "Data analyst and philosophy student. I find patterns in chaos and turn them into decision-making systems.",
    creator: "@jheysaaz",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": "/en",
      "es": "/es",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-end mb-4 md:mb-8">
            <LanguageSwitcher />
          </div>
          <TransitionProvider>
            {children}
          </TransitionProvider>
        </div>
      </body>
    </html>
  );
}
