import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Space_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { jsonLd } from "@/lib/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuditPill } from "@/components/audit-pill";
import { WhatsappFab } from "@/components/whatsapp-fab";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heywemarket.com"),
  title:
    "Hey We Market — Independent 360° Digital Marketing Agency | SEO, Google & Meta Ads, GMB, Content",
  description:
    "Hey We Market is an independent 360° digital marketing agency running every growth channel from one room — SEO & AEO, Google Ads, Meta Ads, Google Business Profile & local SEO, content, social media, commercial ad shoots, branding and web. 100+ brands, 500+ projects, 25M+ views.",
  keywords: [
    "360 degree digital marketing agency",
    "full service digital marketing agency India",
    "performance marketing agency",
    "Google Ads management",
    "Meta Ads agency",
    "Google Business Profile optimization",
    "GMB ranking",
    "local SEO agency",
    "answer engine optimization",
    "AEO agency",
    "SEO agency",
    "social media management",
    "content creation agency",
    "commercial ad shoot",
    "branding agency",
    "lead generation",
  ],
  authors: [{ name: "Hey We Market" }],
  alternates: { canonical: "https://heywemarket.com/" },
  openGraph: {
    type: "website",
    siteName: "Hey We Market",
    title: "Hey We Market — Independent 360° Digital Marketing Agency",
    description:
      "One agency for every growth channel: SEO & AEO, Google Ads, Meta Ads, Google Business Profile, content, social, shoots, branding and web. 100+ brands. 25M+ views.",
    url: "https://heywemarket.com/",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hey We Market — 360° Digital Marketing Agency",
    description:
      "360° digital marketing: SEO & AEO, Google Ads, Meta Ads, GMB, content, social, shoots & branding. 100+ brands, 25M+ views.",
    images: ["/og-image.jpg"],
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
};

export const viewport = {
  themeColor: "#f6f2fa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[1000] focus:border-[3px] focus:border-ink focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-[13px] focus:uppercase focus:text-background"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <RevealObserver />
        <SiteHeader />
        <SmoothScroll>
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
        <AuditPill />
        <WhatsappFab />
      </body>
    </html>
  );
}
