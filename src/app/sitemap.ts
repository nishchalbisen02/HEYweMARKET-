import type { MetadataRoute } from "next";
import { CREATIVE } from "@/lib/portfolio";
import { SHOWREEL } from "@/lib/portfolio";
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
          title: `${SITE_NAME} showreel — ${SHOWREEL.title}`,
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
