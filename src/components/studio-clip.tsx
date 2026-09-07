"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient "in the studio" clip (formerly the hero video). Loops muted, plays
 * only while on screen, falls back to the poster under reduced motion.
 */
export function StudioClip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    const el = wrapRef.current;
    if (!v || !el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section id="studio" aria-label="In the studio" className="section-pad border-t border-border">
      <div className="wrap">
        <p className="mono-label" data-reveal="">
          In the studio
        </p>
        <h2
          className="mb-[clamp(20px,3vw,36px)] mt-4 max-w-[20ch] text-balance text-[clamp(1.7rem,5vw,3rem)] "
          data-reveal=""
          data-delay="1"
        >
          Made by hand, tested by data
        </h2>

        <div
          ref={wrapRef}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-border shadow-soft-lg"
          data-reveal=""
          data-delay="2"
        >
          {reduced ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="/hero-poster.jpg" alt="Behind the scenes at Hey We Market" className="size-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              className="size-full object-cover"
              poster="/hero-poster.jpg"
              muted
              loop
              playsInline
              preload="none"
            >
              <source src="/hero.webm" type="video/webm" />
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </section>
  );
}
