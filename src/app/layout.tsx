import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { jsonLd } from "@/lib/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteBackdrop } from "@/components/site-backdrop";
import { AuditPill } from "@/components/audit-pill";
import { WhatsappFab } from "@/components/whatsapp-fab";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://heywemarket.com"),
  title: "Hey We Market | Digital Marketing Agency in Bhopal, Madhya Pradesh",
  description:
    "Hey We Market is a full service digital marketing agency in Bhopal, Madhya Pradesh — strategy-led SEO & AI search visibility, Google & Meta Ads, content, social media, commercial ad shoots, branding and websites. 100+ brands, 25M+ views. Get a free consultation.",
  keywords: [
    "digital marketing agency in Bhopal",
    "digital marketing company Madhya Pradesh",
    "social media marketing agency Bhopal",
    "best digital marketing agency Bhopal",
    "marketing agency near me",
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
    title: "Hey We Market | Digital Marketing Agency in Bhopal",
    description:
      "Strategy-led social media, advertising, content, SEO, and AI search visibility for businesses in Bhopal and across Madhya Pradesh. 100+ brands. 25M+ views.",
    url: "https://heywemarket.com/",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hey We Market — digital marketing agency in Bhopal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hey We Market | Digital Marketing Agency in Bhopal",
    description:
      "Strategy-led social media, advertising, content, SEO, and AI search visibility for businesses in Bhopal and across Madhya Pradesh.",
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
  themeColor: "#2a2436",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="flex min-h-svh flex-col">
        <SiteBackdrop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[1000] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-[13px] focus:text-background"
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
