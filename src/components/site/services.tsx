import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { MapPin, Search, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { FEED_POSTS, SERVICE_PHOTOS } from "@/lib/portfolio";

/** Icon drawings, index-aligned with SERVICES (stroke colour comes from site.css). */
const ICONS: readonly ReactNode[] = [
  <Fragment key="video">
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <path d="M22 8.5v7L16 12z" />
  </Fragment>,
  <Fragment key="trend">
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Fragment>,
  <Fragment key="plus">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8M12 8v8" />
  </Fragment>,
  <Fragment key="focus">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" />
  </Fragment>,
  <path key="spark" d="M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z" />,
  <Fragment key="screen">
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M8 21h8" />
  </Fragment>,
];

/** The social media card: a feed of real posts — what "strategy, content calendars, design and day to day management" produces. */
function FeedArt() {
  return (
    <div className="feed-art" role="img" aria-label="A social media feed made of nine post designs by Hey We Market">
      <div className="feed-art__bar">
        <Image src="/logo.jpg" alt="" width={28} height={28} unoptimized />
        <b>heywemarket</b>
        <span>Instagram</span>
      </div>
      <div className="feed-art__grid">
        {FEED_POSTS.map((p) => (
          <Image key={p.slug} src={`/creative/${p.slug}.webp`} alt="" width={160} height={160} sizes="110px" unoptimized />
        ))}
      </div>
    </div>
  );
}

/** The SEO card has no honest photo, so it draws what the text describes: local search, a business profile, AI answers. */
function SeoArt() {
  return (
    <div
      className="seo-art"
      role="img"
      aria-label="Illustration: a search bar with chips for local SEO, Google Business Profile and AI search tools"
    >
      <div className="seo-art__bar">
        <Search aria-hidden="true" />
        <span>marketing agency near me</span>
      </div>
      <div className="seo-art__row">
        <span className="seo-art__chip">
          <MapPin aria-hidden="true" /> Local SEO
        </span>
        <span className="seo-art__chip">Google Business Profile</span>
      </div>
      <div className="seo-art__row">
        <span className="seo-art__chip seo-art__chip--ai">
          <Sparkles aria-hidden="true" /> ChatGPT
        </span>
        <span className="seo-art__chip seo-art__chip--ai">
          <Sparkles aria-hidden="true" /> Perplexity
        </span>
        <span className="seo-art__chip seo-art__chip--ai">
          <Sparkles aria-hidden="true" /> Gemini
        </span>
      </div>
    </div>
  );
}

/** Chapter 02 — services as a vertical stack of sticky cards. */
export function Services() {
  return (
    <section id="services">
      <div className="hscroll-outer" id="hOuter">
        <div className="hscroll-sticky">
          <div className="hscroll-head">
            <div className="chapter" style={{ position: "static", marginBottom: 22 }}>
              <b>Chapter 02 — What We Do</b>
            </div>
            <h2>Digital Marketing Services</h2>
          </div>
          <div className="htrack-wrap">
            <div className="htrack" id="hTrack">
              {SERVICES.map((s, i) => {
                const photo = SERVICE_PHOTOS[i];
                return (
                  <article className="svc" key={s.idx}>
                    <div className="svc-copy">
                      <span className="idx">{s.idx}</span>
                      <div className="ico">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
                          {ICONS[i]}
                        </svg>
                      </div>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                    <figure className={`svc-media${photo ? "" : ` svc-media--art${i === 0 ? " svc-media--feed" : ""}`}`}>
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.w}
                          height={photo.h}
                          sizes="(max-width: 760px) 90vw, 480px"
                          unoptimized
                        />
                      ) : i === 0 ? (
                        <FeedArt />
                      ) : (
                        <SeoArt />
                      )}
                    </figure>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="hprogress" aria-hidden="true">
            <i id="hBar" />
          </div>
        </div>
      </div>
    </section>
  );
}
