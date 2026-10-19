/**
 * Portfolio media. Every file below lives in /public and was optimised from the
 * raw source assets (see git history): work tiles are 480×540 H.264 loops with a
 * WebP poster, creative cards are 640×640 WebP, client logos are ≤320px WebP.
 */

export const WORK_CATEGORIES = {
  content: "Content Creation",
  commercial: "Commercial Shoots",
  photo: "Photography",
  brand: "Branding",
  social: "Social Media",
  web: "Websites",
} as const;

export type WorkCategory = keyof typeof WORK_CATEGORIES;

/** The social-media card's feed grid: nine real post designs, in feed order (all files exist in /public/creative). */
export const FEED_POSTS: readonly { slug: string; alt: string }[] = [
  { slug: "ai-video-poster", alt: "Weekly specials menu post" },
  { slug: "rada-campaign-artwork", alt: "Journey — moments post" },
  { slug: "creative-artwork-one", alt: "One Bite Bakery post" },
  { slug: "tit-udaipur-artwork", alt: "DB-pride Janmashtami post" },
  { slug: "rada-highlight-artwork", alt: "Heritage That Stands Timeless post" },
  { slug: "creative-artwork-two", alt: "Vision — film storytelling post" },
  { slug: "product-photography", alt: "Janmashtami project highlights post" },
  { slug: "ai-campaign-poster", alt: "Creamy pasta close-up" },
  { slug: "restaurant-photography", alt: "Guess who visited — Janmashtami post" },
];

export const WORK: readonly { slug: string; title: string; category: WorkCategory }[] = [
  // Titles describe what each reel actually shows (checked frame by frame), not the original file names.
  { slug: "amit-glass", title: "Amit Glass", category: "commercial" },
  { slug: "animaterr", title: "Rohini's Rasoi", category: "content" },
  { slug: "db-pride-ganpati", title: "DB-pride Ganpati", category: "content" },
  { slug: "rada-reel", title: "RADA — Kitchen", category: "content" },
  { slug: "rada-campaign", title: "RADA — Redesign Story", category: "social" },
  { slug: "rada-highlight", title: "RADA — Living & Drawing Area", category: "commercial" },
  { slug: "rada-motion", title: "RADA — Designed for Moments", category: "commercial" },
  { slug: "tit-udaipur", title: "TIT Udaipur", category: "content" },
  { slug: "sayhii", title: "Wisteria Blue Hotel & Lawn", category: "social" },
  { slug: "ai-video-promo", title: "The Kind — Cup Branding", category: "brand" },
  { slug: "campaign-reel", title: "Tessa — Profile Systems", category: "commercial" },
  { slug: "brand-vision", title: "The Porcupine — Logo Animation", category: "brand" },
  { slug: "launch-clip", title: "Private Paradise — Website Design", category: "web" },
  { slug: "interior-motion", title: "Hand-drawn Motion Graphics", category: "content" },
];

/**
 * Design & photography strip. `slug` is the file name in /public/creative (an internal name that does NOT describe
 * the image); `title` and `kind` are what a visitor actually sees, written from the picture itself.
 */
export const CREATIVE: readonly { slug: string; title: string; kind: string }[] = [
  { slug: "ai-video-poster", title: "Weekly Specials Menu", kind: "Social media design" },
  { slug: "ai-campaign-poster", title: "Creamy Pasta Close-up", kind: "Food photography" },
  { slug: "rada-campaign-artwork", title: "Journey — Moments Post", kind: "Social media design" },
  { slug: "rada-highlight-artwork", title: "Heritage That Stands Timeless", kind: "Social media design" },
  { slug: "animaterr-artwork", title: "Hey We Market Sweatshirt", kind: "Brand identity" },
  { slug: "db-pride-artwork", title: "Hey We Market Brand Poster", kind: "Brand identity" },
  { slug: "rada-reel-artwork", title: "Hey We Market Tote Bag", kind: "Brand identity" },
  { slug: "rada-motion-artwork", title: "One Bite Bakery Stickers", kind: "Brand identity" },
  { slug: "interior-motion-artwork", title: "Hey We Market Tote — Mono Logo", kind: "Brand identity" },
  { slug: "creative-artwork-one", title: "One Bite Bakery Post", kind: "Social media design" },
  { slug: "creative-artwork-two", title: "Vision — Film Storytelling Post", kind: "Social media design" },
  { slug: "food-photography", title: "Snacks and Dips", kind: "Food photography" },
  { slug: "footer-campaign", title: "Hey We Market Wordmark", kind: "Brand identity" },
  { slug: "lifestyle-photography", title: "We Are Hiring — Social Media Manager", kind: "Hiring creative" },
  { slug: "brand-photography", title: "Lounge Interior Render", kind: "Interior visual" },
  { slug: "restaurant-photography", title: "Guess Who Visited — Janmashtami Post", kind: "Social media design" },
  { slug: "tit-udaipur-artwork", title: "DB-pride — Janmashtami Post", kind: "Social media design" },
  { slug: "product-photography", title: "Janmashtami — Project Highlights", kind: "Social media design" },
  { slug: "restaurant-artwork", title: "Draught Beer Pour", kind: "Beverage photography" },
  { slug: "snack-spread", title: "Senior Citizen Lounge — Launch", kind: "Launch creative" },
];

/** Logos in the "Trusted by" strip. `w`/`h` are the intrinsic pixel sizes of the optimised WebP. */
export const CLIENTS: readonly { slug: string; name: string; w: number; h: number }[] = [
  { slug: "assam-timber", name: "Assam Timber Traders", w: 150, h: 150 },
  { slug: "bu-group", name: "BU Group", w: 160, h: 160 },
  { slug: "bungalow-111", name: "Bungalow No. 111", w: 150, h: 150 },
  { slug: "cafe-flamingo", name: "Cafe Flamingo", w: 160, h: 160 },
  { slug: "ibt-technologies", name: "IBT Technologies", w: 160, h: 160 },
  { slug: "jyc-bhopal", name: "Jain Youth Club Bhopal", w: 160, h: 160 },
  { slug: "rada", name: "RADA", w: 176, h: 160 },
  { slug: "varshish", name: "Varshish", w: 160, h: 160 },
  { slug: "viraat", name: "Viraat", w: 320, h: 123 },
  { slug: "mp-india", name: "MP Tours India", w: 283, h: 160 },
];

/**
 * Photos inside the service cards (already-optimised files in /public), index-aligned with SERVICES in site.ts.
 * Rule: a photo only goes where it literally shows what the text says. `null` = no honest photo exists, the card draws
 * an illustration instead. The "why" cards and the founder cards carry no photos (abstract claims / no portraits yet).
 */
export type CardPhoto = { src: string; alt: string; w: number; h: number };

export const SERVICE_PHOTOS: readonly (CardPhoto | null)[] = [
  null, // Social Media Management: a feed of posts (FEED_POSTS), not a single post
  { src: "/creative/snack-spread.webp", alt: "Launch announcement creative: 'Launching soon — Senior Citizen Lounge'", w: 640, h: 640 },
  { src: "/creative/food-photography.webp", alt: "Food photography: snacks and dips on a yellow table", w: 640, h: 640 },
  null,
  { src: "/creative/rada-reel-artwork.webp", alt: "Hey We Market logo and pattern on a red tote bag", w: 640, h: 640 },
  { src: "/work/launch-clip.webp", alt: "Website design: 'Your Private Paradise Awaits' landing page on desktop and phone", w: 480, h: 540 },
];

/** The DB-pride Ganpati film: featured in the "Work That Speaks For Itself" section (and described in the VideoObject schema). */
export const SHOWREEL = {
  src: "/showreel.mp4",
  poster: "/showreel-poster.webp",
  title: "DB-pride — Ganpati film",
  description:
    "Showreel from Hey We Market: the DB-pride Ganpati film, a cinematic festive brand film produced by the Hey We Market team in Bhopal.",
  /** ISO 8601 duration of the encoded file (41.2s). */
  duration: "PT41S",
  width: 1280,
  height: 720,
} as const;

/**
 * Agency film (public/hero), shown in the Showreel section: ~107s, 1920×1080 H.264 with its own AAC soundtrack.
 * The source is an upscale, so by default the section shows ONE crisp still (`poster`, the services frame)
 * with a "Watch our film" button; the film is only downloaded when it is pressed and then plays with sound.
 * Set `autoplay: true` to get the old behaviour (muted loop while on screen; the Music button unmutes it).
 * To use a separate music file instead of the film's own soundtrack, drop it in public/hero/ and set `audioSrc`;
 * with neither `audioSrc` nor `videoHasSound`, the Music button is not rendered.
 */
export const HERO_VIDEO: {
  src: string;
  poster: string;
  width: number;
  height: number;
  autoplay: boolean;
  audioSrc: string | null;
  videoHasSound: boolean;
} = {
  src: "/hero/hero.mp4",
  poster: "/hero/hero-poster.webp",
  width: 1920,
  height: 1080,
  autoplay: false,
  audioSrc: null,
  videoHasSound: true,
};
