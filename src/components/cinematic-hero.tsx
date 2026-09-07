"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { STATS } from "@/lib/site";
import { brutalButtonClass } from "@/components/brutal-button";
import { HeroField } from "@/components/hero-field";

export function CinematicHero() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden border-b border-border bg-paper">
      {/* generative, scroll-reactive backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <HeroField reduced={reduced} />
      </div>

      <div className="wrap relative z-10 flex min-h-[calc(100svh-66px)] flex-col justify-center py-[clamp(96px,16vh,180px)]">
        <div className="max-w-[640px] rounded-[22px] border border-border bg-background/72 p-[clamp(24px,4vw,44px)] shadow-soft-lg backdrop-blur-md">
          <p className="mono-label">Independent &middot; 360&deg; &middot; 100% in-house</p>
          <h1 className="mt-4 max-w-[16ch] text-balance text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em]">
            Every growth channel, run from <span className="hl-warm">one room</span>
          </h1>
          <p className="mt-5 max-w-[48ch] text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-foreground/80">
            SEO &amp; AEO, Google &amp; Meta Ads, Google Business Profile, content, social media, commercial shoots,
            branding and websites. One team. One strategy. One invoice.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contact" className={brutalButtonClass("primary")}>
              Start a project <ArrowRight />
            </a>
            <a href="#audit" className={brutalButtonClass("plain")}>
              Get a free growth audit
            </a>
          </div>
        </div>
      </div>

      <a
        href="#showreel"
        aria-label="Watch the showreel"
        className="absolute bottom-[max(env(safe-area-inset-bottom),clamp(20px,6vh,56px))] right-[clamp(16px,5vw,56px)] z-20 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft-lg backdrop-blur transition-transform duration-200 hover:-translate-y-1 sm:size-20"
      >
        <Play className="size-6 translate-x-0.5 fill-current sm:size-7" />
      </a>

      {/* stats band */}
      <div className="relative z-10 border-t border-border bg-card">
        <div className="wrap grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                "px-5 py-8 sm:px-7 " +
                (i % 2 === 1 ? "border-l border-border " : "") +
                (i >= 2 ? "border-t border-border sm:border-t-0 " : "") +
                (i % 4 !== 0 ? "sm:border-l sm:border-border" : "")
              }
            >
              <b className="block font-heading text-[clamp(2rem,4vw,3rem)] font-medium leading-none">{s.value}</b>
              <span className="mono-label mt-2.5 block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
