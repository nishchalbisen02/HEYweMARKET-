"use client";

import { useEffect, useState } from "react";
import { TICKER_ITEMS } from "@/lib/site";

export function Ticker() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  const row = (
    <div
      className="flex shrink-0 whitespace-nowrap py-3.5 motion-safe:animate-[ticker_32s_linear_infinite]"
      style={paused ? { animationPlayState: "paused" } : undefined}
    >
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-[52px] px-[26px] font-mono text-[14px] font-bold uppercase tracking-[0.1em] after:font-bold after:text-primary after:content-['/']"
        >
          {t}
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex items-center overflow-hidden border-b-[3px] border-ink bg-ink text-background">
      <div className="flex flex-1 overflow-hidden" aria-hidden="true">
        {row}
      </div>
      <button
        onClick={() => setPaused((v) => !v)}
        aria-label={paused ? "Resume scrolling text" : "Pause scrolling text"}
        className="shrink-0 self-stretch border-l-[3px] border-background bg-primary px-4 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-primary-foreground"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
