"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { STATS } from "@/lib/site";
import { brutalButtonClass } from "@/components/brutal-button";

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const insetPct = useTransform(scrollYProgress, [0, 0.8], [6, 0]);
  const clip = useMotionTemplate`inset(${insetPct}% round 0px)`;
  const mediaY = useTransform(scrollYProgress, [0, 1], [-24, 28]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const panelOpacity = useTransform(scrollYProgress, [0.55, 0.95], [1, 0]);

  return (
    <section ref={ref} id="hero" aria-label="Introduction" className={reduced ? "relative" : "relative h-[180svh]"}>
      <div
        className={
          "overflow-hidden border-b-[3px] border-ink " +
          (reduced ? "relative" : "sticky top-0 h-svh")
        }
      >
        {/* video / poster */}
        <div className="absolute inset-0 bg-paper" />
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale, clipPath: clip, y: mediaY, willChange: "transform" }}
        >
          {reduced ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="/hero-poster.jpg" alt="" className="size-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              className="size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero-poster.jpg"
            >
              <source src="/hero.webm" type="video/webm" />
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
        {/* light wash so dark type stays legible over the video */}
        <div className="absolute inset-0 bg-[rgba(246,242,250,0.4)]" />

        {/* content — transparent brutalist frame, video shows through */}
        <motion.div
          className="wrap relative z-10 flex h-svh flex-col justify-center py-[calc(66px+clamp(16px,4vh,40px))]"
          style={reduced ? undefined : { opacity: panelOpacity }}
        >
          <motion.div
            className="max-w-[600px] border-[3px] border-ink p-[clamp(18px,3.5vw,36px)] shadow-brutal [text-shadow:0_1px_14px_rgba(246,242,250,0.95),0_0_3px_rgba(246,242,250,0.8)]"
            style={reduced ? undefined : { y: panelY }}
          >
            <p className="mono-label inline-block border-2 border-ink bg-card px-3 py-1.5 [text-shadow:none]">
              Independent // 360&deg; // 100% In-House
            </p>
            <h1 className="mt-4 max-w-[15ch] text-balance text-[clamp(1.9rem,5.6vw,3.6rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
              We run every growth channel{" "}
              <span className="hl-pink box-decoration-clone [text-shadow:none]">from one room</span>
            </h1>
            <p className="mt-4 max-w-[46ch] text-[clamp(0.9rem,1.4vw,1.05rem)] font-semibold leading-relaxed text-ink">
              SEO &amp; AEO, Google &amp; Meta Ads, Google Business Profile, content, social, commercial shoots, branding and
              web. One team. One strategy. One invoice.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 [text-shadow:none]">
              <a href="#contact" className={brutalButtonClass("primary")}>
                Start a project <ArrowRight />
              </a>
              <a href="#audit" className={brutalButtonClass("plain")}>
                Free growth audit
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* play button over the exposed video */}
        <a
          href="#work"
          aria-label="Watch the work"
          className="absolute bottom-[max(env(safe-area-inset-bottom),clamp(20px,6vh,64px))] right-[clamp(16px,5vw,64px)] z-20 grid size-20 place-items-center border-[3px] border-ink bg-primary text-primary-foreground shadow-brutal transition-transform duration-150 hover:scale-95 sm:size-24"
        >
          <Play className="size-7 translate-x-0.5 fill-current sm:size-9" />
        </a>
      </div>

      {/* stats band (normal flow) */}
      <div className="border-b-[3px] border-ink bg-card">
        <div className="wrap grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                "px-4 py-6 sm:px-6 " +
                (i % 2 === 1 ? "border-l-[3px] border-ink " : "") +
                (i >= 2 ? "border-t-[3px] border-ink sm:border-t-0 " : "") +
                (i % 4 !== 0 ? "sm:border-l-[3px] sm:border-ink" : "")
              }
            >
              <b className="block font-heading text-[clamp(1.8rem,4vw,3rem)] font-black leading-none">{s.value}</b>
              <span className="mt-2 block font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
