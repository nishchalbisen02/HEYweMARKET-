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
| `src/app/glass.css` | glassmorphism for every card (translucent surface + blur + light rim + soft shadow), theme-aware; sits in the same `site` layer, right after `site.css`, so the original hover states keep working |
| `src/app/globals.css` | layer order, Tailwind utilities, theme toggle + header tools, vignette, intro video, focus ring / skip link, careers + form primitives |
| `src/app/layout.tsx` | fonts, site-wide metadata (canonical, hreflang en-IN, Open Graph, Twitter), page chrome |
| `src/app/page.tsx` | the home page — sections composed from `src/components/site/*` + JSON-LD |
| `src/app/careers/page.tsx` | careers page (roles, form) + JobPosting JSON-LD |
| `src/app/api/careers/route.ts` | application endpoint → WhatsApp Cloud API hand-off (see `.env.example`) |
| `src/app/robots.ts` · `sitemap.ts` | crawler rules (search + AI bots allowed) and sitemap with image/video entries |
| `src/app/llms.txt/` · `llms-full.txt/` | plain-text renditions for LLM crawlers, generated from the data modules |
| `src/components/site/` | one component per section; `effects.tsx` is the behaviour layer (curtain, reveal, counters, parallax…) |
| `src/components/site/showreel.tsx` · `hero-video.tsx` · `featured-film.tsx` | the Showreel section (a line about what we do + the agency film: a still with a "Watch our film" button) and the DB-pride Ganpati film featured at the top of the Work grid |
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

- **Agency film** (`public/hero/hero.mp4`, 1920×1080 with its own soundtrack) lives in the **Showreel** section, under the line "We plan it. We shoot it. We grow it." (copy: `SHOWREEL_COPY` in `src/lib/site.ts`). The source is an upscale, so the frame shows **one crisp still** (`public/hero/hero-poster.webp`) with a glass **"Watch our film"** button; nothing is downloaded until it is pressed, then the film plays **with sound** from that click. Once started it pauses when scrolled away and resumes when it comes back.
- To go back to a muted autoplay loop instead, set `autoplay: true` in `HERO_VIDEO` (`src/lib/portfolio.ts`). To swap the still, replace `hero-poster.webp` (1920×1080).
- The **DB-pride Ganpati film** (`public/showreel.mp4`, `SHOWREEL` in `portfolio.ts`) is featured at the top of "Work That Speaks For Itself": muted loop while on screen, with pause / mute buttons.
- **Music button** (shown once the agency film has started): mutes / unmutes the film's own soundtrack (`videoHasSound: true`; or set `audioSrc` to a separate track instead). Hidden if neither is set. Only one thing makes sound at a time (hero music vs the showreel).
- **One continuous backdrop**: the soft lime / blue orbs are ONE fixed layer behind the whole page (`body::before` in `glass.css`), and every section is transparent over it — so a glow is never chopped at a section edge. In the dark theme the bands (Promise, Work, Process, Stats, footer, service strip) are transparent too (hairline edges only); in the light theme they stay solid brand blue. Never give a section its own opaque background (or an inline `style={{ background }}`), or it will show up as a flat separate block again.
- **Photos must match their text.** A photo goes only where it literally shows what the words say: the service cards use `SERVICE_PHOTOS` (one picture per service; Social Media Management shows a nine-post Instagram-style feed built from `FEED_POSTS`, because one lone post says nothing about strategy or content calendars; the SEO card draws an illustration because no honest photo exists), the "why" cards use icons (the claims are abstract), founder cards show a portrait (`FOUNDERS[].photo` in `site.ts`, files in `public/founders/`, 900×900 — the supplied originals have a name plate baked in at the bottom, so they were cropped above it and the card prints the name/role itself). Both crops are aligned on purpose: same head height, face centred, eye line and crown level between the two cards — when a portrait is replaced, crop the new one the same way (head top, eyes and chin at the same heights as the other founder) or the heads will sit at different levels again. In `portfolio.ts`, `CREATIVE` `title` / `kind` and `WORK` `title` / `category` describe what each picture / reel actually shows — the file name (`slug`) is internal and often says something else, so when you add an item, write its title from the picture, not from the file name.
- **Service cards must stay the same height.** They stick at the same spot and slide over each other, so a taller card leaks out underneath the next one. `.htrack { grid-auto-rows: 1fr }` in `glass.css` forces equal heights; keep pictures out of the layout flow (absolute photos, or a fixed-size illustration) and give every `<img>` that has width/height attributes an explicit `height: auto` if you rely on `aspect-ratio`.
- **Glassmorphism** (`src/app/glass.css`): every card — services, why, founders, testimonials, FAQ, contact panel, about card, stats, work tiles, creative cards, nav, chips, pills, careers cards — is a translucent, blurred pane with a light rim. Tokens `--glass-*` sit at the top of the file per theme; the fixed orb layer (`--glass-orbs`) gives them something to blur. The header and the stacked service cards are deliberately near-opaque (they float over black / over each other). Phones skip the live blur on the moving marquee and video tiles; `prefers-reduced-transparency` and browsers without `backdrop-filter` get solid surfaces. Text on glass was checked at ≥4.5:1 (pixel-based, both themes, desktop + phone) — re-check if you raise the orb opacity.
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
