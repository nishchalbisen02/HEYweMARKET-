import type { Metadata } from "next";
import { ArrowDown, Sparkles, GraduationCap, Cpu, Target } from "lucide-react";
import { JOBS, VALUES } from "@/lib/careers";
import { OG_IMAGE } from "@/lib/site";
import { careersGraph } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ApplyButton } from "@/components/careers/apply-button";
import { ApplicationForm } from "@/components/careers/application-form";

export const metadata: Metadata = {
  title: "Careers — Join Our Creative Team in Bhopal",
  description:
    "Cool people wanted. Join Hey We Market in Bhopal and help build the future of smarter marketing, technology and commerce. Roles and internships in design, social media, content and marketing.",
  alternates: { canonical: "/careers", languages: { "en-IN": "/careers", "x-default": "/careers" } },
  openGraph: {
    type: "website",
    siteName: "Hey We Market",
    title: "Careers — Hey We Market",
    description:
      "Join Hey We Market and help us build the future of smarter marketing, technology and commerce.",
    url: "/careers",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — Hey We Market",
    description:
      "Join Hey We Market and help us build the future of smarter marketing, technology and commerce.",
    images: [OG_IMAGE.url],
  },
};

const VALUE_ICONS = [Sparkles, GraduationCap, Cpu, Target];
const DELAYS = ["", " d1", " d2", " d3"] as const;

export default function CareersPage() {
  return (
    <div id="top">
      <JsonLd data={careersGraph()} />

      {/* 1 — HERO */}
      <section aria-label="Careers introduction" className="bg-[var(--band)] pb-[100px] pt-[150px] text-white">
        <div className="wrap grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div className="rv in mx-auto w-full max-w-[420px] overflow-hidden rounded-[24px] border border-white/15 shadow-[0_25px_50px_rgb(0_0_0/0.35)] lg:mx-0">
            <picture>
              <source srcSet="/careers/hiring-poster.webp" type="image/webp" />
              <img
                src="/careers/hiring-poster.jpg"
                alt="Hey We Market — We are hiring"
                width={1086}
                height={1448}
                className="block h-auto w-full"
              />
            </picture>
          </div>

          <div>
            <div className="chapter rv in">
              <b>Careers // Hey We Market</b>
            </div>
            <h1 className="rv in d1 mx-0 max-w-none text-left text-white [text-shadow:none]">
              Cool People <span className="grad">Wanted.</span>
            </h1>
            <p className="rv in d2 mt-6 max-w-[52ch] text-[clamp(1.05rem,1.7vw,1.25rem)] leading-relaxed text-white/75">
              Join Hey We Market and help us build the future of smarter marketing, technology and commerce.
            </p>
            <div className="rv in d3 mt-9">
              <a href="#opportunities" className="btn btn-primary magnetic bg-[var(--lime)] text-black">
                <span className="inline-flex items-center gap-2.5">
                  Explore opportunities <ArrowDown className="size-5" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — WHY JOIN */}
      <section aria-label="Why join us">
        <div className="wrap">
          <div className="chapter rv">
            <b>Why Hey We Market</b>
          </div>
          <h2 className="rv d1 max-w-[18ch]">Build. Create. Grow With Us.</h2>
          <p className="sub rv d2">
            We’re looking for curious minds, creative thinkers and people who love turning ideas into impact. Whether
            you&apos;re a fresher, an experienced professional or someone looking for an internship, there’s a place for
            you at Hey We Market.
          </p>

          <div className="mt-[clamp(36px,5vw,60px)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div key={v.title} className={`k-card rv scale flex flex-col gap-3 p-6${DELAYS[i]}`}>
                  <span className="grid size-12 place-items-center rounded-2xl bg-[var(--lime)] text-black">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-[1.2rem] leading-tight">{v.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mute">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 — OPPORTUNITIES */}
      <section id="opportunities" aria-label="Opportunities" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <div className="chapter rv">
            <b>Opportunities</b>
          </div>
          <h2 className="rv d1">Find your place.</h2>
          <p className="sub rv d2">Bring your ideas. Make an impact.</p>

          <div className="mt-[clamp(36px,5vw,60px)] grid gap-6 md:grid-cols-2">
            {JOBS.map((job, i) => (
              <article key={job.slug} className={`k-card rv scale flex flex-col p-7 sm:p-9${DELAYS[i % 2 + 1]}`}>
                <h3 className="text-[clamp(1.35rem,2.4vw,1.8rem)] leading-tight">{job.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="k-chip k-chip--lime">{job.employment}</span>
                  <span className="k-chip">{job.experience}</span>
                </div>
                <p className="mt-5 text-[15.5px] leading-relaxed text-mute">{job.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${job.title} skills`}>
                  {job.skills.map((s) => (
                    <li key={s} className="k-chip bg-[var(--bg)] font-semibold">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ApplyButton role={job.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — FRESHERS */}
      <section aria-label="For freshers" className="bg-[var(--band)] text-white">
        <div className="wrap grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="chapter rv">
              <b>For Freshers</b>
            </div>
            <h2 className="rv d1 max-w-[16ch] text-white">
              Freshers, <span className="grad">This One’s For You.</span>
            </h2>
            <p className="sub rv d2 whitespace-pre-line text-white/75">
              {"No big experience? No problem.\nIf you have curiosity, creativity and the hunger to learn, we want to hear from you."}
            </p>
          </div>
          <div className="rv d3 lg:justify-self-end">
            <a href="#apply" className="btn magnetic bg-[var(--lime)] font-bold text-black">
              Start your journey
            </a>
          </div>
        </div>
      </section>

      {/* 5 — APPLICATION FORM */}
      <section id="apply" aria-label="Application form" className="scroll-mt-[80px]">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="chapter rv">
            <b>Apply</b>
          </div>
          <h2 className="rv d1">Ready to Join Us?</h2>
          <p className="sub rv d2 mb-[clamp(32px,4vw,52px)]">Tell us about yourself. Show us what you can do.</p>
          <ApplicationForm />
        </div>
      </section>
    </div>
  );
}
