"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Behaviour layer for the site: everything the static build did with a global
 * <script>, ported to React effects with proper cleanup (so it is safe under
 * React Strict Mode and across client-side route changes).
 *
 *  - intro curtain, cursor glow, magnetic buttons (mounted once)
 *  - scroll-reveal, count-up stats, parallax, services progress bar,
 *    process-timeline fill, scroll progress bar (re-run on every route change,
 *    because each route brings its own DOM)
 *
 * It renders nothing. Sections are server components; this only toggles
 * classes and inline styles on their DOM, so there is no hydration conflict.
 */

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Effects() {
  const pathname = usePathname();

  /* ---------- once: curtain, glow, magnetic buttons ---------- */
  useEffect(() => {
    const loader = document.getElementById("loader");
    const hide = () => loader?.classList.add("done");
    let hideTimer: number | undefined;
    const arm = () => {
      hideTimer = window.setTimeout(hide, reducedMotion() ? 0 : 1100);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    const failSafe = window.setTimeout(hide, 2800);

    const glow = document.getElementById("glow");
    const onGlow = (e: MouseEvent) => {
      if (!glow) return;
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onGlow, { passive: true });

    /* Magnetic buttons — delegated, so buttons that appear after a client-side
       navigation work without re-binding. */
    let active: HTMLElement | null = null;
    const reset = () => {
      if (active) active.style.transform = "";
      active = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>(".magnetic") : null;
      if (active && active !== target) reset();
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      active = target;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);

    /* Theme: until the visitor has picked one with the header toggle, follow the system setting live. */
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("hwm-theme")) return;
      } catch {
        /* storage unavailable — keep following the system */
      }
      document.documentElement.dataset.theme = e.matches ? "dark" : "light";
    };
    scheme.addEventListener("change", onScheme);

    return () => {
      window.removeEventListener("load", arm);
      window.clearTimeout(hideTimer);
      window.clearTimeout(failSafe);
      window.removeEventListener("mousemove", onGlow);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", reset);
      scheme.removeEventListener("change", onScheme);
      reset();
    };
  }, []);

  /* ---------- per route: reveal, counters, scroll engine ---------- */
  useEffect(() => {
    const reduced = reducedMotion();

    /* Scroll reveal */
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          reveal.unobserve(entry.target);
        }),
      { threshold: 0.01, rootMargin: "0px 0px 300px 0px" },
    );
    document.querySelectorAll(".rv:not(.in), .wsplit:not(.in)").forEach((el) => reveal.observe(el));

    /* Count-up stats: the HTML ships the real numbers; we rewind to 0 and
       count up when each one scrolls into view. */
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const counters = document.querySelectorAll<HTMLElement>(".count");
    const counting = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          counting.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          const target = Number(el.dataset.t);
          const suffix = el.dataset.s ?? "";
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 900, 1);
            el.textContent = Math.round(easeOut(p) * target) + suffix;
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }),
      { threshold: 0.2, rootMargin: "0px 0px 220px 0px" },
    );
    if (!reduced) {
      counters.forEach((el) => {
        el.textContent = "0" + (el.dataset.s ?? "");
        counting.observe(el);
      });
    }

    /* Scroll engine: progress bar, parallax layers, services bar, timeline */
    const progress = document.getElementById("progress");
    const plx = Array.from(document.querySelectorAll<HTMLElement>(".plx"));
    const hOuter = document.getElementById("hOuter");
    const hBar = document.getElementById("hBar");
    const timeline = document.getElementById("timeline");
    const tline = document.getElementById("tline");
    const tsteps = Array.from(document.querySelectorAll<HTMLElement>(".tstep"));
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.body.scrollHeight - vh;
      if (progress && max > 0) progress.style.width = (y / max) * 100 + "%";

      if (!reduced) {
        plx.forEach((el) => {
          const r = el.getBoundingClientRect();
          const c = r.top + r.height / 2 - vh / 2;
          el.style.transform = `translateY(${c * Number(el.dataset.speed) * -1}px)`;
        });
        if (hOuter && hBar) {
          const r = hOuter.getBoundingClientRect();
          const p = Math.min(Math.max((vh - r.top) / (r.height + vh), 0), 1);
          hBar.style.width = p * 100 + "%";
        }
        if (timeline && tline) {
          const r = timeline.getBoundingClientRect();
          const p = Math.min(Math.max((vh * 0.65 - r.top) / r.height, 0), 1);
          tline.style.height = p * 100 + "%";
          tsteps.forEach((s) => s.classList.toggle("lit", s.getBoundingClientRect().top < vh * 0.65));
        }
      }
      ticking = false;
    };
    const schedule = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    onScroll();

    return () => {
      reveal.disconnect();
      counting.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return null;
}
