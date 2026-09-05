"use client";

import { useState } from "react";
import { cn } from "cn";
import { WORK_FILTERS, WORK_TILES } from "@/lib/site";

const FILLS = ["#ec4899", "#0891b2", "#0f172a", "#f472b6", "#831843", "#0891b2"];

function TilePoster({ fill, i }: { fill: string; i: number }) {
  const j = i % 3;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <rect width="400" height="300" fill={fill} />
      <rect x="-40" y={60 + j * 40} width="480" height="34" fill="#fdf2f8" opacity="0.14" />
      <rect x={40 + j * 90} y="-40" width="34" height="380" fill="#fdf2f8" opacity="0.14" />
      <rect x="24" y="24" width="60" height="60" fill="none" stroke="#fdf2f8" strokeWidth="4" opacity="0.5" />
    </svg>
  );
}

export function WorkGrid() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <>
      <div className="my-[clamp(32px,5vw,56px)] flex flex-wrap gap-2" role="group" aria-label="Filter work by category" data-reveal="">
        {WORK_FILTERS.map((wf) => (
          <button
            key={wf.f}
            onClick={() => setFilter(wf.f)}
            className={cn(
              "min-h-9 border-2 border-ink bg-card px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.05em] transition-colors duration-150 hover:bg-ink hover:text-background",
              filter === wf.f && "bg-ink text-background"
            )}
          >
            {wf.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="">
        {WORK_TILES.filter((t) => filter === "all" || t.cat === filter).map((t, i) => (
          <div key={t.title} className="group relative aspect-[4/3] overflow-hidden border-[3px] border-ink shadow-brutal-sm">
            <TilePoster fill={FILLS[i % FILLS.length]} i={i} />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 border-t-2 border-background bg-ink px-3.5 py-3 text-background">
              <b className="font-heading text-[13px] font-extrabold uppercase leading-[1.1]">{t.title}</b>
              <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-primary">{t.label}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
