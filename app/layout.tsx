import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ANSI Code Generator",
  description: "Generate ANSI codes for your terminal with a handy visualizer",
  keywords: "ansi escape code generator, ansi code generator, terminal color generator, ansi color codes, escape sequence generator, terminal formatting, custom ansi codes, color code generator, terminal color picker, ansi color tool, rgb to ansi, terminal rgb converter, text color generator, terminal style tool",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ANSI Code Generator",
    description:
      "Generate ANSI color codes for your terminal with a handy visualizer",
    url: "https://ansi-generator.pages.dev",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
    },
  };

  return (
    <html lang="en">
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <meta
        name="google-site-verification"
        content="t9YSXdjoVZaN-DFb_wHRB5Queri2DmHFnlCSRlDTPNY"
      />
      <body
        className={`${schibstedGrotesk.className} px-16 p-4 dark:bg-[#030D13] flex items-center justify-center dark:text-white`}
      >
        <main className="flex-grow container min-h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
