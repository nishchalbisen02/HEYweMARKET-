import type { Metadata } from "next";
import { ArrowDown, Sparkles, GraduationCap, Cpu, Target } from "lucide-react";
import { JOBS, VALUES } from "@/lib/careers";
import { Reveal } from "@/components/reveal";
import { ApplyButton } from "@/components/careers/apply-button";
import { ApplicationForm } from "@/components/careers/application-form";

export const metadata: Metadata = {
  title: "Careers — Hey We Market | Join an AI-first creative team",
  description:
    "Cool people wanted. Join Hey We Market and help build the future of smarter marketing, technology and commerce. Roles and internships in design, social, content and marketing.",
  alternates: { canonical: "https://heywemarket.com/careers" },
  openGraph: {
    title: "Careers — Hey We Market",
    description:
      "Join Hey We Market and help us build the future of smarter marketing, technology and commerce.",
    url: "https://heywemarket.com/careers",
    type: "website",
  },
};

const VALUE_ICONS = [Sparkles, GraduationCap, Cpu, Target];

export default function CareersPage() {
  return (
    <div id="top">
      {/* 1 — HERO */}
      <section aria-label="Careers introduction" className="border-b border-border bg-[color-mix(in_srgb,var(--color-night)_90%,transparent)] text-background">
        <div className="wrap grid gap-[clamp(28px,5vw,64px)] py-[clamp(72px,10vw,120px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <Reveal className="mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="border border-orange shadow-soft-lg">
              <picture>
                <source srcSet="/careers/hiring-poster.webp" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/careers/hiring-poster.jpg"
                  alt="Hey We Market — We are hiring"
                  width={1086}
                  height={1448}
                  className="block w-full"
                />
              </picture>
            </div>
          </Reveal>

          <div>
            <Reveal as="p" className="mono-label inline-block border border-orange px-3 py-1.5 text-orange">
              Careers // Hey We Market
            </Reveal>
            <Reveal
              as="h1"
              delay={1}
              className="mt-5 text-[clamp(2.6rem,8vw,5.5rem)]  leading-[0.92] tracking-[-0.03em]"
            >
              Cool People <span className="text-orange">Wanted.</span>
            </Reveal>
            <Reveal as="p" delay={2} className="mt-5 max-w-[52ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-background/70">
              Join Hey We Market and help us build the future of smarter marketing, technology and commerce.
            </Reveal>
            <Reveal delay={3} className="mt-8">
              <a
                href="#opportunities"
                className="inline-flex items-center gap-2.5 border border-background/40 bg-orange px-7 py-4 font-heading text-[15px]  tracking-[0.02em] text-ink shadow-soft transition-transform duration-150 hover:-translate-y-[2px] hover:shadow-soft-lg"
              >
                Explore opportunities <ArrowDown className="size-5" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2 — WHY JOIN */}
      <section aria-label="Why join us" className="section-pad border-b border-border">
        <div className="wrap">
          <Reveal as="h2" className="max-w-[18ch] text-balance text-[clamp(2rem,6vw,3.6rem)] ">
            Build. Create. Grow With Us.
          </Reveal>
          <Reveal as="p" delay={1} className="mt-5 max-w-[62ch] text-[clamp(1rem,1.6vw,1.15rem)] leading-relaxed text-foreground">
            We’re looking for curious minds, creative thinkers and people who love turning ideas into impact. Whether
            you&apos;re a fresher, an experienced professional or someone looking for an internship, there’s a place for
            you at Hey We Market.
          </Reveal>

          <div className="mt-[clamp(32px,5vw,56px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal
                  key={v.title}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                  className="flex flex-col gap-3 border border-border bg-card p-5 shadow-brutal-sm"
                >
                  <span className="grid size-11 place-items-center border border-border bg-orange text-ink">
                    <Icon className="size-5" />
                  </span>
                  <b className="font-heading text-[1.05rem]  leading-tight">{v.title}</b>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground">{v.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 — OPPORTUNITIES */}
      <section id="opportunities" aria-label="Opportunities" className="section-pad border-b border-border bg-[color-mix(in_srgb,var(--muted)_72%,transparent)] backdrop-blur-md">
        <div className="wrap">
          <Reveal as="p" className="mono-label inline-block border border-border bg-card px-3 py-1.5">
            Opportunities
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-4 text-[clamp(2rem,6vw,3.6rem)] ">
            Find your place.
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 max-w-[50ch] text-[clamp(1rem,1.6vw,1.15rem)] text-foreground">
            Bring your ideas. Make an impact.
          </Reveal>

          <div className="mt-[clamp(32px,5vw,56px)] grid gap-5 md:grid-cols-2">
            {JOBS.map((job, i) => (
              <Reveal
                key={job.slug}
                delay={((i % 2) + 1) as 1 | 2}
                className="flex flex-col border border-border bg-card p-6 shadow-brutal sm:p-7"
              >
                <h3 className="text-[clamp(1.3rem,2.6vw,1.8rem)]  leading-tight">{job.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="border border-border bg-orange px-2.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink">
                    {job.employment}
                  </span>
                  <span className="border border-border px-2.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em]">
                    {job.experience}
                  </span>
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">{job.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {job.skills.map((s) => (
                    <li key={s} className="border border-ink/40 px-2 py-1 text-[12px] font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-1">
                  <ApplyButton role={job.title} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — FRESHERS */}
      <section aria-label="For freshers" className="section-pad border-b border-border bg-[color-mix(in_srgb,var(--color-night)_90%,transparent)] text-background">
        <div className="wrap grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Reveal as="h2" className="max-w-[16ch] text-[clamp(2rem,6vw,3.8rem)]  leading-[0.95]">
              Freshers, <span className="text-orange">This One’s For You.</span>
            </Reveal>
            <Reveal as="p" delay={1} className="mt-5 max-w-[52ch] whitespace-pre-line text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-background/75">
              {"No big experience? No problem.\nIf you have curiosity, creativity and the hunger to learn, we want to hear from you."}
            </Reveal>
          </div>
          <Reveal delay={2} className="lg:justify-self-end">
            <a
              href="#apply"
              className="inline-flex items-center gap-2.5 border border-background/40 bg-orange px-7 py-4 font-heading text-[15px]  tracking-[0.02em] text-ink shadow-soft transition-transform duration-150 hover:-translate-y-[2px] hover:shadow-soft-lg"
            >
              Start your journey
            </a>
          </Reveal>
        </div>
      </section>

      {/* 5 — APPLICATION FORM */}
      <section id="apply" aria-label="Application form" className="section-pad scroll-mt-[80px]">
        <div className="wrap-narrow">
          <Reveal as="h2" className="text-[clamp(2rem,6vw,3.6rem)] ">
            Ready to Join Us?
          </Reveal>
          <Reveal as="p" delay={1} className="mb-[clamp(28px,4vw,44px)] mt-3 max-w-[52ch] text-[clamp(1rem,1.6vw,1.15rem)] text-foreground">
            Tell us about yourself. Show us what you can do.
          </Reveal>
          <ApplicationForm />
        </div>
      </section>
    </div>
  );
}
