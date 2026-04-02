import type { Metadata } from "next";
import { inter, newsreader } from "../lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jheyson Saavedra",
  description: "Data analyst and philosophy student",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
