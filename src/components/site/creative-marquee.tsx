"use client";

import Image from "next/image";
import { useState } from "react";
import { CREATIVE } from "@/lib/portfolio";

/** Design & branding strip — auto-scrolling artwork loop (list rendered twice for a seamless CSS loop). */
export function CreativeMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="creative-marquee" aria-label="Design and branding work">
      <p className="creative-marquee-label">Design &amp; branding</p>
      <div className="creative-marquee-viewport">
        <div className={`creative-marquee-track${paused ? " paused" : ""}`} id="creativeMarqueeTrack">
          {[0, 1].map((copy) =>
            CREATIVE.map((c) => (
              <article className="creative-card" key={`${copy}-${c.slug}`} aria-hidden={copy === 1 ? true : undefined}>
                <Image
                  src={`/creative/${c.slug}.webp`}
                  alt={copy === 0 ? `${c.title} — design and branding work by Hey We Market` : ""}
                  width={640}
                  height={640}
                  sizes="320px"
                  unoptimized
                />
                <div className="creative-card-caption">
                  <b>{c.title}</b>
                  <small>Design &amp; branding</small>
                </div>
              </article>
            )),
          )}
        </div>
      </div>
      <div className="creative-marquee-controls">
        <button
          className="creative-marquee-pause"
          id="creativeMarqueePause"
          type="button"
          aria-label={paused ? "Play image loop" : "Pause image loop"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "Play loop" : "Pause loop"}
        </button>
      </div>
    </section>
  );
}
