"use client";

import Image from "next/image";
import { useState } from "react";
import { CLIENTS } from "@/lib/portfolio";

/** "Trusted by" logo strip — the list is rendered twice so the CSS loop is seamless. */
export function ClientMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-label="Clients" className="client-marquee-section">
      <div className="wrap client-marquee-shell">
        <span className="client-marquee-label">Trusted&nbsp;by</span>
        <div className="client-marquee-viewport">
          <div
            className="client-marquee-track"
            id="clientMarqueeTrack"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {[0, 1].map((copy) =>
              CLIENTS.map((c) => (
                <span
                  key={`${copy}-${c.slug}`}
                  title={c.name}
                  className="client-logo"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  <Image
                    src={`/clients/${c.slug}.webp`}
                    alt={copy === 0 ? c.name : ""}
                    width={c.w}
                    height={c.h}
                    unoptimized
                  />
                </span>
              )),
            )}
          </div>
        </div>
        <button
          type="button"
          className="client-marquee-pause"
          id="clientMarqueePause"
          aria-label={paused ? "Play client logo scroll" : "Pause client logo scroll"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </section>
  );
}
