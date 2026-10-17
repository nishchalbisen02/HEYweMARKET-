import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Search engines and AI answer engines are all welcome (AEO / GEO: you can only
 * be cited by a crawler that is allowed in). The API route is kept out of every
 * crawler group — AI bots with their own group would otherwise ignore the `*` rule.
 */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
