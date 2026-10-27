import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { EB_Garamond, Manrope } from "next/font/google";
import { TopBar } from "@/components/layout/TopBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LoanModalProvider } from "@/components/modal/LoanModalProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";
import { siteConfig } from "@/content/site";
import { motionCssVariables } from "@/lib/motion";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} — Licensed credit provider in Nairobi`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b1050",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${manrope.variable} antialiased`}
      style={motionCssVariables() as CSSProperties}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-100 rounded-md bg-navy px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
          <LoanModalProvider>
            <TopBar />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </LoanModalProvider>
        </Providers>
      </body>
    </html>
  );
}
