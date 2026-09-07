"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function Showreel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // autoplay / pause as it enters and leaves the viewport
  useEffect(() => {
    const v = videoRef.current;
    const el = wrapRef.current;
    if (!v || !el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section
      id="showreel"
      aria-label="Showreel"
      className="border-b border-border bg-[color-mix(in_srgb,var(--color-night)_84%,transparent)] py-[clamp(44px,7vw,88px)] text-night-fg backdrop-blur-md"
    >
      <div className="wrap">
        <p className="mono-label !text-night-fg/55">Showreel</p>
        <h2 className="mb-[clamp(20px,3vw,32px)] mt-3 max-w-[18ch] text-balance text-[clamp(1.7rem,5vw,3.2rem)] ">
          Watch the work
        </h2>

        <div
          ref={wrapRef}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/12 shadow-soft-lg"
        >
          {reduced ? (
            <video
              ref={videoRef}
              className="size-full object-cover"
              src="/showreel.mp4"
              poster="/showreel-poster.jpg"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                className="size-full object-cover"
                poster="/showreel-poster.jpg"
                muted
                loop
                playsInline
                preload="none"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
              >
                <source src="/showreel.mp4" type="video/mp4" />
              </video>

              <div className="absolute bottom-3 right-3 flex gap-2 sm:bottom-4 sm:right-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause showreel" : "Play showreel"}
                  className="grid size-11 place-items-center rounded-lg border border-white/20 bg-background text-foreground shadow-brutal-sm transition-transform duration-150 hover:scale-95 sm:size-12"
                >
                  {playing ? (
                    <Pause className="size-4 fill-current sm:size-5" />
                  ) : (
                    <Play className="size-4 translate-x-px fill-current sm:size-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute showreel" : "Mute showreel"}
                  aria-pressed={!muted}
                  className="grid size-11 place-items-center rounded-lg border border-white/20 bg-primary text-primary-foreground shadow-brutal-sm transition-transform duration-150 hover:scale-95 sm:size-12"
                >
                  {muted ? (
                    <VolumeX className="size-4 sm:size-5" />
                  ) : (
                    <Volume2 className="size-4 sm:size-5" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-night-fg/45">
          DB-pride &mdash; Ganpati film &nbsp;//&nbsp; sound on for the full cut
        </p>
      </div>
    </section>
  );
}
