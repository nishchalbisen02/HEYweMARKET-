import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { Loader } from "@/components/site/loader";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Effects } from "@/components/site/effects";

// Both are variable fonts: one file each covers every weight the design uses.
const baloo = Baloo_2({ variable: "--font-baloo", subsets: ["latin"], display: "swap" });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], display: "swap" });

const OG_TITLE = "Hey We Market | Digital Marketing Agency in Bhopal";
const OG_DESCRIPTION =
  "Strategy-led social media, advertising, content, SEO, and AI search visibility for businesses in Bhopal and across Madhya Pradesh.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "digital marketing agency in Bhopal",
    "digital marketing company Madhya Pradesh",
    "social media marketing agency Bhopal",
    "best digital marketing agency Bhopal",
    "marketing agency near me",
    "SEO and AI search visibility",
    "Google Business Profile optimization",
    "content creation agency Bhopal",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Digital marketing",
  alternates: { canonical: "/", languages: { "en-IN": "/", "x-default": "/" } },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: "/",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  // Local-relevance hints for engines that still read them (Google ignores them; some others do).
  other: { "geo.region": "IN-MP", "geo.placename": "Bhopal" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // browser UI colour per scheme: lime in light, black in dark
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#CDF22B" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

// Runs before first paint: apply the saved theme (or the system setting) so there is never a flash of the wrong one.
// Without JavaScript the CSS falls back to the system setting on its own (prefers-color-scheme).
const THEME_SCRIPT =
  "(function(){try{var t=localStorage.getItem('hwm-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()";

// Visitors without JavaScript never get the reveal-on-scroll states or the intro curtain stuck on screen.
const NO_JS_CSS =
  ".rv{opacity:1!important;transform:none!important}.wsplit .w i{transform:none!important}#loader{display:none!important}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${baloo.variable} ${nunito.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NO_JS_CSS }} />
        </noscript>
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Loader />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
        <Effects />
      </body>
    </html>
  );
}
