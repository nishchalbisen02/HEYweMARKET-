// 360° Growth Audit — data, scoring and report generators (framework-agnostic, no DOM)

export type PillarKey = "search" | "local" | "paid" | "content" | "site";

export const PILLARS: Record<PillarKey, string> = {
  search: "Search & AI Visibility",
  local: "Google Business Profile",
  paid: "Paid Advertising",
  content: "Content & Social",
  site: "Website & Tracking",
};

export const WEIGHT: Record<PillarKey, number> = {
  search: 24,
  local: 22,
  paid: 20,
  content: 18,
  site: 16,
};

export type Question = {
  p: PillarKey;
  q: string;
  why: string;
  o: [string, number][];
};

export const QUESTIONS: Question[] = [
  { p: "search", q: "When someone Googles what you sell, where do you show up?", why: "Ranking is still the base layer — AI engines draw heavily from pages that already rank.", o: [["Top 3 results", 1], ["Page 1, further down", 0.65], ["Page 2 or worse", 0.25], ["I've never checked", 0]] },
  { p: "search", q: "Has anyone checked whether ChatGPT or Google AI Overviews mention your business?", why: "A large share of searches now end without a click. You can lose visibility while rankings stay flat.", o: [["Yes — we get cited", 1], ["Checked, we don't appear", 0.35], ["Never checked", 0.1], ["What is that?", 0]] },
  { p: "search", q: "Does your site have structured data (schema markup) and an FAQ section?", why: "Around 71% of pages cited by ChatGPT contain structured data. It removes the friction that prevents citation.", o: [["Both, properly set up", 1], ["One of the two", 0.5], ["Neither", 0.1], ["Not sure", 0.15]] },
  { p: "local", q: "Is your Google Business Profile claimed and fully filled out?", why: "GBP signals carry roughly 32% of Local Pack ranking weight — the single biggest local lever.", o: [["Claimed, complete, optimized", 1], ["Claimed but half-empty", 0.45], ["Exists, not claimed", 0.15], ["No profile", 0]] },
  { p: "local", q: "How often do you post updates or fresh photos to that profile?", why: "Activity and photo freshness feed prominence — and GBP actions rose 41% year-on-year.", o: [["Weekly", 1], ["Monthly-ish", 0.55], ["Rarely", 0.2], ["Never", 0]] },
  { p: "local", q: "How are you handling Google reviews?", why: "Review signals are ~16% of local ranking weight, and 87% of consumers read them before choosing.", o: [["We ask actively + reply to all", 1], ["Some come in, we reply sometimes", 0.5], ["They trickle in, we ignore them", 0.2], ["Almost none", 0]] },
  { p: "paid", q: "Are you running Google Ads right now?", why: "Google Ads captures existing demand — people already searching for what you sell.", o: [["Yes, actively managed", 1], ["Running but on autopilot", 0.45], ["Tried it, stopped", 0.2], ["Never run them", 0]] },
  { p: "paid", q: "Are you running Meta (Facebook / Instagram) Ads?", why: "Meta creates demand. In paid social, creative is the single biggest performance variable.", o: [["Yes, with fresh creative regularly", 1], ["Yes, same creative for months", 0.4], ["Boosting posts occasionally", 0.25], ["Not running any", 0]] },
  { p: "paid", q: "Do you know your cost per qualified lead?", why: "Without a CPL number, budget decisions are guesses — and spend quietly leaks.", o: [["Yes, to the rupee", 1], ["Rough idea", 0.5], ["We track cost per click only", 0.25], ["No idea", 0]] },
  { p: "content", q: "How often do you publish content — reels, posts, videos?", why: "Consistency beats intensity. Sporadic posting never compounds into reach.", o: [["Planned calendar, several times a week", 1], ["Weekly-ish", 0.65], ["Whenever we remember", 0.3], ["Barely active", 0.05]] },
  { p: "content", q: "How is your content actually produced?", why: "Production quality is what makes a small brand look like a big one.", o: [["Professional shoots + editing", 1], ["Mix of pro and phone", 0.55], ["All phone, quick edits", 0.3], ["Mostly reposts / stock", 0.1]] },
  { p: "site", q: "What tracking is set up on your website?", why: "If you cannot attribute a lead to a campaign, you cannot optimize anything downstream.", o: [["GA4 + Pixel + call/form tracking", 1], ["Analytics only", 0.45], ["Something was installed once", 0.25], ["Nothing", 0]] },
];

export type Fix = [title: string, detail: string, timeline: string, impact: string, effort: string];

export const FIXES: Record<PillarKey, Fix[]> = {
  search: [
    ["Publish question-shaped pages with direct answer blocks", "Lead each section with a self-contained 40–60 word answer. This is the exact format AI engines extract and cite.", "4–8 weeks", "High impact", "Medium effort"],
    ["Add schema markup and a real FAQ section", "Organization, Service and FAQPage schema, mirrored 1:1 in visible content. Removes the friction that blocks citation.", "2–3 weeks", "High impact", "Low effort"],
  ],
  local: [
    ["Fix your Google Business Profile primary category", "The single biggest Local Pack lever. Wrong category caps your ceiling no matter what else you do.", "1 week", "Very high impact", "Low effort"],
    ["Start a weekly post + photo cadence on GBP", "Freshness feeds prominence. Typically moves calls and direction requests within 30–60 days.", "30–60 days", "High impact", "Low effort"],
    ["Build a review engine", "Ask every customer, respond to 100% within 48 hours. Reviews are ~16% of local ranking weight.", "Ongoing", "High impact", "Low effort"],
  ],
  paid: [
    ["Set up proper conversion tracking before spending more", "Cost per click is a vanity metric. Until CPL is visible, every budget decision is a guess.", "1–2 weeks", "Very high impact", "Low effort"],
    ["Split budget across intent and demand", "Roughly 60% Google for bottom-funnel search, 40% Meta for awareness and retargeting — then rebalance monthly on actual CPL.", "2–4 weeks", "High impact", "Medium effort"],
    ["Build a creative testing cycle for Meta", "Creative is the biggest performance lever in paid social. Same creative for months guarantees decay.", "Ongoing", "High impact", "Medium effort"],
  ],
  content: [
    ["Move to a planned monthly content calendar", "Consistency compounds; sporadic posting never does. Plan a month ahead, batch the shoot.", "Immediate", "High impact", "Medium effort"],
    ["Upgrade production quality on your top format", "One professional shoot outperforms twenty phone posts on the formats that actually convert.", "2–4 weeks", "Medium impact", "Medium effort"],
  ],
  site: [
    ["Install GA4, Tag Manager, Pixel and call tracking", "Every lead should be traceable to the campaign, ad set and creative that produced it.", "1–2 weeks", "Very high impact", "Low effort"],
    ["Fix Core Web Vitals and page speed", "Speed is a ranking factor and a conversion factor at the same time.", "2–3 weeks", "Medium impact", "Medium effort"],
  ],
};

export function gradeOf(s: number): [string, string] {
  if (s >= 80) return ["Strong", "You're ahead of most of your market."];
  if (s >= 60) return ["Solid", "The foundation is there — the gaps are costing you compounding growth."];
  if (s >= 40) return ["At Risk", "You're visible in patches, invisible where it matters most."];
  return ["Critical", "Most of your potential customers currently cannot find you."];
}

export type Scored = {
  p: Record<PillarKey, number>;
  total: number;
  order: PillarKey[];
  grade: [string, string];
  band: [string, string];
  fixes: [PillarKey, Fix][];
};

export function score(ans: (number | null)[]): Scored {
  const out = {} as Record<PillarKey, number>;
  const cnt = {} as Record<PillarKey, number>;
  QUESTIONS.forEach((q, n) => {
    out[q.p] = (out[q.p] || 0) + (ans[n] || 0);
    cnt[q.p] = (cnt[q.p] || 0) + 1;
  });
  (Object.keys(out) as PillarKey[]).forEach((k) => (out[k] = Math.round((out[k] / cnt[k]) * 100)));
  let total = 0;
  (Object.keys(WEIGHT) as PillarKey[]).forEach((k) => (total += (out[k] * WEIGHT[k]) / 100));
  total = Math.round(total);

  const order = (Object.keys(PILLARS) as PillarKey[]).sort((a, b) => out[a] - out[b]);
  const gap = 100 - total;
  const band: [string, string] =
    gap > 60 ? ["40–60%", "most of your addressable demand"]
    : gap > 40 ? ["25–40%", "a large share of your addressable demand"]
    : gap > 20 ? ["10–25%", "a meaningful slice of your addressable demand"]
    : ["under 10%", "a small residual slice"];

  let fixes: [PillarKey, Fix][] = [];
  order.forEach((k) => {
    if (out[k] < 85) (FIXES[k] || []).forEach((f) => fixes.push([k, f]));
  });
  fixes = fixes.slice(0, 5);
  if (!fixes.length) fixes = [["search", FIXES.search[0]]];

  return { p: out, total, order, grade: gradeOf(total), band, fixes };
}

// ---- report content ----

const PLAYBOOK: Record<PillarKey, { what: string; why: string; doing: string[]; measure: string[] }> = {
  search: {
    what: "Search &amp; AI Visibility covers whether people find you when they actively look — on Google results pages and, increasingly, inside AI-generated answers from ChatGPT, Perplexity, Gemini and Google AI Overviews.",
    why: "Traditional SEO gets you ranked; answer engine optimisation gets you <em>cited</em>. These are now separate disciplines. A large share of searches end without any click at all, which means a brand can lose visibility while its rankings stay perfectly flat. Roughly 71% of pages cited by ChatGPT contain structured data, and about 65% of pages cited by Google AI Mode do — structured data does not guarantee citation, but its absence reliably prevents it.",
    doing: ["Run a technical crawl and fix indexation, redirects, duplicate titles and broken internal links.", "Map keywords into topic clusters rather than isolated pages, so the site demonstrates depth on a subject.", "Add Organization, Service and FAQPage schema in a single linked @graph with consistent @id values — disconnected schema blocks create ambiguous entity signals that AI systems distrust.", "Rewrite key pages so each major section opens with a self-contained 40–60 word direct answer. This is the exact passage format answer engines extract.", "Convert headings into the question form real people type (\"How much does X cost?\" rather than \"Pricing\").", "Publish and maintain a visible last-updated date. For commercial queries, the large majority of AI citations come from pages refreshed within the last year.", "Allow AI crawlers in robots.txt — GPTBot, PerplexityBot, ClaudeBot, Google-Extended and OAI-SearchBot. Blocking them removes any possibility of citation."],
    measure: ["Keyword rankings for your 20 priority terms", "Impressions and clicks in Google Search Console, including the generative-AI performance report", "Citation rate: of 20 tracked prompts, how many name your brand", "Pages indexed vs pages submitted"],
  },
  local: {
    what: "Google Business Profile is your listing in Google Maps and the Local Pack — the three-result box that appears above organic results for anything with local intent.",
    why: "GBP signals carry roughly 32% of Local Pack ranking weight, the single largest share of any factor group. Review signals contribute about a further 16%. Around 46% of all Google searches now carry local intent, and GBP actions — calls, direction requests, website clicks — rose about 41% year-on-year. For any business with a physical location or service area, this is usually the highest-return marketing work available, and it is free.",
    doing: ["Claim and verify the profile, then set the correct <em>primary</em> category. Experts consistently rank primary category as the number one Local Pack factor — the wrong one caps your ceiling regardless of everything else.", "Add every applicable secondary category and list services individually with descriptions.", "Complete every field: hours, holiday hours, attributes, service area, booking link, products.", "Publish a post weekly and upload fresh photos monthly. Activity and photo freshness feed prominence.", "Build a review engine: ask every customer at the moment of satisfaction, and respond to 100% of reviews within 48 hours — review velocity and response rate both matter, not just star count.", "Fix NAP (name, address, phone) consistency across every directory and aggregator. Inconsistent data splits your entity signal.", "Seed local links: chamber of commerce, community organisations, local news. One regional publication mention outweighs dozens of generic directory links."],
    measure: ["Local Pack ranking for your top 10 service + location queries", "GBP Insights: calls, direction requests, website clicks, booking actions", "Review count, average rating, and review velocity per month", "Response rate and median response time"],
  },
  paid: {
    what: "Paid advertising covers Google Ads (Search, Performance Max, YouTube, Display, Shopping) and Meta Ads across Facebook and Instagram.",
    why: "Google captures demand that already exists — intent is high, cost per lead is usually higher, and conversion is faster. Meta creates demand — you interrupt a scroll, so reach is cheaper but the buying journey is longer. Most businesses need both. The failure mode is not choosing the wrong platform; it is running either one without knowing the cost per <em>qualified</em> lead, at which point every budget decision becomes a guess and spend quietly leaks.",
    doing: ["Install conversion tracking before increasing spend: GA4, Google Tag Manager, Meta Pixel plus the Conversions API, and call and form tracking.", "Define what a qualified lead actually is, and pass that definition back into the ad platforms as a conversion event.", "Start at roughly 60% Google for bottom-funnel search and 40% Meta for awareness and retargeting, then rebalance monthly against real CPL rather than opinion.", "Maintain negative keyword hygiene weekly. Wasted spend in search accounts is almost always a negative-keyword problem.", "Build a structured creative testing cycle for Meta. Creative is the single biggest performance variable in paid social — larger than bidding or targeting — and running the same creative for months guarantees decay.", "Align landing pages to ad promises. A mismatch between ad copy and page headline is one of the most common and most expensive conversion leaks.", "Layer retargeting: site visitors, video viewers, engaged social audiences, and past customers each deserve different messaging."],
    measure: ["Cost per qualified lead, by campaign and by creative", "Return on ad spend, or lead-to-customer rate where revenue is delayed", "Click-through rate and frequency (rising frequency with falling CTR signals creative fatigue)", "Share of budget in top-performing vs underperforming campaigns"],
  },
  content: {
    what: "Content and social covers what you publish organically — reels, photography, brand films, posts — and how consistently you show up on Instagram, Facebook, LinkedIn and YouTube.",
    why: "Content does two jobs simultaneously. Organically it compounds: a calendar maintained for six months builds an audience that costs nothing to reach again. In paid, it is the raw material — an ad account can only optimise what it is given, so creative quality directly caps performance. Consistency beats intensity here; sporadic posting never compounds into reach, no matter how good any individual post is.",
    doing: ["Move to a planned monthly calendar built around content pillars rather than posting whenever someone remembers.", "Batch production: one shoot day can supply a month of assets, which is what makes consistency affordable.", "Raise production quality on the one or two formats that actually convert for your category, rather than raising it everywhere.", "Write captions for reach and saves, not just description. Saves and shares are weighted more heavily than likes.", "Repurpose deliberately: a single brand film should yield reels, stills, ad creative and website assets.", "Manage community daily — replying to comments and DMs is a ranking and trust signal, and it is where a meaningful share of enquiries actually arrive.", "Feed winning organic content into paid. Content that performs organically is your cheapest source of proven ad creative."],
    measure: ["Publishing consistency: planned vs actually published", "Engagement rate, saves and shares (not follower count)", "Reach split between followers and non-followers", "Which organic posts convert best into ad creative"],
  },
  site: {
    what: "Website and tracking covers the site itself — speed, structure, conversion design — and the measurement layer underneath it.",
    why: "This pillar is the foundation the other four report into. Without attribution, you cannot tell which campaign, ad set or creative produced a lead, which means you cannot optimise, cannot defend budget, and cannot scale what works. Site speed compounds the problem: it is simultaneously a ranking factor and a conversion factor, so a slow site loses you traffic and then converts less of what remains.",
    doing: ["Install GA4 and Google Tag Manager, connect the Meta Pixel and Conversions API, and add call and form tracking so every enquiry is attributable to its source.", "Define conversion events that map to business outcomes, not page views.", "Fix Core Web Vitals: largest contentful paint, interaction to next paint, cumulative layout shift.", "Ensure the site is genuinely usable on a phone — the majority of local and social traffic arrives on mobile.", "Make the primary action unmistakable on every page. Most sites bury the one thing they want visitors to do.", "Add schema markup and keep it consistent with visible content. Mismatched schema risks being flagged rather than rewarded.", "Build a monthly reporting rhythm in plain language: what was spent, what it returned, what changes next month."],
    measure: ["Conversion rate by traffic source and by landing page", "Core Web Vitals scores on mobile and desktop", "Percentage of leads with a known attributed source", "Form abandonment and page-level drop-off"],
  },
};

const GLOSSARY: [string, string][] = [
  ["AEO (Answer Engine Optimisation)", "Structuring content so AI systems cite it as the source when generating an answer. SEO ranks pages; AEO selects sources."],
  ["Local Pack", "The three-business box with a map that appears above organic results for searches with local intent."],
  ["GBP", "Google Business Profile — the free listing that powers your presence in Google Maps and the Local Pack."],
  ["CPL", "Cost per lead. Cost per <em>qualified</em> lead is the number that actually matters."],
  ["ROAS", "Return on ad spend — revenue generated per unit of advertising spend."],
  ["Schema markup", "Structured data in JSON-LD that tells search engines and AI systems what your content means, not just what it says."],
  ["Core Web Vitals", "Google's page experience metrics covering loading speed, interaction responsiveness and visual stability."],
  ["Conversions API", "A server-side connection to Meta that recovers conversion data lost to browser and iOS tracking restrictions."],
  ["NAP consistency", "Identical name, address and phone number across every listing. Inconsistency splits your entity signal."],
  ["Retargeting", "Advertising specifically to people who have already interacted with you — normally the cheapest converting audience you have."],
];

const st = (v: number) => (v >= 70 ? "Healthy" : v >= 45 ? "Needs work" : "Critical gap");
const col = (v: number) => (v >= 70 ? "#3F7A1F" : v >= 45 ? "#B45309" : "#B4453A");
const dateStr = () => new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export function summaryReport(s: Scored, ans: (number | null)[]): string {
  const rows = (Object.keys(PILLARS) as PillarKey[]).map((k) => `<tr><td>${PILLARS[k]}</td><td style="text-align:right"><b>${s.p[k]}/100</b></td><td>${st(s.p[k])}</td><td style="text-align:right">${WEIGHT[k]}%</td></tr>`).join("");
  const fx = s.fixes.map(([, f], n) => `<div class="f"><h3>${n + 1}. ${f[0]}</h3><p>${f[1]}</p><p class="m"><b>Impact:</b> ${f[3]} &nbsp;&middot;&nbsp; <b>Effort:</b> ${f[4]} &nbsp;&middot;&nbsp; <b>Timeline:</b> ${f[2]} &nbsp;&middot;&nbsp; <b>Area:</b> ${PILLARS[s.fixes[n][0]]}</p></div>`).join("");
  const qa = QUESTIONS.map((q, n) => `<tr><td>${q.q}</td><td style="text-align:right">${Math.round((ans[n] || 0) * 100)}/100</td></tr>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>360 Growth Audit — Hey We Market</title>
<style>
@page{margin:18mm}
body{font-family:Archivo,-apple-system,Segoe UI,Roboto,sans-serif;color:#0F172A;max-width:820px;margin:0 auto;padding:40px 24px;line-height:1.6}
h1{font-size:30px;margin:0 0 6px;text-transform:uppercase;letter-spacing:-.02em}h2{font-size:19px;margin:32px 0 10px;padding-bottom:8px;border-bottom:3px solid #0F172A;text-transform:uppercase}
.brand{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#831843}
.score{display:flex;align-items:center;gap:20px;background:#EC4899;color:#000;border:3px solid #0F172A;box-shadow:6px 6px 0 #0F172A;padding:22px;margin:20px 0}
.score b{font-size:48px;line-height:1;font-weight:900}
.score .g{font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px}
th,td{padding:9px 10px;border-bottom:2px solid #0F172A;text-align:left}
th{background:#0F172A;color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
.f{background:#FDF2F8;border:2px solid #0F172A;border-left:6px solid #EC4899;padding:15px 18px;margin:10px 0}
.f h3{margin:0 0 6px;font-size:15px}.f p{margin:0;font-size:13px}
.f .m{margin-top:8px;font-size:12px;color:#475569}
.gap{background:#FCE7F3;border:2px solid #EC4899;padding:16px;margin:14px 0}
.gap b{font-size:18px;color:#831843;text-transform:uppercase}
.note{font-size:11px;color:#64748B;margin-top:6px}
.plan li{margin-bottom:8px;font-size:13px}
footer{margin-top:38px;padding-top:16px;border-top:3px solid #0F172A;font-size:11px;color:#64748B}
</style></head><body>
<div class="brand">Hey We Market &middot; 360 Growth Audit</div>
<h1>Your Digital Growth Report</h1>
<p style="color:#475569;font-size:13px">Generated ${dateStr()} &middot; Based on a 12-point self-assessment across five growth pillars</p>
<div class="score"><div><b>${s.total}</b><div style="font-size:13px;font-weight:700">out of 100</div></div>
<div><div class="g">${s.grade[0]}</div><div style="font-size:15px;margin-top:4px;font-weight:600">${s.grade[1]}</div></div></div>
<h2>Pillar Breakdown</h2>
<table><tr><th>Growth pillar</th><th style="text-align:right">Your score</th><th>Status</th><th style="text-align:right">Weight</th></tr>${rows}</table>
<p class="note">Pillar weights reflect where growth typically comes from for a small-to-mid business. Google Business Profile is weighted heavily because GBP signals carry roughly 32% of Google Local Pack ranking weight, with review signals contributing about a further 16%.</p>
<h2>Where You Are Losing Ground</h2>
<div class="gap"><b>${s.band[0]} of your reachable demand is likely going to competitors</b>
<p style="margin:8px 0 0;font-size:13px">Your two weakest areas are <b>${PILLARS[s.order[0]]}</b> and <b>${PILLARS[s.order[1]]}</b>. These are where prospective customers are actively looking for what you sell and not finding you.</p></div>
<p class="note">Directional estimate derived from your answers and published local and AI search ranking weights. It is not a revenue guarantee and should be treated as a prioritisation aid, not a forecast.</p>
<h2>Your 5 Highest-Impact Fixes</h2>${fx}
<h2>Suggested 90-Day Sequence</h2>
<ol class="plan">
<li><b>Days 1–30 — Fix the foundation.</b> Google Business Profile category, completeness, weekly posts and photos. Install GA4, Tag Manager and call/form tracking so everything after this is measurable. Start a review request habit.</li>
<li><b>Days 31–60 — Turn on demand capture.</b> With tracking live, run Google Ads against bottom-funnel search terms and Meta retargeting against site visitors. Establish your true cost per qualified lead before scaling spend.</li>
<li><b>Days 61–90 — Build compounding assets.</b> Publish question-shaped pages with direct answer blocks and schema markup so both Google and AI answer engines can cite you. Move content to a planned monthly calendar with proper production.</li>
</ol>
<h2>Your Answers</h2>
<table><tr><th>Question</th><th style="text-align:right">Score</th></tr>${qa}</table>
<h2>What Happens Next</h2>
<p style="font-size:13px">This report is yours to keep and act on — with your own team or any agency you choose. If you would like us to walk through it with you, we offer a free strategy call: no pitch, we go through your weakest pillar and tell you exactly what we would do first.</p>
<p style="font-size:13px"><b>hello@heywemarket.com</b></p>
<footer>Hey We Market — 360 Digital Marketing Agency. SEO &amp; AEO &middot; Google Business Profile &middot; Google Ads &middot; Meta Ads &middot; Content &amp; Production &middot; Social Media &middot; Commercial Shoots &middot; Branding &middot; Web Development &middot; Analytics &amp; CRO.<br>This audit is a self-assessment tool. Scores reflect the answers provided and published industry ranking-factor research; they are directional guidance, not a guarantee of results.</footer>
</body></html>`;
}

export function detailedReport(s: Scored, ans: (number | null)[]): string {
  const contents = s.order.map((k, n) => `<li>Section ${n + 3}: ${PILLARS[k]} — scored ${s.p[k]}/100${n === 0 ? " <em>(your weakest area)</em>" : ""}</li>`).join("");
  const deep = s.order.map((k, n) => {
    const P = PLAYBOOK[k];
    const v = s.p[k];
    const qs = QUESTIONS.map((q, idx) => ({ q, idx })).filter((x) => x.q.p === k);
    const answered = qs.map((x) => {
      const a = ans[x.idx];
      const chosen = x.q.o.find((o) => o[1] === a);
      return `<tr><td>${x.q.q}</td><td>${chosen ? chosen[0] : "—"}</td><td style="text-align:right;color:${col(Math.round((a || 0) * 100))}"><b>${Math.round((a || 0) * 100)}</b></td></tr>`;
    }).join("");
    return `<div class="sec">
      <div class="sec-head"><h2>Section ${n + 3}. ${PILLARS[k]}</h2>
      <span class="badge" style="background:${col(v)}">${v}/100 &middot; ${st(v)}</span></div>
      <p class="lead"><b>What this covers.</b> ${P.what}</p>
      <p><b>Why it matters.</b> ${P.why}</p>
      <h4>Your answers in this area</h4>
      <table><tr><th>Question</th><th>You answered</th><th style="text-align:right">Score</th></tr>${answered}</table>
      <h4>What we would do about it</h4>
      <ol class="steps">${P.doing.map((x) => `<li>${x}</li>`).join("")}</ol>
      <h4>How to know it is working</h4>
      <ul class="kpi-list">${P.measure.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>`;
  }).join("");
  const rows = (Object.keys(PILLARS) as PillarKey[]).map((k) => `<tr><td>${PILLARS[k]}</td><td style="text-align:right"><b>${s.p[k]}/100</b></td><td style="color:${col(s.p[k])}">${st(s.p[k])}</td><td style="text-align:right">${WEIGHT[k]}%</td><td style="text-align:right">${Math.round(((100 - s.p[k]) * WEIGHT[k]) / 100)}</td></tr>`).join("");
  const fx = s.fixes.map(([pk, f], n) => `<div class="f"><h3>Priority ${n + 1} — ${f[0]}</h3><p>${f[1]}</p><p class="m"><b>Impact:</b> ${f[3]} &nbsp;&middot;&nbsp; <b>Effort:</b> ${f[4]} &nbsp;&middot;&nbsp; <b>Timeline:</b> ${f[2]} &nbsp;&middot;&nbsp; <b>Pillar:</b> ${PILLARS[pk]}</p></div>`).join("");
  const gloss = GLOSSARY.map((g) => `<tr><td style="width:32%"><b>${g[0]}</b></td><td>${g[1]}</td></tr>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Detailed 360 Growth Audit — Hey We Market</title>
<style>
@page{margin:16mm;size:A4}
*{box-sizing:border-box}
body{font-family:Archivo,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#0F172A;max-width:860px;margin:0 auto;padding:44px 26px;line-height:1.6;font-size:15px}
h1{font-size:34px;margin:0 0 8px;line-height:1.05;text-transform:uppercase;letter-spacing:-.02em}
h2{font-size:20px;margin:0;text-transform:uppercase;letter-spacing:-.01em}
h3{font-size:16px;margin:0 0 6px}
h4{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#831843;margin:22px 0 8px}
.brand{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#831843}
.meta{color:#475569;font-size:13px;margin-bottom:22px}
.score{display:flex;align-items:center;gap:24px;background:#EC4899;color:#000;border:3px solid #0F172A;box-shadow:6px 6px 0 #0F172A;padding:24px;margin:22px 0}
.score .big{font-size:56px;line-height:1;font-weight:900}
.score .g{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.score .sub{font-size:15px;margin-top:4px;font-weight:600}
.sec{margin-top:36px;page-break-inside:avoid}
.sec-head{display:flex;align-items:center;justify-content:space-between;gap:14px;border-bottom:3px solid #0F172A;padding-bottom:8px;margin-bottom:14px;flex-wrap:wrap}
.badge{color:#fff;font-size:11px;font-weight:800;padding:5px 12px;white-space:nowrap;border:2px solid #0F172A}
table{width:100%;border-collapse:collapse;margin:10px 0 4px;font-size:13px}
th,td{padding:9px 10px;border-bottom:2px solid #0F172A;text-align:left;vertical-align:top}
th{background:#0F172A;color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
ol.steps{padding-left:20px}ol.steps li{margin-bottom:9px}
ul.kpi-list{padding-left:20px}ul.kpi-list li{margin-bottom:5px;color:#334155}
.f{background:#FDF2F8;border:2px solid #0F172A;border-left:6px solid #EC4899;padding:15px 18px;margin:10px 0;page-break-inside:avoid}
.f .m{margin:8px 0 0;font-size:12px;color:#475569}
.gap{background:#FCE7F3;border:2px solid #EC4899;padding:18px;margin:14px 0}
.gap b.h{font-size:19px;color:#831843;display:block;margin-bottom:8px;text-transform:uppercase}
.note{font-size:11px;color:#64748B;margin-top:8px;font-style:italic}
.toc{background:#F1EEF5;border:2px solid #0F172A;padding:18px 24px}
.toc ol{margin:8px 0 0;padding-left:20px}.toc li{margin-bottom:5px;font-size:13px}
.phase{border:2px solid #0F172A;padding:16px 20px;margin:10px 0;page-break-inside:avoid}
.phase h3{color:#831843;text-transform:uppercase}
.phase ul{padding-left:19px;margin:8px 0 0}.phase li{margin-bottom:6px;font-size:13px}
footer{margin-top:44px;padding-top:16px;border-top:3px solid #0F172A;font-size:11px;color:#64748B}
.pb{page-break-before:always}
@media print{body{padding:0}.noprint{display:none}}
.noprint{background:#0F172A;color:#fff;padding:14px 20px;margin-bottom:26px;font-size:13px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.noprint button{background:#EC4899;border:2px solid #fff;color:#000;font-weight:800;padding:9px 18px;cursor:pointer;font-size:13px;text-transform:uppercase}
</style></head><body>
<div class="noprint"><span>This is your full report. Use the button to save it as a PDF.</span><button onclick="window.print()">Save as PDF</button></div>
<div class="brand">Hey We Market &middot; 360 Digital Marketing Agency</div>
<h1>Detailed Growth Audit Report</h1>
<div class="meta">Generated ${dateStr()} &middot; 12-point assessment across five growth pillars &middot; Prepared for your internal use</div>
<div class="score"><div><div class="big">${s.total}</div><div style="font-size:13px;font-weight:700">out of 100</div></div>
<div><div class="g">${s.grade[0]}</div><div class="sub">${s.grade[1]}</div></div></div>
<div class="toc"><b>What is in this report</b><ol>
<li>Executive summary and benchmark</li>
<li>Priority action plan — your five highest-impact fixes</li>
${contents}
<li>Your 90-day implementation sequence</li>
<li>Glossary of terms</li>
</ol><p style="margin:12px 0 0;font-size:12px;color:#475569">Pillar sections are ordered weakest first, so the areas needing most attention appear earliest.</p></div>
<div class="sec"><div class="sec-head"><h2>Section 1. Executive Summary</h2></div>
<p>Your overall Growth Score is <b>${s.total}/100</b>, placing you in the <b>${s.grade[0].toLowerCase()}</b> band. ${s.grade[1]} The typical business completing this assessment scores around 54/100, which puts you <b>${Math.abs(s.total - 54)} points ${s.total >= 54 ? "above" : "below"}</b> that midpoint.</p>
<p>Your strongest area is <b>${PILLARS[s.order[s.order.length - 1]]}</b> at ${s.p[s.order[s.order.length - 1]]}/100. Your two weakest are <b>${PILLARS[s.order[0]]}</b> at ${s.p[s.order[0]]}/100 and <b>${PILLARS[s.order[1]]}</b> at ${s.p[s.order[1]]}/100 — these are where effort will produce the largest movement, and where this report concentrates.</p>
<h4>Pillar scorecard</h4>
<table><tr><th>Growth pillar</th><th style="text-align:right">Score</th><th>Status</th><th style="text-align:right">Weight</th><th style="text-align:right">Points lost</th></tr>${rows}</table>
<p class="note">Pillar weights reflect where growth typically originates for a small-to-mid business. Google Business Profile carries heavy weight because GBP signals account for roughly 32% of Google Local Pack ranking weight, with review signals contributing about a further 16%. "Points lost" shows how many points of your total score each pillar is currently costing you.</p>
<div class="gap"><b class="h">${s.band[0]} of your reachable demand is likely going to competitors</b>
<p style="margin:0;font-size:14px">Given the gaps identified in ${PILLARS[s.order[0]]} and ${PILLARS[s.order[1]]}, you are currently missing ${s.band[1]} — people actively looking for what you sell who never encounter you.</p>
<p class="note" style="margin-top:10px">This is a directional estimate derived from your answers combined with published local and AI search ranking-weight research. It is not a revenue forecast or a guarantee of results, and should be used to prioritise effort rather than to project income.</p></div>
</div>
<div class="sec"><div class="sec-head"><h2>Section 2. Priority Action Plan</h2></div>
<p>These five actions are ranked by expected impact relative to the effort required, drawn from your weakest pillars first. Working through them in order will move your score faster than working across all areas simultaneously.</p>
${fx}</div>
${deep}
<div class="sec pb"><div class="sec-head"><h2>Section 8. Your 90-Day Implementation Sequence</h2></div>
<p>Sequence matters as much as substance. Measurement comes before spend, because spending without attribution simply produces expensive guesses. Fast-moving local signals come before slow-compounding search assets, so you see momentum while the longer work matures.</p>
<div class="phase"><h3>Days 1–30 — Fix the foundation</h3><ul>
<li>Claim and fully optimise the Google Business Profile, starting with the correct primary category.</li>
<li>Begin a weekly GBP post and monthly photo cadence.</li>
<li>Launch a review request habit at the point of customer satisfaction; respond to every review within 48 hours.</li>
<li>Install GA4, Google Tag Manager, Meta Pixel with Conversions API, and call and form tracking.</li>
<li>Fix NAP consistency across all major directories.</li>
<li><b>Expected signal:</b> movement in calls and direction requests typically appears within 30–60 days.</li>
</ul></div>
<div class="phase"><h3>Days 31–60 — Turn on demand capture</h3><ul>
<li>With tracking verified, launch Google Ads against bottom-funnel search terms.</li>
<li>Launch Meta retargeting against site visitors and engaged social audiences.</li>
<li>Establish your true cost per qualified lead before increasing any budget.</li>
<li>Set a weekly negative keyword and creative review rhythm.</li>
<li>Align landing pages to the promises made in each ad.</li>
<li><b>Expected signal:</b> reliable CPL data after roughly 30–45 days of spend.</li>
</ul></div>
<div class="phase"><h3>Days 61–90 — Build compounding assets</h3><ul>
<li>Publish question-shaped pages, each opening with a self-contained 40–60 word direct answer.</li>
<li>Implement Organization, Service and FAQPage schema as a single linked graph.</li>
<li>Confirm AI crawlers are permitted in robots.txt, and publish an llms.txt summary.</li>
<li>Move content to a planned monthly calendar with batched production.</li>
<li>Feed the best-performing organic content into paid campaigns as proven creative.</li>
<li><b>Expected signal:</b> ranking movement from 4–8 weeks; competitive terms typically 4–6 months.</li>
</ul></div>
</div>
<div class="sec"><div class="sec-head"><h2>Section 9. Glossary</h2></div>
<table>${gloss}</table></div>
<div class="sec"><div class="sec-head"><h2>What happens next</h2></div>
<p>This report is yours to keep and act on — with your own team, a freelancer, or any agency you choose. Nothing in it is locked to us.</p>
<p>If you would like a second opinion on it, we offer a free strategy call. We take your weakest pillar, tell you specifically what we would do first, and you leave with that regardless of whether you work with us.</p>
<p style="font-size:16px;margin-top:14px"><b>hello@heywemarket.com</b></p></div>
<footer><b>Hey We Market</b> — 360 Digital Marketing Agency.<br>
SEO &amp; Answer Engine Optimisation &middot; Google Business Profile &amp; Local SEO &middot; Google Ads &middot; Meta Ads &middot; Analytics, CRO &amp; Reporting &middot; Content Creation &amp; Production &middot; Social Media Management &middot; Commercial Ad Shoots &middot; Branding &amp; Design &middot; Website Design &amp; Development.<br><br>
<b>About this assessment.</b> This report is generated from a 12-point self-assessment. Scores reflect the answers provided, weighted using published industry ranking-factor research. Figures cited for local and AI search ranking weights are drawn from publicly available 2026 industry studies. All outputs are directional guidance intended to help prioritise effort, and are not a guarantee of results.</footer>
</body></html>`;
}

export function downloadHtml(html: string, name: string) {
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
