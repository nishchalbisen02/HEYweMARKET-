import { ArrowRight, Play } from "lucide-react";
import { STATS } from "@/lib/site";
import { brutalButtonClass } from "@/components/brutal-button";

export function CinematicHero() {
  return (
    <section id="hero" aria-label="Introduction" className="relative border-b border-border/60">
      <div className="wrap relative z-10 flex min-h-[calc(100svh-66px)] flex-col justify-center py-[clamp(96px,16vh,180px)]">
        <div className="max-w-[660px] rounded-[22px] border border-white/25 bg-[color-mix(in_srgb,var(--card)_66%,transparent)] p-[clamp(24px,4vw,46px)] shadow-soft-lg backdrop-blur-xl">
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
      <div className="relative z-10 border-t border-border/60 bg-[color-mix(in_srgb,var(--card)_80%,transparent)] backdrop-blur-md">
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
