"use client";

import { useEffect, useState } from "react";
import type { Client } from "@/lib/clients";

export function ClientMarquee({ clients }: { clients: Client[] }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  if (!clients.length) return null;

  const run = [...clients, ...clients];

  return (
    <section
      aria-label="Clients"
      className="overflow-hidden border-b-[3px] border-ink bg-card"
    >
      <div className="wrap flex items-center gap-4 py-3">
        <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          Trusted&nbsp;by
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex w-max items-center gap-4 py-2.5 motion-safe:animate-[marquee_38s_linear_infinite]"
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
            {run.map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="flex h-[72px] w-[150px] shrink-0 items-center justify-center overflow-hidden border-2 border-ink bg-white px-2.5 py-1.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setPaused((v) => !v)}
          aria-label={paused ? "Resume" : "Pause"}
          className="shrink-0 border-2 border-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.06em] transition-colors duration-150 hover:bg-ink hover:text-background"
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </section>
  );
}
