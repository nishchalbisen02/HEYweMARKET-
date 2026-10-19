import type { MetadataRoute } from "next";
import { CREATIVE } from "@/lib/portfolio";
import { HERO_VIDEO, SHOWREEL } from "@/lib/portfolio";
import { CONTENT_UPDATED, SITE_NAME, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/logo.jpg`, ...CREATIVE.map((c) => `${SITE_URL}/creative/${c.slug}.webp`)],
      videos: [
        {
          title: `${SITE_NAME} agency film`,
          description:
            "Agency film from Hey We Market, a full service digital marketing agency in Bhopal: social media, paid advertising, content, SEO, branding and websites.",
          thumbnail_loc: `${SITE_URL}${HERO_VIDEO.poster}`,
          content_loc: `${SITE_URL}${HERO_VIDEO.src}`,
          duration: 107,
          publication_date: CONTENT_UPDATED,
        },
        {
          title: `${SITE_NAME} film — ${SHOWREEL.title}`,
          description: SHOWREEL.description,
          thumbnail_loc: `${SITE_URL}${SHOWREEL.poster}`,
          content_loc: `${SITE_URL}${SHOWREEL.src}`,
          duration: 41,
          publication_date: CONTENT_UPDATED,
        },
      ],
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
