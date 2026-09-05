"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { STATS } from "@/lib/site";
import { brutalButtonClass } from "@/components/brutal-button";

function Poster() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <rect width="1600" height="900" fill="#0f172a" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 200} y1="0" x2={i * 200} y2="900" stroke="#fdf2f8" strokeOpacity="0.06" strokeWidth="2" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 225} x2="1600" y2={i * 225} stroke="#fdf2f8" strokeOpacity="0.06" strokeWidth="2" />
      ))}
      <rect x="1000" y="120" width="520" height="300" fill="#ec4899" fillOpacity="0.9" />
      <rect x="1030" y="150" width="520" height="300" fill="none" stroke="#fdf2f8" strokeWidth="6" strokeOpacity="0.7" />
      <rect x="120" y="520" width="460" height="300" fill="#0891b2" fillOpacity="0.9" />
      <rect x="90" y="490" width="460" height="300" fill="none" stroke="#fdf2f8" strokeWidth="6" strokeOpacity="0.7" />
      <circle cx="1330" cy="640" r="110" fill="none" stroke="#ec4899" strokeWidth="10" strokeOpacity="0.8" />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        fontFamily="Archivo, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="190"
        letterSpacing="-8"
        fill="none"
        stroke="#fdf2f8"
        strokeWidth="3"
        opacity="0.12"
      >
        HEY WE MARKET
      </text>
    </svg>
  );
}

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
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
  const posterY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const topY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0.55, 0.95], [1, 0]);

  return (
    <section ref={ref} id="hero" aria-label="Introduction" className={reduced ? "relative" : "relative h-[180svh]"}>
      <div
        className={
          "overflow-hidden border-b-[3px] border-ink " +
          (reduced ? "relative" : "sticky top-0 h-svh")
        }
      >
        {/* full-bleed base so text is never on a light gap */}
        <div className="absolute inset-0 bg-night" />
        {/* poster (masked + scaled on scroll) */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale, clipPath: clip, y: posterY, willChange: "transform" }}
        >
          <Poster />
        </motion.div>
        {/* scrim */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.45)_42%,rgba(15,23,42,0.9)_100%)]" />

        {/* content */}
        <motion.div
          className="wrap relative z-10 flex h-svh flex-col justify-between gap-6 py-[calc(66px+clamp(20px,4vh,48px))] pb-[clamp(20px,4vh,48px)]"
          style={reduced ? undefined : { opacity: contentOpacity }}
        >
          <motion.div style={reduced ? undefined : { y: topY }}>
            <p className="mono-label inline-block border-2 border-night-fg/50 px-3 py-1.5 text-night-fg">
              Independent // 360&deg; // 100% In-House
            </p>
            <h1 className="mt-5 max-w-[16ch] text-balance text-[clamp(2rem,6.6vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-night-fg [text-shadow:0_2px_24px_rgba(15,23,42,0.7)]">
              We run every growth channel{" "}
              <span className="hl-pink box-decoration-clone">from one room</span>
            </h1>
          </motion.div>

          <motion.div className="flex flex-wrap items-end justify-between gap-6" style={reduced ? undefined : { y: bottomY }}>
            <p className="max-w-[44ch] text-[clamp(0.95rem,1.5vw,1.15rem)] font-medium leading-relaxed text-night-fg/85">
              SEO &amp; AEO, Google &amp; Meta Ads, Google Business Profile, content, social, commercial shoots, branding and
              web. One team. One strategy. One invoice.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className={brutalButtonClass("primary")}>
                Start a project <ArrowRight />
              </a>
              <a
                href="#audit"
                className={brutalButtonClass(
                  "plain",
                  "border-night-fg bg-transparent text-night-fg shadow-[6px_6px_0_#ec4899] hover:shadow-[4px_4px_0_#ec4899]"
                )}
              >
                Free growth audit
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* play button */}
        <a
          href="#work"
          aria-label="Watch the work"
          className="absolute left-1/2 top-1/2 z-20 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center border-[3px] border-night-fg bg-primary text-primary-foreground shadow-brutal-pink transition-transform duration-150 hover:scale-95 sm:size-24"
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
