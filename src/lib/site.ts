export const NAV = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#work", label: "Work" },
  { href: "#audit", label: "Free Audit" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
] as const;

export const TICKER_ITEMS = [
  "Content Creation",
  "Performance Marketing",
  "Social Media Management",
  "Commercial Ad Shoots",
  "Branding & Design",
  "Photography",
  "Website Development",
] as const;

export const STATS = [
  { value: "100+", label: "Brands" },
  { value: "500+", label: "Projects" },
  { value: "25M+", label: "Content views" },
  { value: "100%", label: "In-house team" },
] as const;

export type ServiceGroup = {
  key: string;
  name: string;
  services: { idx: string; title: string; underline: string; body: string; tags: string[] }[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    key: "A",
    name: "Get Found",
    services: [
      {
        idx: "01",
        title: "SEO & Answer Engine",
        underline: "Optimization",
        body: "Technical SEO, on-page optimization, keyword and topic clusters, schema markup and Core Web Vitals — plus AEO so your brand gets cited inside ChatGPT, Perplexity and Google AI Overviews, not just ranked below them.",
        tags: ["Technical audit & fixes", "Keyword + topic strategy", "Schema / structured data", "AI Overview & LLM citation"],
      },
      {
        idx: "02",
        title: "Google Business Profile &",
        underline: "Local SEO",
        body: "GBP signals carry roughly 32% of Local Pack ranking weight — the biggest single lever a local business has. We fix categories, publish geo-tagged posts and photos weekly, run review generation and keep NAP citations consistent.",
        tags: ["Category & service optimization", "Weekly posts + photos", "Review generation", "Local Pack rank tracking"],
      },
    ],
  },
  {
    key: "B",
    name: "Get Leads",
    services: [
      {
        idx: "03",
        title: "Google Ads",
        underline: "Management",
        body: "Search, Performance Max, YouTube, Display and Shopping. We chase cost per qualified lead, not clicks — with negative keyword hygiene, proper conversion tracking and landing pages that match the ad promise.",
        tags: ["Search & Performance Max", "YouTube & Display", "Conversion tracking", "Negative keyword hygiene"],
      },
      {
        idx: "04",
        title: "Meta Ads —",
        underline: "Facebook & Instagram",
        body: "Advantage+ campaigns, structured creative testing, lookalike and custom audiences, and full-funnel retargeting. Pixel and Conversions API configured properly so iOS signal loss doesn't blind the account.",
        tags: ["Advantage+ & manual", "Creative testing frameworks", "Retargeting funnels", "Pixel + Conversions API"],
      },
      {
        idx: "05",
        title: "Analytics, CRO &",
        underline: "Reporting",
        body: "GA4, Google Tag Manager, call and form tracking, and lead attribution dashboards — so you know which campaign, ad set and creative produced each enquiry. Monthly reports in plain language, not screenshots.",
        tags: ["GA4 + GTM setup", "Call & form tracking", "Landing page A/B tests", "Plain-language reports"],
      },
    ],
  },
  {
    key: "C",
    name: "Get Noticed",
    services: [
      {
        idx: "06",
        title: "Content Creation &",
        underline: "Production",
        body: "Reels, product and lifestyle photography, brand films, founder interviews, corporate videos, launches and event coverage — shot and edited by our own team, to your brand guidelines, not stock templates.",
        tags: ["Instagram Reels series", "Product & lifestyle photography", "Brand films & interviews", "Event & launch coverage"],
      },
      {
        idx: "07",
        title: "Social Media",
        underline: "Management",
        body: "Instagram, Facebook, LinkedIn and YouTube. Monthly calendars planned in advance, captions and hashtags written for reach, community managed daily, growth reported against business metrics — not vanity follows.",
        tags: ["Monthly content calendars", "Captions, hashtags & posting", "Community management", "Growth & engagement reporting"],
      },
      {
        idx: "08",
        title: "Commercial",
        underline: "Ad Shoots",
        body: "Premium advertisement films, product commercials, restaurant and resort shoots, corporate films and multi-day brand campaigns — the cinematic layer that makes a brand look bigger than it is.",
        tags: ["Advertisement films", "Product commercials", "Restaurant & resort shoots", "Multi-day campaigns"],
      },
    ],
  },
  {
    key: "D",
    name: "Get Built",
    services: [
      {
        idx: "09",
        title: "Branding &",
        underline: "Design",
        body: "Logo systems, complete brand identity, packaging, social creative templates, print design and marketing collateral — so every touchpoint looks like it came from the same company.",
        tags: ["Logo & identity systems", "Packaging design", "Creative templates", "Print & collateral"],
      },
      {
        idx: "10",
        title: "Website Design &",
        underline: "Development",
        body: "Conversion-focused sites and landing pages with fast Core Web Vitals, schema markup baked in, analytics and CRM wired up. Built to turn traffic into enquiries, not just to look good.",
        tags: ["Websites & landing pages", "Core Web Vitals performance", "Schema + technical SEO", "Analytics & CRM integration"],
      },
    ],
  },
];

export const CASES = [
  {
    cat: "Restaurants & Cafés",
    title: "Turned a quiet café page into a weekend booking engine",
    desc: "Weekly reel series, food photography refresh and a geo-targeted Meta Ads funnel aimed at diners within 8km.",
    metrics: [
      { v: "3.2×", l: "Weekend footfall" },
      { v: "−41%", l: "Cost per lead" },
    ],
  },
  {
    cat: "Hotels & Resorts",
    title: "A resort brand film that filled the off-season calendar",
    desc: "Cinematic property shoot, a 60-second brand film and a direct-booking campaign built to bypass OTA commissions.",
    metrics: [
      { v: "2.4M", l: "Video views" },
      { v: "+58%", l: "Direct bookings" },
    ],
  },
  {
    cat: "Real Estate",
    title: "Qualified site visits instead of junk enquiries",
    desc: "Walkthrough content, a lead-scoring form and a remarketing sequence that only chased genuinely warm buyers.",
    metrics: [
      { v: "4.7×", l: "Qualified enquiries" },
      { v: "−36%", l: "Ad spend waste" },
    ],
  },
  {
    cat: "Healthcare",
    title: "Built trust first, appointments followed",
    desc: "Doctor-led explainer content, patient story videos and a clean appointment landing page replacing a dated site.",
    metrics: [
      { v: "2.9×", l: "Appointment requests" },
      { v: "−68%", l: "Page load time" },
    ],
  },
];

export const WORK_FILTERS = [
  { f: "all", label: "All" },
  { f: "content", label: "Content" },
  { f: "commercial", label: "Commercial shoots" },
  { f: "photo", label: "Photography" },
  { f: "brand", label: "Branding" },
  { f: "social", label: "Social media" },
  { f: "web", label: "Websites" },
] as const;

export const WORK_TILES: { cat: string; label: string; title: string }[] = [
  { cat: "content", label: "Content", title: "Cafe Reel Series" },
  { cat: "content", label: "Content", title: "Viral Product Reel" },
  { cat: "content", label: "Content", title: "Launch Day Coverage" },
  { cat: "commercial", label: "Commercial Shoots", title: "Resort Brand Film" },
  { cat: "commercial", label: "Commercial Shoots", title: "Restaurant Commercial" },
  { cat: "commercial", label: "Commercial Shoots", title: "Corporate Story" },
  { cat: "photo", label: "Photography", title: "Product Photography" },
  { cat: "photo", label: "Photography", title: "Lifestyle Shoot" },
  { cat: "photo", label: "Photography", title: "Menu Photoshoot" },
  { cat: "brand", label: "Branding", title: "Fashion Identity" },
  { cat: "brand", label: "Branding", title: "Packaging Design" },
  { cat: "brand", label: "Branding", title: "Logo & Brand Kit" },
  { cat: "social", label: "Social Media", title: "Instagram Revamp" },
  { cat: "social", label: "Social Media", title: "Content Calendar" },
  { cat: "social", label: "Social Media", title: "Growth Campaign" },
  { cat: "web", label: "Websites", title: "Realty Landing Page" },
  { cat: "web", label: "Websites", title: "Clinic Website" },
  { cat: "web", label: "Websites", title: "E-commerce Store" },
];

export const PROCESS = [
  { n: "01", title: "Discover", body: "We start by understanding your business, your customers and what growth actually means for you — margins, seasons, competitors, what's worked and what hasn't. No strategy gets written before this." },
  { n: "02", title: "Strategy", body: "You get a customized marketing roadmap: the content pillars, the platforms worth your time, the ad budget split and the numbers we're chasing. Everything is agreed before a single rupee is spent." },
  { n: "03", title: "Create", body: "Our in-house team shoots, edits and designs everything — reels, product photography, brand films, ad creatives and campaign assets — built to your brand guidelines, not stock templates." },
  { n: "04", title: "Launch", body: "Ads go live, content gets published on schedule and tracking is set up properly from day one so every lead can be traced back to the campaign that produced it." },
  { n: "05", title: "Scale", body: "We review performance weekly, kill what isn't working, double down on what is, and report in plain language — what we spent, what it returned, what happens next month." },
];

export const WHY = [
  { n: "01", title: "100% in-house team", body: "Everything from strategy to execution is managed by our dedicated creative team." },
  { n: "02", title: "Creative + performance", body: "Beautiful content is only valuable when it delivers measurable business results." },
  { n: "03", title: "Premium production", body: "Cinematic visuals, professional editing, high-quality photography and engaging storytelling." },
  { n: "04", title: "Data-driven marketing", body: "Every campaign is optimized using real insights, analytics and performance metrics." },
  { n: "05", title: "Built for scale", body: "Systems and creative pipelines designed to grow with businesses across India." },
  { n: "06", title: "Fast communication", body: "Quick revisions, transparent workflow, dedicated support at every step." },
];

export const TESTIMONIALS = [
  { quote: "They completely transformed our Instagram presence.", who: "Owner · Multi-outlet Restaurant Group" },
  { quote: "Our business started generating quality leads after working with Hey We Market.", who: "Marketing Head · Real Estate Developer" },
  { quote: "A creative team that genuinely understands branding and marketing.", who: "Founder · Fashion Label" },
];

export const FAQS: { q: string; a: string }[] = [
  { q: "What is a 360-degree digital marketing agency?", a: "A 360-degree digital marketing agency handles every channel a brand needs from one place: search (SEO and AEO), paid advertising (Google Ads and Meta Ads), local search (Google Business Profile), organic social media, content and video production, branding, and the website itself. The advantage is that strategy, creative and media buying stay aligned instead of being split across separate vendors with conflicting priorities." },
  { q: "What services does Hey We Market offer?", a: "Ten services across four groups: Get Found (SEO & AEO, Google Business Profile & local SEO), Get Leads (Google Ads, Meta Ads, analytics & CRO), Get Noticed (content creation, social media management, commercial ad shoots), and Get Built (branding & design, website development). All work is delivered by a 100% in-house team." },
  { q: "How is Google Ads different from Meta Ads, and which should a business use?", a: "Google Ads captures existing demand — someone is already searching for what you sell, so intent is high and cost per lead is usually higher but conversion is faster. Meta Ads creates demand — you interrupt people on Instagram and Facebook with creative, so reach is cheaper but the buying journey is longer. Most businesses need both. A typical starting split is 60% Google for bottom-funnel search and 40% Meta for awareness and retargeting, rebalanced monthly based on actual cost per qualified lead." },
  { q: "How long does SEO take to show results?", a: "Technical fixes and on-page optimization typically show movement in 4–8 weeks. Competitive keyword rankings usually take 4–6 months of consistent content and link building. Google Business Profile and local SEO move fastest, often producing more calls and direction requests within 30–60 days — which is why we usually start there while longer-term SEO compounds." },
  { q: "Why does Google Business Profile matter so much for local businesses?", a: "Google Business Profile signals carry roughly 32% of Local Pack ranking weight — the single largest share of any factor group — and review signals add about another 16%. Around 46% of all Google searches now carry local intent. For restaurants, clinics, salons, showrooms and any business with a physical location, an optimized profile with the correct primary category, regular posts, fresh photos and a steady flow of reviews is usually the highest-return marketing work available." },
  { q: "What is AEO and how is it different from SEO?", a: "SEO optimizes for a ranking position that a person clicks. AEO — answer engine optimization — optimizes to be the source an AI system cites when it writes an answer in ChatGPT, Perplexity, Google AI Overviews, Gemini or Copilot. It relies on structured data, question-shaped headings, self-contained 40–60 word answer blocks, verifiable statistics and third-party mentions. It matters because a large share of searches now end without a click, so a brand can lose visibility even while its rankings stay flat." },
  { q: "What kind of businesses does Hey We Market work with?", a: "Restaurants, cafés, hotels, resorts, healthcare providers and clinics, fashion and D2C brands, real estate developers, education institutes, creators, startups and local service businesses across India. We've worked with 100+ brands and delivered 500+ projects." },
  { q: "How does Hey We Market's process work?", a: "Five steps: Discover (business, audience and channel audit), Strategy (customized roadmap and KPIs), Create (all content and creative produced in-house), Launch (campaigns live with full conversion tracking), and Scale (weekly optimization and monthly plain-language reporting)." },
  { q: "How is ad performance tracked and reported?", a: "Every engagement starts with GA4 and Google Tag Manager configured, Meta Pixel and Conversions API connected, and call and form tracking in place — so each lead can be traced to the campaign, ad set and creative that produced it. Reporting is monthly and in plain language: what was spent, what it returned, what's being changed next month." },
  { q: "What results has Hey We Market delivered for clients?", a: "Representative outcomes include 3.2x weekend footfall and 41% lower cost per lead for a café, 2.4M video views and 58% more direct bookings for a resort, 4.7x qualified enquiries for a real estate developer, and 2.9x appointment requests for a healthcare brand." },
  { q: "Does Hey We Market require a long-term contract?", a: "Retainers typically run on a three-month minimum, because paid campaigns need roughly 30–45 days of data before optimization decisions are reliable, and SEO and GMB compound over months. One-off projects — brand identity, a commercial shoot, a website build — are scoped and priced as standalone engagements." },
  { q: "How do I get started with Hey We Market?", a: "Book a free strategy call through the website or email hello@heywemarket.com. We respond within 24 hours with a channel-by-channel view of what's working, what's missing, and what would move first." },
];

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://heywemarket.com/#org",
        name: "Hey We Market",
        url: "https://heywemarket.com/",
        description:
          "Independent 360° digital marketing agency covering SEO & AEO, Google Ads, Meta Ads, Google Business Profile & local SEO, content creation, social media management, commercial ad shoots, branding and web development.",
        email: "hello@heywemarket.com",
        areaServed: "IN",
        knowsAbout: [
          "Search Engine Optimization",
          "Answer Engine Optimization",
          "Google Ads",
          "Meta Ads",
          "Google Business Profile",
          "Local SEO",
          "Content Creation",
          "Social Media Management",
          "Commercial Ad Shoots",
          "Branding",
          "Web Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://heywemarket.com/#website",
        url: "https://heywemarket.com/",
        name: "Hey We Market",
        publisher: { "@id": "https://heywemarket.com/#org" },
      },
      {
        "@type": "FAQPage",
        "@id": "https://heywemarket.com/#faq",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
