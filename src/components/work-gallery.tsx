"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkMedia } from "@/lib/work-media";

function MediaTile({ item, idx }: { item: WorkMedia; idx: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const v = video.current;
    if (!el || !v || reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const showVideo = item.kind === "video" && !reduced;

  return (
    <div ref={wrap} className="group relative aspect-[3/4] overflow-hidden border-[3px] border-ink shadow-brutal">
      {showVideo ? (
        <video
          ref={video}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          muted
          loop
          playsInline
          preload="none"
          poster={item.poster}
        >
          {item.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 border-t-2 border-background bg-ink px-3.5 py-3 text-background">
        <b className="font-heading text-[13px] font-extrabold uppercase leading-[1.1]">{item.title}</b>
        <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-primary">
          {String(idx + 1).padStart(2, "0")} / {item.tag}
        </span>
      </div>
    </div>
  );
}

export function WorkGallery({ items }: { items: WorkMedia[] }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4" data-reveal="">
      {items.map((it, i) => (
        <MediaTile key={it.key} item={it} idx={i} />
      ))}
    </div>
  );
}
