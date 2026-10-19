"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO } from "@/lib/portfolio";
import { announceSound, onOtherSound } from "@/lib/sound";

/**
 * The intro video + its controls.
 *
 * Two modes, picked by `HERO_VIDEO.autoplay`:
 * - false (default): the screen shows one crisp still (the poster) with a "Watch our film" button. Nothing is
 *   downloaded until it is pressed, then the video plays from that click — so it can start WITH sound.
 * - true: the video autoplays muted and looped while it is on screen ("Reduce motion" / data-saver visitors still
 *   get the poster and press play themselves).
 *
 * Sound is always opt-in (a click). It is silenced when the showreel unmutes, the tab is hidden, or this
 * section unmounts. Once started, the video pauses when scrolled off screen and resumes when it comes back.
 */
export function HeroVideo() {
  const auto = HERO_VIDEO.autoplay;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPaused = useRef(false);
  const startedRef = useRef(auto);
  const [started, setStarted] = useState(auto);
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const hasSound = Boolean(HERO_VIDEO.audioSrc) || HERO_VIDEO.videoHasSound;

  /* play while visible (autoplay mode: from the start; click mode: once the visitor has pressed play) */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (auto) {
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || saveData) {
        userPaused.current = true;
        return;
      }
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (startedRef.current && !userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [auto]);

  /* keep the sound state honest */
  useEffect(() => {
    const audio = audioRef.current;
    const silence = () => {
      audio?.pause();
      if (videoRef.current) videoRef.current.muted = true;
      setSoundOn(false);
    };
    const offOther = onOtherSound("hero", silence);
    const onHidden = () => {
      if (document.hidden) silence();
    };
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      offOther();
      document.removeEventListener("visibilitychange", onHidden);
      audio?.pause();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  /* turns the soundtrack on (needs a click); when the video itself carries the sound this also starts it */
  const enableSound = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    announceSound("hero");
    try {
      if (HERO_VIDEO.audioSrc && audio) {
        audio.volume = 0.6;
        await audio.play();
      } else if (video) {
        video.muted = false;
        if (video.paused) await video.play();
      }
      setSoundOn(true);
    } catch {
      if (video) video.muted = true;
      setSoundOn(false);
    }
  };

  const toggleSound = async () => {
    if (!soundOn) return enableSound();
    audioRef.current?.pause();
    if (videoRef.current) videoRef.current.muted = true;
    setSoundOn(false);
  };

  /* the "Watch our film" button: start from this click, with sound if the film has any */
  const start = async () => {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = false;
    startedRef.current = true;
    setStarted(true);
    if (hasSound) await enableSound();
    if (video.paused) video.play().catch(() => {});
  };

  return (
    <>
      <div className="hero-video" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video__media"
          muted
          loop
          playsInline
          preload={auto ? "metadata" : "none"}
          poster={HERO_VIDEO.poster}
          width={HERO_VIDEO.width}
          height={HERO_VIDEO.height}
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={HERO_VIDEO.src} type="video/mp4" />
        </video>
      </div>
      {HERO_VIDEO.audioSrc && <audio ref={audioRef} src={HERO_VIDEO.audioSrc} loop preload="none" />}
      {!started && (
        <button type="button" className="hero-play" onClick={start}>
          <span className="hero-play__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="hero-play__text">
            <b>Watch our film</b>
            <small>{hasSound ? "Plays with sound" : "Press play"}</small>
          </span>
        </button>
      )}
      {started && (
        <div className="hero-controls">
          <button
            type="button"
            className="hero-btn hero-btn--icon"
            aria-label={playing ? "Pause video" : "Play video"}
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
          {hasSound && (
            <button
              type="button"
              className="hero-btn hero-btn--music"
              aria-pressed={soundOn}
              onClick={toggleSound}
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
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                {soundOn ? (
                  <>
                    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M19.5 5.5a8.5 8.5 0 0 1 0 13" />
                  </>
                ) : (
                  <>
                    <path d="m16 9 5 6" />
                    <path d="m21 9-5 6" />
                  </>
                )}
              </svg>
              <span>Music</span>
              <span className="hero-btn__state" aria-hidden="true">
                {soundOn ? "On" : "Off"}
              </span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
