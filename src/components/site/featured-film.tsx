"use client";

import { useEffect, useRef, useState } from "react";
import { SHOWREEL } from "@/lib/portfolio";
import { announceSound, onOtherSound } from "@/lib/sound";

/**
 * The DB-pride Ganpati film, featured at the top of the "Work That Speaks For Itself" grid.
 * Looping and muted; it only downloads and plays while it is on screen (the file is ~7 MB) and respects
 * "reduce motion" by staying on the poster frame until the visitor presses play.
 */
export function FeaturedFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  // if the agency film (or anything else) starts sound, this one goes quiet
  useEffect(
    () =>
      onOtherSound("showreel", () => {
        if (ref.current) ref.current.muted = true;
        setMuted(true);
      }),
    [],
  );

  const togglePlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted) announceSound("showreel");
    setMuted(video.muted);
  };

  return (
    <figure className="featured-film rv" id="featured-film">
      <div className="showreel-video-wrap">
        <video
          ref={ref}
          id="showreelVideo"
          className="showreel-video"
          muted
          loop
          playsInline
          preload="none"
          poster={SHOWREEL.poster}
          width={SHOWREEL.width}
          height={SHOWREEL.height}
          aria-label={`Hey We Market film — ${SHOWREEL.title}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={SHOWREEL.src} type="video/mp4" />
        </video>
        <div className="showreel-controls">
          <button
            type="button"
            className="showreel-btn showreel-btn--pause"
            aria-label={playing ? "Pause film" : "Play film"}
            onClick={togglePlay}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="showreel-btn showreel-btn--mute"
            aria-label={muted ? "Unmute film" : "Mute film"}
            onClick={toggleMute}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {muted ? (
                <>
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                  <path d="m16 9 5 6" />
                  <path d="m21 9-5 6" />
                </>
              ) : (
                <>
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                  <path d="M16.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M19.5 5.5a8.5 8.5 0 0 1 0 13" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <figcaption className="featured-film__cap">
        <small>Featured film</small>
        <b>{SHOWREEL.title}</b>
        <span>Content Creation</span>
      </figcaption>
    </figure>
  );
}
