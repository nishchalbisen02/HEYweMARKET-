# Hey We Market

Marketing site for **Hey We Market** — an independent 360° digital marketing agency
(SEO &amp; AEO, Google &amp; Meta Ads, Google Business Profile, content, social, commercial
shoots, branding and web).

One self-contained `index.html` — no build step, no framework. Fonts load from Google
Fonts (Fraunces / Inter / DM Mono); everything else (CSS, JS, JSON-LD, favicon) is inline.

## What's inside

- Editorial design system inspired by [yourcreative.com.au](https://yourcreative.com.au)
- Interactive **360° Growth Audit** — 12 questions, scored report, and two
  downloadable HTML/PDF reports, generated entirely client-side
- Filterable work grid, process accordion, AEO-oriented FAQ
- `Organization` + `WebSite` + `FAQPage` JSON-LD
- Progressive enhancement (readable with JS disabled) and reduced-motion support

## Local preview

```bash
python -m http.server 4599
```

Then open <http://localhost:4599>.

## Deploy

Serve `index.html` as the site root on any static host — GitHub Pages, Netlify,
Vercel, Cloudflare Pages. For GitHub Pages: **Settings → Pages → Deploy from branch → `main` / root**.

## Still to fill in

| Placeholder | Where |
|---|---|
| Phone number | `+91 XXXXX XXXXX` in the contact section |
| WhatsApp link | `wa.me/91XXXXXXXXXX` on the floating button |
| Social profile URLs | Instagram / Facebook / LinkedIn / WhatsApp links (currently `#`) |
| `og-image.jpg` | 1200×630 image at the site root, for link previews |
