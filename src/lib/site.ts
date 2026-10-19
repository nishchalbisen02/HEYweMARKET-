/**
 * Single source of truth for Hey We Market's identity and on-page copy.
 *
 * Everything that appears BOTH in the visible UI and in machine-readable
 * surfaces (JSON-LD, llms.txt, FAQ answers) lives here, so the page and its
 * structured data can never drift apart — which is what search engines and AI
 * answer engines penalise when they cross-check a page against its schema.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://heywemarket.com").replace(/\/+$/, "");
export const SITE_NAME = "Hey We Market";
/** Bump when page content materially changes — feeds sitemap lastmod and schema dateModified. */
export const CONTENT_UPDATED = "2026-10-19";
export const SITE_TITLE = "Hey We Market | Digital Marketing Agency in Bhopal, Madhya Pradesh";
export const SITE_DESCRIPTION =
  "Hey We Market is a full service digital marketing agency in Bhopal helping businesses grow through strategy led social media, ads, content, and search visibility. Get in touch for a free consultation.";

/** Default social-share image (1200×630) — layout and per-page metadata both reference it. */
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Hey We Market — digital marketing agency in Bhopal",
} as const;

/** Contact + identity — used by the header, footer, contact section, WhatsApp
 *  button, JSON-LD, llms.txt and the careers fallback. Change it here only. */
export const CONTACT = {
  email: "info@heywemarket.com",
  phoneDisplay: "+91 98260 26029",
  phoneTel: "+919826026029",
  whatsappUrl: "https://wa.me/919826026029",
  whatsappMessage: "Hello Hey We Market, I would like to discuss a project.",
  instagram: "https://www.instagram.com/heywemarket",
  /** Taken from the original site's structured data. Used for schema sameAs only — NOT linked in the UI until confirmed. */
  otherProfiles: ["https://www.facebook.com/heywemarket", "https://www.linkedin.com/company/heywemarket"],
  parent: { name: "Innovativebiz Technologies", url: "https://innovativebiz.in/" },
  address: {
    street: "3rd Floor, Gurbakshish Arcade, Bawadiya Kalan, Pallavi Nagar",
    locality: "Bhopal",
    region: "Madhya Pradesh",
    postalCode: "462039",
    country: "IN",
  },
  addressLine:
    "3rd Floor, Gurbakshish Arcade, Bawadiya Kalan, Pallavi Nagar, Bhopal, Madhya Pradesh 462039",
} as const;

/** wa.me link with the pre-filled enquiry message used across the site. */
export const WHATSAPP_HREF = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

export const NAV = [
  { href: "/#about", label: "About" },
  { href: "/#vision", label: "Vision" },
  { href: "/#founders", label: "Founders" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Our Clients" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export const CAREERS_LINK = { href: "/careers", label: "Careers" } as const;

/** Long-form copy shared by the page sections and the machine-readable surfaces (llms.txt). */
export const COPY = {
  heroTitle: "Digital Marketing Agency in Bhopal Built Around Your Business",
  heroSub:
    "Hey We Market is a full service digital marketing agency in Bhopal, Madhya Pradesh helping businesses grow through strategy, content, and campaigns designed around how they actually work, not generic templates dressed up to look custom.",
  about: {
    title: "Not Just Another Digital Marketing Agency",
    p1: "Hey We Market is a full service digital marketing agency in Bhopal, Madhya Pradesh. Most marketing feels the same after a while: the same captions, reel formats, and promises. We started Hey We Market because businesses deserve better than that.",
    p2: "We work as an extension of your team, not a vendor ticking off deliverables. Strategy first, execution second, always with a reason behind every post, every campaign, and every decision.",
    cardTitle: "Built around what makes you different.",
    cardBody:
      "Backed by Innovativebiz Technologies, our strategists, designers, video editors, content writers, and performance marketers work as one accountable team.",
  },
  vision: {
    title: "Our Vision",
    p1: "I did not start Hey We Market to run another agency. I started it because I kept seeing good businesses get reduced to a templated post or a generic package that could have belonged to anyone.",
    p2: "A business is not a category. It is years of someone's effort, risk, and belief, and it deserves marketing that actually understands that. We built Hey We Market around a simple idea: get close enough to a business to genuinely understand it, then build everything around what makes it different.",
    headedTitle: "Where We Are Headed",
    p3: "We are growing on purpose. We are going deeper, building real systems, staying ahead of where attention is moving across search and AI tools, and growing our team with intent.",
  },
  promise: {
    title: "Our Promise",
    body: "Working with us should feel different from working with an agency. We think before we act, tell you the truth when something is not working, protect your voice and story, and say no when we cannot genuinely do the work justice.",
  },
} as const;

/** Text above the showreel film (replaces the old "Watch the work" title). Only restates the services the site already lists. */
export const SHOWREEL_COPY = {
  /** Three short lines; each stays together on one row, so the headline wraps between them, never inside one. */
  lines: ["We plan it.", "We shoot it.", "We grow it."],
  sub: "Social media, paid ads, content, shoots, SEO and branding — one Bhopal team behind every frame.",
} as const;

/** Chips in the scrolling strip under the showreel. */
export const SERVICE_CHIPS = [
  { icon: "🎥", label: "Content Creation" },
  { icon: "📈", label: "Performance Marketing" },
  { icon: "💬", label: "Social Media Management" },
  { icon: "🎬", label: "Commercial Ad Shoots" },
  { icon: "✦", label: "Branding & Design" },
  { icon: "📷", label: "Photography" },
  { icon: "🖥", label: "Website Development" },
] as const;

export const SERVICES = [
  {
    idx: "01",
    title: "Social Media Management",
    body: "Strategy, content calendars, design, and day to day management across platforms, built around what your audience actually responds to.",
  },
  {
    idx: "02",
    title: "Paid Advertising",
    body: "Meta and Google Ads campaigns planned around real business goals, not just impressions and vanity metrics.",
  },
  {
    idx: "03",
    title: "Content Creation",
    body: "Photography, video, reels, and copywriting that sounds like your brand, not a template.",
  },
  {
    idx: "04",
    title: "SEO and AI Search Visibility",
    body: "Local SEO, Google Business Profile optimization, and visibility across AI search tools like ChatGPT, Perplexity, and Gemini.",
  },
  {
    idx: "05",
    title: "Branding and Positioning",
    body: "Helping businesses define how they want to be seen, then building every piece of content around that.",
  },
  {
    idx: "06",
    title: "Website and Digital Presence",
    body: "Building and optimizing digital touchpoints that convert visitors into leads, not just traffic.",
  },
] as const;

export const WHY = [
  {
    n: "01",
    title: "Dedicated Team",
    body: "A dedicated team across strategy, design, content, and performance, not one generalist juggling everything.",
  },
  { n: "02", title: "Built Around Your Goals", body: "Marketing built around your actual business goals, not recycled templates." },
  { n: "03", title: "Honest Reporting", body: "Clear communication and reporting, with no vanity metrics dressed up as results." },
  { n: "04", title: "Long-Term Partnership", body: "A partner that grows with you, not just a vendor delivering a fixed package." },
  {
    n: "05",
    title: "Strategy First",
    body: "We think before we act, so every post, campaign, and decision has a reason behind it.",
  },
  {
    n: "06",
    title: "Protecting Your Voice",
    body: "We build around your voice, brand, and story instead of overriding what makes you different.",
  },
] as const;

export const PROCESS = [
  { n: "01", title: "Discover", body: "We understand your business, audience, and goals." },
  { n: "02", title: "Strategy", body: "We create a customized marketing roadmap." },
  { n: "03", title: "Create", body: "Professional content, creatives, and campaigns." },
  { n: "04", title: "Launch", body: "Ads go live. Content gets published." },
  { n: "05", title: "Scale", body: "We optimize, improve, and grow your business." },
] as const;

export const STATS = [
  { target: 100, suffix: "+", label: "Brands Worked With" },
  { target: 500, suffix: "+", label: "Projects Delivered" },
  { target: 25, suffix: "M+", label: "Content Views" },
  { target: 5, suffix: "★", label: "Client Satisfaction" },
] as const;

export const FOUNDERS = [
  {
    name: "Ankita Singh",
    role: "Founder · Strategy & Creative",
    jobTitle: "Founder, Strategy & Creative",
    photo: "/founders/ankita-singh.webp",
    bio: "Founded Hey We Market to build marketing that is strategic first and creative second, helping businesses grow with clarity, consistency, and work that moves the needle.",
  },
  {
    name: "Divyansh Singh",
    role: "Co Founder · Brand & Growth",
    jobTitle: "Co Founder, Brand & Growth",
    photo: "/founders/divyansh-singh.webp",
    bio: "Works at the intersection of marketing, brand strategy, and business growth.",
  },
] as const;

/**
 * Placeholder cards. The brand has not yet approved real client quotes, so the
 * section ships as "coming soon" — and deliberately emits NO Review /
 * AggregateRating schema (fabricated ratings violate Google's guidelines).
 */
export const TESTIMONIAL_PLACEHOLDERS = [
  { text: "Client feedback will be added here once approved for publication.", note: "Testimonials in progress" },
  {
    text: "We are collecting verified client stories highlighting responsiveness, results, and creative quality.",
    note: "Verified case studies coming soon",
  },
  {
    text: "Each published testimonial will include the client name, designation, and business name.",
    note: "Client story archive",
  },
] as const;

/**
 * FAQ — the first six are the approved copy from the site. The rest are
 * answer-first entries built ONLY from facts already stated elsewhere on the
 * site (services, founders, process, contact, stats) to give AI answer engines
 * self-contained, citable passages. No new claims, prices or guarantees.
 */
export const FAQS: readonly { q: string; a: string }[] = [
  {
    q: "What does Hey We Market do?",
    a: "Hey We Market is a full service digital marketing agency based in Bhopal, Madhya Pradesh. We manage social media, paid advertising, content creation, SEO, branding, and website optimization for businesses looking to grow their online presence.",
  },
  {
    q: "Where is Hey We Market located?",
    a: "Hey We Market is based in Bhopal, Madhya Pradesh, and works with businesses across India through both in person and remote collaboration.",
  },
  {
    q: "What industries does Hey We Market work with?",
    a: "Hey We Market works with businesses across a wide range of industries, building strategy and content tailored to each business rather than applying a single generic approach.",
  },
  {
    q: "How is Hey We Market different from other digital marketing agencies?",
    a: "Hey We Market focuses on understanding each business deeply before creating content or campaigns, rather than applying templated marketing packages. We prioritize honest reporting and long term strategy over vanity metrics.",
  },
  {
    q: "Does Hey We Market help with AI search visibility?",
    a: "Yes. Hey We Market helps businesses optimize their online presence for AI search tools such as ChatGPT, Perplexity, and Gemini, in addition to traditional Google search visibility.",
  },
  {
    q: "How can I get started with Hey We Market?",
    a: "Businesses can get started by reaching out through this contact section or by scheduling an initial consultation to discuss goals and current marketing gaps.",
  },
  {
    q: "Which digital marketing services does Hey We Market offer?",
    a: "Hey We Market offers social media management, paid advertising on Meta and Google, content creation (photography, video, reels and copywriting), SEO and AI search visibility including local SEO and Google Business Profile optimization, branding and positioning, and website and digital presence work.",
  },
  {
    q: "Who founded Hey We Market?",
    a: "Hey We Market was founded by Ankita Singh (Founder, Strategy & Creative) together with Divyansh Singh (Co Founder, Brand & Growth). The agency is backed by Innovativebiz Technologies.",
  },
  {
    q: "What is Hey We Market's process?",
    a: "Hey We Market works in five steps: Discover (understanding your business, audience, and goals), Strategy (a customized marketing roadmap), Create (professional content, creatives, and campaigns), Launch (ads go live and content gets published), and Scale (optimizing, improving, and growing your business).",
  },
  {
    q: "How many brands has Hey We Market worked with?",
    a: "Hey We Market has worked with 100+ brands, delivered 500+ projects, and created content that has earned 25M+ views.",
  },
  {
    q: "How do I contact Hey We Market in Bhopal?",
    a: `You can email ${CONTACT.email}, call ${CONTACT.phoneDisplay}, message the team on WhatsApp, or visit the office at ${CONTACT.addressLine}. The team responds within 24 hours.`,
  },
];
