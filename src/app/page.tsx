import { ArrowRight, ArrowUpRight, Check, Star, X } from "lucide-react";
import {
  SERVICE_GROUPS,
  CASES,
  WHY,
  TESTIMONIALS,
} from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CinematicHero } from "@/components/cinematic-hero";
import { Ticker } from "@/components/ticker";
import { ClientMarquee } from "@/components/client-marquee";
import { getClients } from "@/lib/clients";
import { WorkGallery } from "@/components/work-gallery";
import { getWorkMedia } from "@/lib/work-media";
import { ProcessAccordion } from "@/components/process-accordion";
import { GrowthAudit } from "@/components/growth-audit";
import { Faq } from "@/components/faq";
import { brutalButtonClass } from "@/components/brutal-button";
import { GooeyBlobs, SkiperGooeyFilterProvider } from "@/components/ui/skiper64";

function ChapterHead({
  kicker,
  title,
  lead,
  dark,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-[clamp(36px,6vw,72px)] flex flex-col gap-[22px]">
      <Reveal
        as="p"
        className={
          "mono-label inline-block w-fit border-2 px-3 py-1.5 " +
          (dark ? "border-night-fg/50 text-night-fg" : "border-ink bg-card text-foreground")
        }
      >
        {kicker}
      </Reveal>
      <Reveal
        as="h2"
        delay={1}
        className={
          "max-w-[16ch] text-balance text-[clamp(2rem,6.4vw,4.6rem)] font-extrabold uppercase " +
          (dark ? "text-night-fg" : "")
        }
      >
        {title}
      </Reveal>
      {lead && (
        <Reveal
          as="p"
          delay={2}
          className={
            "max-w-[60ch] text-[clamp(1rem,1.6vw,1.2rem)] font-medium leading-[1.6] " +
            (dark ? "text-night-fg/70" : "text-foreground")
          }
        >
          {lead}
        </Reveal>
      )}
    </div>
  );
}

function MiniLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Reveal as="p" className="mt-[clamp(28px,4vw,44px)]">
      <a
        href={href}
        className="group inline-flex items-center gap-2.5 border-b-[3px] border-ink pb-1 font-mono text-[14px] font-bold uppercase tracking-[0.08em] transition-[gap,background-color] duration-150 hover:gap-4 hover:bg-primary"
      >
        {children} <ArrowRight className="size-4.5" />
      </a>
    </Reveal>
  );
}

function AnswerBlock({
  q,
  children,
  wide,
  delay,
}: {
  q: string;
  children: React.ReactNode;
  wide?: boolean;
  delay?: 1 | 2 | 3;
}) {
  return (
    <Reveal className={"mt-[clamp(26px,4vw,40px)] " + (wide ? "max-w-none" : "max-w-[70ch]")} delay={delay}>
      <h3 className="mb-3 text-[clamp(1.15rem,2.2vw,1.6rem)] font-normal normal-case tracking-[-0.01em]">{q}</h3>
      <div className="font-normal leading-[1.7] [&_b]:bg-muted [&_b]:shadow-[0_0_0_2px_var(--color-muted)]">
        {children}
      </div>
    </Reveal>
  );
}

export default function Home() {
  const workMedia = getWorkMedia();
  const clients = getClients();
  return (
    <>
      <CinematicHero />
      <ClientMarquee clients={clients} />
      <Ticker />

      {/* CH.01 — PROBLEM */}
      <section id="problem" className="section-pad">
        <div className="wrap">
          <ChapterHead
            kicker="Chapter 01 — The Problem"
            title="Most brands don't have a creativity problem"
            lead="They have a consistency and measurement problem. Great work happens in bursts, then stalls — and nobody can say what any of it returned."
          />
          <div className="mt-2 grid gap-[clamp(16px,3vw,28px)] md:grid-cols-2">
            <Reveal className="brutal-box p-[clamp(20px,3vw,32px)]">
              <h3 className="mb-4 border-b-[3px] border-current pb-3.5 text-[clamp(1rem,2vw,1.35rem)] font-extrabold uppercase">
                Before Hey We Market
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "Posting whenever someone remembers to",
                  "Phone-shot photos that undersell the product",
                  "Ads running with no idea what a lead costs",
                  "Three freelancers, three different visual styles",
                  "Followers going up, sales staying flat",
                  "Reports full of impressions, empty of insight",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] font-medium leading-snug">
                    <X className="mt-0.5 size-5 shrink-0" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={1} className="brutal-box bg-primary p-[clamp(20px,3vw,32px)] text-primary-foreground">
              <h3 className="mb-4 border-b-[3px] border-current pb-3.5 text-[clamp(1rem,2vw,1.35rem)] font-extrabold uppercase">
                After Hey We Market
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "A content calendar planned a month ahead",
                  "Cinematic shoots that make the brand look premium",
                  "Every campaign tracked to cost-per-lead",
                  "One in-house team, one consistent brand voice",
                  "Content that converts, not just collects likes",
                  "Plain-language reports: spend, return, next step",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] font-medium leading-snug">
                    <Check className="mt-0.5 size-5 shrink-0" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <MiniLink href="#approach">See how we fix it</MiniLink>
        </div>
      </section>

      {/* CH.02 — APPROACH */}
      <section id="approach" className="section-pad border-t-[3px] border-ink">
        <div className="wrap">
          <ChapterHead
            kicker="Chapter 02 — What 360° Actually Means"
            title={<>Strategy, creative and media buying that stay aligned</>}
          />

          <AnswerBlock q="What is a 360-degree digital marketing agency?">
            <p>
              A 360-degree digital marketing agency handles every channel a brand needs from one place — search (SEO and AEO),
              paid advertising (Google Ads and Meta Ads), local search (Google Business Profile), organic social, content and
              video production, branding, and the website itself. <b>The advantage isn&rsquo;t the checklist — it&rsquo;s that
              strategy, creative and media buying stay aligned</b> instead of being split across vendors with conflicting
              incentives.
            </p>
          </AnswerBlock>

          <div className="mt-[clamp(26px,4vw,40px)] grid gap-[clamp(20px,3vw,40px)] md:grid-cols-2">
            <AnswerBlock q="Get Found vs Get Leads">
              <p>
                <b>SEO, AEO and Google Business Profile</b> capture people already looking for you — slower to build, cheaper
                forever. <b>Google Ads and Meta Ads</b> buy attention today — instant, but it stops the moment you stop paying.
                Brands that only do one end up either invisible or renting their entire pipeline.
              </p>
            </AnswerBlock>
            <AnswerBlock q="Why creative and media can't be separated" delay={1}>
              <p>
                An ad account can only optimize what it&rsquo;s given. <b>In performance marketing, creative is the biggest
                variable</b> — bigger than bidding or targeting. When the team shooting the reels also reads the CPL dashboard,
                the next shoot is briefed by data instead of taste.
              </p>
            </AnswerBlock>
          </div>

          <AnswerBlock q="Google Ads vs Meta Ads: which one does your business need?" wide>
            <p className="max-w-[62ch]">
              Short answer: most businesses need both, in different proportions. Here&rsquo;s how they actually differ.
            </p>
            <div className="mt-7 overflow-x-auto border-[3px] border-ink bg-card shadow-brutal">
              <table className="w-full min-w-[640px] border-collapse text-[14px]">
                <thead>
                  <tr>
                    {["Factor", "Google Ads", "Meta Ads (FB & Instagram)"].map((h) => (
                      <th
                        key={h}
                        className="border-b-2 border-ink bg-ink px-4 py-3.5 text-left font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-background"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Buyer intent", "High — they're actively searching for your product right now", "Low to medium — you're interrupting a scroll"],
                    ["What it does", "Captures existing demand", "Creates new demand"],
                    ["Cost per lead", "Usually higher, but leads convert faster", "Usually lower, but needs nurturing"],
                    ["Creative load", "Lower — text ads and simple assets go far", "Very high — creative is the main performance lever"],
                    ["Best for", "Services, clinics, real estate, B2B, high-consideration purchases", "Restaurants, D2C, fashion, resorts, launches, visual products"],
                    ["Time to signal", "1–2 weeks with enough search volume", "2–4 weeks of creative testing"],
                    ["Typical starting split", "~60% of budget", "~40% of budget"],
                  ].map((row, ri) => (
                    <tr key={ri} className="last:[&_td]:border-b-0 last:[&_th]:border-b-0">
                      <th className="w-[22%] border-b-2 border-ink bg-muted px-4 py-3.5 text-left align-top font-heading text-[12px] font-bold uppercase tracking-[0.02em]">
                        {row[0]}
                      </th>
                      <td className="border-b-2 border-ink px-4 py-3.5 align-top font-normal leading-snug">{row[1]}</td>
                      <td className="border-b-2 border-ink px-4 py-3.5 align-top font-normal leading-snug">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnswerBlock>

          <AnswerBlock q="Why Google Business Profile is usually the fastest win" wide>
            <div className="grid gap-[clamp(14px,2vw,20px)] sm:grid-cols-3">
              {[
                ["32%", "of Google Local Pack ranking weight comes from Google Business Profile signals — the largest single factor group.", "Local ranking factor studies, 2026"],
                ["46%", "of all Google searches now carry local intent, and GBP actions like calls and direction requests rose 41% year-on-year.", "Local search data, 2026"],
                ["16%", "of local ranking weight sits in review signals alone — quantity, velocity, diversity and sentiment.", "Local ranking factor studies, 2026"],
              ].map(([n, p, s]) => (
                <div key={n} className="brutal-box shadow-brutal-sm p-5">
                  <b className="block font-heading text-[clamp(2rem,4vw,2.8rem)] font-black leading-none text-primary [-webkit-text-stroke:1.5px_var(--color-ink)]">
                    {n}
                  </b>
                  <p className="mt-3 text-[14px] font-normal leading-snug">{p}</p>
                  <small className="mt-3 block font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">{s}</small>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[64ch] font-normal leading-[1.7]">
              This is why we usually start with GMB and local SEO: it typically moves calls and direction requests within{" "}
              <b>30–60 days</b>, while broader SEO compounds over four to six months in the background.
            </p>
          </AnswerBlock>

          <AnswerBlock q="SEO vs AEO: ranking isn't the same as being cited">
            <p>
              AEO is the practice of structuring a site so ChatGPT, Perplexity, Google AI Overviews, Gemini and Copilot{" "}
              <b>cite it as the source when they write an answer</b>. SEO targets a rank position a human clicks; AEO targets
              selection inside an answer written before any links are shown. It runs on structured data, question-shaped
              headings, self-contained 40–60 word answer blocks, verifiable statistics and third-party mentions.{" "}
              <b>With a growing share of searches ending without a click, a brand can lose visibility while its rankings stay flat.</b>
            </p>
          </AnswerBlock>

          <MiniLink href="#services">See the services</MiniLink>
        </div>
      </section>

      {/* CH.03 — SERVICES */}
      <section id="services" className="section-pad border-t-[3px] border-ink">
        <div className="wrap">
          <ChapterHead
            kicker="Chapter 03 — Everything Under One Roof"
            title="Ten services. Four jobs. One team."
            lead="Get Found · Get Leads · Get Noticed · Get Built. From technical SEO to cinematic ad shoots to the website itself."
          />
          <div className="flex flex-col gap-[clamp(20px,3vw,32px)]">
            {SERVICE_GROUPS.map((g) => (
              <Reveal key={g.key} className="brutal-box">
                <div className="flex items-baseline gap-3.5 bg-ink px-[clamp(16px,2.5vw,28px)] py-4 text-background">
                  <span className="font-mono text-[12px] font-bold text-primary">{g.key}</span>
                  <h3 className="text-[clamp(1.1rem,2.4vw,1.8rem)] font-extrabold uppercase">{g.name}</h3>
                </div>
                {g.services.map((s) => (
                  <div
                    key={s.idx}
                    className="grid gap-[clamp(14px,3vw,36px)] border-t-2 border-ink px-[clamp(16px,2.5vw,28px)] py-[clamp(20px,3vw,30px)] md:grid-cols-[56px_1.1fr_1.6fr]"
                  >
                    <div className="font-mono text-[14px] font-bold text-muted-foreground">{s.idx}</div>
                    <h4 className="text-[clamp(1rem,1.9vw,1.35rem)] font-extrabold uppercase leading-[1.15]">
                      {s.title}{" "}
                      <span className="hl-pink box-decoration-clone">{s.underline}</span>
                    </h4>
                    <div>
                      <p className="text-[15px] font-normal leading-[1.65]">{s.body}</p>
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="border-2 border-ink bg-muted px-2.5 py-[5px] font-mono text-[10.5px] uppercase tracking-[0.04em]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
          <MiniLink href="#work">See the results</MiniLink>
        </div>
      </section>

      {/* CH.04 — WORK */}
      <section id="work" className="section-pad border-t-[3px] border-ink">
        <div className="wrap">
          <ChapterHead
            kicker="Chapter 04 — Campaigns That Delivered Numbers"
            title="Creative work is only worth it when it moves a metric"
          />
          <Reveal className="brutal-box">
            {CASES.map((c) => (
              <a
                key={c.title}
                href="#contact"
                className="group grid items-center gap-[clamp(14px,3vw,32px)] border-t-2 border-ink px-[clamp(16px,2.5vw,28px)] py-[clamp(20px,3vw,30px)] transition-colors duration-150 first:border-t-0 hover:bg-muted lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)_minmax(0,280px)_44px]"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-accent">{c.cat}</span>
                <h3 className="text-[clamp(1.05rem,2.1vw,1.5rem)] font-normal normal-case leading-[1.15] tracking-[-0.01em]">
                  {c.title}
                </h3>
                <span className="flex gap-5">
                  {c.metrics.map((m) => (
                    <span key={m.l}>
                      <b className="block font-heading text-[1.5rem] font-black leading-none text-primary [-webkit-text-stroke:1px_var(--color-ink)]">
                        {m.v}
                      </b>
                      <small className="font-mono text-[9.5px] uppercase tracking-[0.03em] text-muted-foreground">{m.l}</small>
                    </span>
                  ))}
                </span>
                <span className="hidden justify-self-end text-muted-foreground transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground lg:block">
                  <ArrowUpRight className="size-6.5" strokeWidth={3} />
                </span>
              </a>
            ))}
          </Reveal>
          <p
            className="mono-label mb-6 mt-[clamp(40px,6vw,64px)] inline-block border-2 border-ink bg-card px-3 py-1.5"
            data-reveal=""
          >
            Selected reels
          </p>
          <WorkGallery items={workMedia} />
          <MiniLink href="#audit">Score your own setup</MiniLink>
        </div>
      </section>

      {/* CH.05 — AUDIT */}
      <section id="audit" className="section-pad border-y-[3px] border-ink bg-night text-night-fg">
        <div className="wrap">
          <ChapterHead
            dark
            kicker="Chapter 05 — Free 360° Growth Audit"
            title="Score your marketing in 90 seconds"
            lead={
              <>
                Agencies charge ₹15,000–40,000 for this. Answer 12 questions and get a scored report across search, Google
                Business Profile, paid ads, content and tracking — with your five highest-impact fixes ranked by effort.{" "}
                <b className="text-primary">No email needed to see your score.</b>
              </>
            }
          />
          <GrowthAudit />
        </div>
      </section>

      {/* CH.06 — METHOD */}
      <section id="process" className="section-pad border-t-[3px] border-ink">
        <div className="wrap">
          <ChapterHead kicker="Chapter 06 — Simple Process, Powerful Results" title="Five steps. No mystery." />
          <ProcessAccordion />

          <div className="mt-[clamp(64px,10vw,132px)]">
            <ChapterHead kicker="Why Us" title="Why brands choose Hey We Market" />
            <Reveal className="brutal-box grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {WHY.map((w, i) => (
                <div
                  key={w.n}
                  className={
                    "border-ink p-[clamp(20px,3vw,30px)] " +
                    "border-t-2 sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0 " +
                    "sm:border-l-2 sm:[&:nth-child(odd)]:border-l-0 lg:[&:nth-child(3n+1)]:border-l-0 " +
                    (i === 0 ? "border-t-0" : "")
                  }
                >
                  <span className="mb-3 block font-mono text-[13px] font-bold text-primary">{w.n}</span>
                  <h3 className="mb-2 text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase tracking-[-0.01em]">{w.title}</h3>
                  <p className="text-[14px] font-normal leading-[1.6] text-muted-foreground">{w.body}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <MiniLink href="#testi">Read the reviews</MiniLink>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testi" className="section-pad border-t-[3px] border-ink">
        <div className="wrap">
          <ChapterHead kicker="In Their Words" title="Real words. Real results." />
          <div className="grid gap-[clamp(16px,2.5vw,24px)] md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={(i as 0 | 1 | 2) || undefined} className="brutal-box flex flex-col p-[clamp(22px,3vw,30px)]">
                <div className="mb-4 flex gap-1" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4.5 fill-primary stroke-ink" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="flex-1 font-heading text-[clamp(1rem,1.8vw,1.2rem)] font-bold normal-case leading-[1.3] tracking-[-0.01em]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <small className="mt-5 border-t-2 border-ink pt-4 font-mono text-[10.5px] uppercase tracking-[0.05em] text-muted-foreground">
                  {t.who}
                </small>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad border-t-[3px] border-ink">
        <div className="wrap-narrow">
          <ChapterHead kicker="FAQ" title="Questions, answered properly" />
          <Faq />
        </div>
      </section>

      {/* CLIMAX CTA */}
      <section id="cta" className="section-pad relative overflow-hidden border-y-[3px] border-ink bg-night text-night-fg">
        <SkiperGooeyFilterProvider />
        <GooeyBlobs
          className="pointer-events-none absolute inset-0 z-0 [&>*]:pointer-events-auto"
          blobs={[
            { size: 110, x: -2, y: 30, color: "#b3a2cc" },
            { size: 85, x: 3, y: 52, color: "#0891b2" },
            { size: 140, x: 82, y: 14, color: "#b3a2cc" },
            { size: 95, x: 90, y: 40, color: "#0891b2" },
            { size: 70, x: 78, y: 74, color: "#cdbfe3" },
          ]}
        />
        <div className="wrap relative z-10">
          <Reveal as="p" className="mono-label inline-block w-fit border-2 border-night-fg/50 bg-night px-3 py-1.5">
            The Finale — Your Turn
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-[22px] max-w-[16ch] text-balance text-[clamp(2.4rem,8vw,6rem)] font-black uppercase tracking-[-0.03em]">
            Ready to build something people <span className="hl-pink box-decoration-clone">remember?</span>
          </Reveal>
          <Reveal delay={2} className="mt-[26px] font-mono text-[clamp(0.9rem,1.8vw,1.15rem)] font-bold uppercase leading-[2] text-night-fg/65">
            Content people <b className="hl-cyan box-decoration-clone">save</b>.<br />
            Campaigns people <b className="hl-cyan box-decoration-clone">click</b>.<br />
            Brands people <b className="hl-cyan box-decoration-clone">trust</b>.
          </Reveal>
          <Reveal delay={3} className="mt-9">
            <a href="#contact" className={brutalButtonClass("primary")}>
              Book a free strategy call <ArrowRight />
            </a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad">
        <div className="wrap grid gap-[clamp(28px,5vw,64px)] md:grid-cols-2">
          <div>
            <Reveal as="p" className="mono-label inline-block w-fit border-2 border-ink bg-card px-3 py-1.5">
              Contact
            </Reveal>
            <Reveal as="h2" delay={1} className="mb-[18px] mt-[18px] text-[clamp(2rem,5.5vw,3.6rem)] font-extrabold uppercase">
              Let&rsquo;s connect
            </Reveal>
            <Reveal delay={2} className="max-w-[44ch] font-normal leading-[1.6]">
              Tell us about your brand and we&rsquo;ll get back within 24 hours with ideas, not a sales pitch.
            </Reveal>
            <Reveal delay={3} className="mt-[26px] flex flex-wrap gap-2">
              {["Instagram", "Facebook", "LinkedIn", "WhatsApp"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="inline-flex min-h-10 items-center border-2 border-ink bg-card px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.05em] transition-colors duration-150 hover:bg-ink hover:text-background"
                >
                  {s}
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal delay={1} className="brutal-box">
            {[
              ["Email", <a key="e" href="mailto:hello@heywemarket.com" className="[overflow-wrap:anywhere]">hello@heywemarket.com</a>],
              ["Phone", <a key="p" href="tel:+919826026029">+91 98260 26029</a>],
              ["Hours", <span key="h">Mon–Sat · 10 AM – 7 PM IST</span>],
              ["Audit", <a key="a" href="#audit">Run the free 360° growth audit &rarr;</a>],
            ].map(([label, val], i) => (
              <div
                key={i}
                className="flex items-baseline gap-4 border-t-2 border-ink px-[clamp(16px,2.5vw,24px)] py-[18px] text-[15px] font-medium first:border-t-0"
              >
                <span className="w-16 shrink-0 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-muted-foreground">
                  {label as string}
                </span>
                {val}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
