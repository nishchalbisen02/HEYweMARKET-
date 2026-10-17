"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping preview, loaded in two stages so a page with fourteen of them
 * stays light:
 *  - the poster frame is fetched when the tile is within ~a screen of the viewport;
 *  - the clip itself loads and plays only while the tile is on screen, and pauses
 *    when it scrolls away (so at most the visible handful decode at once).
 * With "reduce motion" on, the poster frame is shown and the clip never plays.
 */
export function LazyVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.poster = poster;
        near.disconnect();
      },
      { rootMargin: "900px 0px" },
    );
    near.observe(video);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => near.disconnect();
    }

    const live = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "120px 0px", threshold: 0.01 },
    );
    live.observe(video);

    return () => {
      near.disconnect();
      live.disconnect();
    };
  }, [poster]);

  return (
    <video
      ref={ref}
      className="art"
      muted
      loop
      playsInline
      preload="none"
      src={src}
      width={480}
      height={540}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
