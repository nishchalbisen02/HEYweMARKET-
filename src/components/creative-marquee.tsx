"use client";

import { useEffect, useState } from "react";
import type { CreativeItem } from "@/lib/creative";

export function CreativeMarquee({ items }: { items: CreativeItem[] }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  if (!items.length) return null;

  const run = [...items, ...items];

  return (
    <div>
      <div className="group overflow-hidden">
        <ul
          className="flex w-max items-stretch gap-5 pl-[clamp(16px,5vw,64px)] motion-safe:animate-[marquee_72s_linear_infinite] group-hover:[animation-play-state:paused] sm:gap-7"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {run.map((it, i) => (
            <li
              key={i}
              className="relative h-[clamp(220px,42vw,430px)] shrink-0 overflow-hidden border-[3px] border-ink bg-card shadow-brutal"
              style={{ aspectRatio: it.ratio }}
              aria-hidden={i >= items.length ? true : undefined}
            >
              <picture>
                <source srcSet={it.webp} type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.jpg}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t-[3px] border-ink bg-ink px-3 py-2 text-background">
                <span className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.08em]">
                  {it.title}
                </span>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.08em] text-primary">
                  {it.category}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap mt-5">
        <button
          onClick={() => setPaused((v) => !v)}
          aria-label={paused ? "Resume loop" : "Pause loop"}
          className="border-2 border-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.06em] transition-colors duration-150 hover:bg-ink hover:text-background"
        >
          {paused ? "Play loop" : "Pause loop"}
        </button>
      </div>
    </div>
  );
}
