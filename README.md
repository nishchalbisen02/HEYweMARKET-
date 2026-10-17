# Hey We Market

Website for **Hey We Market** — a full service digital marketing agency in Bhopal, Madhya Pradesh
(social media, paid advertising, content, SEO &amp; AI search visibility, branding, websites).

The layout is the approved static `public_html` design (Baloo 2 + Nunito), ported into Next.js so it can ship with a real
careers application flow, structured data and AI-search (AEO / GEO) support. It has two colour themes:
**light = lime + blue + white** and **dark = black + lime** (see *Themes* below).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — utilities only (no preflight); the site look lives in `src/app/site.css`, its colours in theme variables
- `next/font` self-hosted Baloo 2 + Nunito · `lucide-react` icons

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Structure

| Path | What |
|---|---|
| `src/app/site.css` | the site stylesheet: layout ported verbatim from the static build, **colours come from the theme variables at its top**; imported into the `site` cascade layer by `globals.css` |
| `src/app/globals.css` | layer order, Tailwind utilities, theme toggle + header tools, vignette, intro video, focus ring / skip link, careers + form primitives |
| `src/app/layout.tsx` | fonts, site-wide metadata (canonical, hreflang en-IN, Open Graph, Twitter), page chrome |
| `src/app/page.tsx` | the home page — sections composed from `src/components/site/*` + JSON-LD |
| `src/app/careers/page.tsx` | careers page (roles, form) + JobPosting JSON-LD |
| `src/app/api/careers/route.ts` | application endpoint → WhatsApp Cloud API hand-off (see `.env.example`) |
| `src/app/robots.ts` · `sitemap.ts` | crawler rules (search + AI bots allowed) and sitemap with image/video entries |
| `src/app/llms.txt/` · `llms-full.txt/` | plain-text renditions for LLM crawlers, generated from the data modules |
| `src/components/site/` | one component per section; `effects.tsx` is the behaviour layer (curtain, reveal, counters, parallax…) |
| `src/components/site/landing-video.tsx` · `hero-video.tsx` | the first screen is the clean intro video (`public/hero`) with pause + optional Music button; the headline hero is the second screen |
| `src/lib/site.ts` | **single source of truth**: contact details, nav, services, FAQ, long-form copy |
| `src/lib/portfolio.ts` | work reels, design artwork, client logos, showreel |
| `src/lib/schema.ts` | schema.org JSON-LD (ProfessionalService, Services, Persons, FAQPage, VideoObject, JobPosting) |
| `public/work · creative · clients` | web-optimised media (tile reels are 480×540 H.264, artwork 640² WebP, logos ≤320px WebP) |
| `legacy/index.html` | an older single-file build, kept for reference |

## Themes (light / dark)

- **Light** = lime `#CDF22B` + blue `#1E45FB` + white (blue bands, blue buttons, lime highlights). **Dark** = black + lime `#C6FF34` (lime buttons and accents on black).
- Every colour in `site.css` reads a variable (`--page`, `--surface`, `--ink`, `--accent`, `--band`, `--btn-bg`, …) defined once per theme in the **THEMES** block at the top of the file. Change a palette there, nowhere else.
- Selection: a saved choice (`localStorage` key `hwm-theme`) wins, otherwise the visitor's system setting. The header has a sun/moon toggle (inside the phone menu on very narrow screens). A tiny inline script in `layout.tsx` applies the theme before first paint, so there is no flash; without JavaScript the CSS follows `prefers-color-scheme`.
- Both themes were checked against WCAG AA (4.5:1 body text, 3:1 large text) with an in-page audit — re-run the idea if you change tokens.

## Intro video, music and vignette

- Screen 1 is the hero text; screen 2 is the intro video (`public/hero/hero.mp4`: the agency promo, 1280×720 with its own soundtrack). On desktop it fills the whole screen edge to edge (`object-fit: cover`); on portrait phones it keeps its full width so nothing is cropped. It plays muted, looped, only while on screen; reduced-motion / data-saver visitors get the poster and a play button.
- **Music button**: unmutes the video's own soundtrack (`videoHasSound: true` in `src/lib/portfolio.ts`; or set `audioSrc` to a separate track instead). Hidden if neither is set. Only one thing makes sound at a time (hero music vs the showreel).
- **Vignette**: a fixed click-through overlay on every page (`body::after` in `src/app/globals.css`). Tune `--vignette-mid` / `--vignette-edge` (0 = off); it is lighter on phones and disabled for print and high-contrast mode.

## Editing content

- **Phone / email / address / WhatsApp / Instagram** → `CONTACT` in `src/lib/site.ts` (header, footer, contact
  section, WhatsApp button, JSON-LD and `llms.txt` all read it).
- **FAQ** → `FAQS` in `src/lib/site.ts`. The visible list and the `FAQPage` JSON-LD use the same array.
- **Services / process / founders / stats** → same file. Services also feed the schema's offer catalog.
- **New work reel** → add `public/work/<slug>.mp4` (+ `<slug>.webp` poster) and one line in `WORK`.
- **Bump `CONTENT_UPDATED`** in `site.ts` when copy changes (sitemap `lastmod` + schema `dateModified`).

## Deploy

Deploy to **Vercel** (framework preset: Next.js). The careers form needs the server runtime, so this
cannot be exported as plain static files. Optional environment variables:

| Variable | Purpose |
|---|---|
| `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_RECIPIENT_NUMBER` | careers applications → WhatsApp (see `.env.example`) |
| `NEXT_PUBLIC_SITE_URL` | canonical origin, defaults to `https://heywemarket.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Search Console / Bing Webmaster verification tags |

## Still to confirm

- **Testimonials** are placeholders ("Testimonials in progress") — no review schema is emitted for them.
- **Facebook / LinkedIn** URLs appear only in structured data (`CONTACT.otherProfiles`, carried over from the
  original site); they are not linked in the UI until confirmed.
- **Hiring poster** (`public/careers/hiring-poster.*`) prints a different email / phone than the site's.
