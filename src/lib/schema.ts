/**
 * schema.org JSON-LD for search engines (SEO) and AI answer engines (AEO / GEO).
 *
 * Rules this file follows on purpose:
 *  - Every entity has a stable @id and is cross-referenced by @id, so crawlers
 *    and LLMs resolve ONE Hey We Market entity instead of several look-alikes.
 *  - Each page ships ONE self-contained @graph (the shared entities + that
 *    page's own nodes), so no reference ever points at a node that is not in
 *    the same document.
 *  - Everything marked up is visible on the page (services, FAQ, founders,
 *    contact details) and comes from the same data modules the UI renders.
 *  - Nothing is invented: no ratings or reviews, no opening hours, no price
 *    range, no geo-coordinates, no slogan, no social profiles beyond the
 *    confirmed Instagram. Add those here only once they are real.
 */
import {
  CONTACT,
  CONTENT_UPDATED,
  FAQS,
  FOUNDERS,
  SERVICES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "./site";
import { SHOWREEL } from "./portfolio";
import { JOBS } from "./careers";

type Json = Record<string, unknown>;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const ids = {
  org: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  webpage: `${SITE_URL}/#webpage`,
  faq: `${SITE_URL}/#faq`,
  logo: `${SITE_URL}/#logo`,
  video: `${SITE_URL}/#showreel`,
  careersPage: `${SITE_URL}/careers#webpage`,
  founder: (name: string) => `${SITE_URL}/#${slug(name)}`,
  service: (title: string) => `${SITE_URL}/#service-${slug(title)}`,
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE_NAME}, ${CONTACT.addressLine}`,
)}`;

const areaServed = [
  { "@type": "City", name: "Bhopal" },
  { "@type": "State", name: "Madhya Pradesh" },
  { "@type": "Country", name: "India" },
];

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: CONTACT.address.street,
  addressLocality: CONTACT.address.locality,
  addressRegion: CONTACT.address.region,
  postalCode: CONTACT.address.postalCode,
  addressCountry: CONTACT.address.country,
};

/** Entities every page shares: the agency, the website, its services and its founders. */
function siteNodes(): Json[] {
  return [
    {
      "@type": "ProfessionalService",
      "@id": ids.org,
      name: SITE_NAME,
      alternateName: ["Hey We Market!", "HeyWeMarket"],
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        "@id": ids.logo,
        url: `${SITE_URL}/logo-512.png`,
        contentUrl: `${SITE_URL}/logo-512.png`,
        width: 512,
        height: 512,
        caption: "Hey We Market logo",
      },
      image: [`${SITE_URL}/logo-512.png`, `${SITE_URL}/og-image.jpg`],
      priceRange: "₹₹",
      description:
        "Hey We Market is a full service digital marketing agency in Bhopal, Madhya Pradesh helping businesses grow through strategy led social media, paid advertising, content creation, SEO and AI search visibility, branding, and website optimization.",
      email: CONTACT.email,
      telephone: CONTACT.phoneTel,
      address: postalAddress,
      hasMap: mapsUrl,
      areaServed,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT.email,
          telephone: CONTACT.phoneTel,
          areaServed: "IN",
        },
      ],
      sameAs: [CONTACT.instagram, ...CONTACT.otherProfiles],
      parentOrganization: { "@type": "Organization", name: CONTACT.parent.name, url: CONTACT.parent.url },
      founder: FOUNDERS.map((f) => ({ "@id": ids.founder(f.name) })),
      knowsAbout: [
        "Digital marketing",
        "Social media management",
        "Paid advertising (Meta Ads and Google Ads)",
        "Content creation",
        "Search engine optimization (SEO)",
        "Local SEO and Google Business Profile optimization",
        "AI search visibility (answer engine and generative engine optimization)",
        "Branding and positioning",
        "Website design and development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital marketing services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@id": ids.service(s.title) },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": ids.org },
    },
    ...SERVICES.map((s) => ({
      "@type": "Service",
      "@id": ids.service(s.title),
      name: s.title,
      serviceType: s.title,
      description: s.body,
      provider: { "@id": ids.org },
      areaServed,
      url: `${SITE_URL}/#services`,
    })),
    ...FOUNDERS.map((f) => ({
      "@type": "Person",
      "@id": ids.founder(f.name),
      name: f.name,
      jobTitle: f.jobTitle,
      description: f.bio,
      worksFor: { "@id": ids.org },
      url: `${SITE_URL}/#founders`,
    })),
  ];
}

/** Home page graph. */
export function homeGraph(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...siteNodes(),
      {
        "@type": "WebPage",
        "@id": ids.webpage,
        url: `${SITE_URL}/`,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.org },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
        dateModified: CONTENT_UPDATED,
        breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
        mainEntity: { "@id": ids.faq },
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#hero h1", "#hero .hero-sub"] },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
      },
      {
        "@type": "VideoObject",
        "@id": ids.video,
        name: `${SITE_NAME} showreel — ${SHOWREEL.title}`,
        description: SHOWREEL.description,
        thumbnailUrl: [`${SITE_URL}${SHOWREEL.poster}`],
        contentUrl: `${SITE_URL}${SHOWREEL.src}`,
        uploadDate: CONTENT_UPDATED,
        duration: SHOWREEL.duration,
        width: SHOWREEL.width,
        height: SHOWREEL.height,
        inLanguage: "en-IN",
        publisher: { "@id": ids.org },
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        url: `${SITE_URL}/#faq`,
        inLanguage: "en-IN",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

const EMPLOYMENT: Record<string, string[]> = {
  "Internship / Full-Time": ["INTERN", "FULL_TIME"],
  Internship: ["INTERN"],
};

/** Careers page graph: page + breadcrumb + one JobPosting per listed role. */
export function careersGraph(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...siteNodes(),
      {
        "@type": "WebPage",
        "@id": ids.careersPage,
        url: `${SITE_URL}/careers`,
        name: "Careers at Hey We Market",
        inLanguage: "en-IN",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.org },
        dateModified: CONTENT_UPDATED,
        breadcrumb: { "@id": `${SITE_URL}/careers#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/careers#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Careers", item: `${SITE_URL}/careers` },
        ],
      },
      ...JOBS.map((job) => ({
        "@type": "JobPosting",
        "@id": `${SITE_URL}/careers#job-${job.slug}`,
        title: job.title,
        description: `${job.description} Skills: ${job.skills.join(", ")}. Open to ${job.experience.toLowerCase()} candidates.`,
        datePosted: CONTENT_UPDATED,
        employmentType: EMPLOYMENT[job.employment] ?? "FULL_TIME",
        directApply: true,
        hiringOrganization: { "@id": ids.org },
        identifier: { "@type": "PropertyValue", name: SITE_NAME, value: job.slug },
        url: `${SITE_URL}/careers#apply`,
        jobLocation: { "@type": "Place", address: postalAddress },
      })),
    ],
  };
}
