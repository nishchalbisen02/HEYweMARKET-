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

export const WORK: readonly { slug: string; title: string; category: WorkCategory }[] = [
  { slug: "amit-glass", title: "Amit Glass", category: "commercial" },
  { slug: "animaterr", title: "Animaterr", category: "content" },
  { slug: "db-pride-ganpati", title: "DB Pride Ganpati", category: "content" },
  { slug: "rada-reel", title: "RADA Reel", category: "content" },
  { slug: "rada-campaign", title: "RADA Campaign", category: "social" },
  { slug: "rada-highlight", title: "RADA Highlight", category: "commercial" },
  { slug: "rada-motion", title: "RADA Motion", category: "commercial" },
  { slug: "tit-udaipur", title: "TIT Udaipur", category: "brand" },
  { slug: "sayhii", title: "SAYHII", category: "social" },
  { slug: "ai-video-promo", title: "AI Video Promo", category: "content" },
  { slug: "campaign-reel", title: "Campaign Reel", category: "content" },
  { slug: "brand-vision", title: "Brand Vision", category: "web" },
  { slug: "launch-clip", title: "Launch Clip", category: "commercial" },
  { slug: "interior-motion", title: "Interior Motion", category: "commercial" },
];

export const CREATIVE: readonly { slug: string; title: string }[] = [
  { slug: "ai-video-poster", title: "AI Video Poster" },
  { slug: "ai-campaign-poster", title: "AI Campaign Poster" },
  { slug: "rada-campaign-artwork", title: "RADA Campaign Artwork" },
  { slug: "rada-highlight-artwork", title: "RADA Highlight Artwork" },
  { slug: "animaterr-artwork", title: "Animaterr Artwork" },
  { slug: "db-pride-artwork", title: "DB Pride Artwork" },
  { slug: "rada-reel-artwork", title: "RADA Reel Artwork" },
  { slug: "rada-motion-artwork", title: "RADA Motion Artwork" },
  { slug: "interior-motion-artwork", title: "Interior Motion Artwork" },
  { slug: "creative-artwork-one", title: "Creative Artwork One" },
  { slug: "creative-artwork-two", title: "Creative Artwork Two" },
  { slug: "food-photography", title: "Food Photography" },
  { slug: "footer-campaign", title: "Footer Campaign" },
  { slug: "lifestyle-photography", title: "Lifestyle Photography" },
  { slug: "brand-photography", title: "Brand Photography" },
  { slug: "restaurant-photography", title: "Restaurant Photography" },
  { slug: "tit-udaipur-artwork", title: "TIT Udaipur Artwork" },
  { slug: "product-photography", title: "Product Photography" },
  { slug: "restaurant-artwork", title: "Restaurant Artwork" },
  { slug: "snack-spread", title: "Snack Spread" },
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
 * Intro video (public/hero): the agency promo, 109s, re-encoded to 1280×720 H.264 with its own AAC soundtrack.
 * It autoplays muted; the Music button unmutes it (`videoHasSound`). To use a separate music file instead,
 * drop it in public/hero/ and set `audioSrc`; with neither, the Music button is not rendered.
 */
export const HERO_VIDEO: {
  src: string;
  poster: string;
  width: number;
  height: number;
  audioSrc: string | null;
  videoHasSound: boolean;
} = {
  src: "/hero/hero.mp4",
  poster: "/hero/hero-poster.webp",
  width: 1280,
  height: 720,
  audioSrc: null,
  videoHasSound: true,
};
