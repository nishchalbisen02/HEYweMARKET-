"use client";

import { useEffect, useRef } from "react";

/**
 * Generative hero backdrop: a slowly rotating 3-D point cloud drawn to a 2-D
 * canvas, with neighbour lines. Scroll progress speeds the rotation and blooms
 * the cloud outward, so the background reacts as you move down the page.
 *
 * Cheap (~140 points), DPR-capped, idles while the tab is hidden or the hero is
 * scrolled away, and renders a single still frame under prefers-reduced-motion.
 */

const INK = "15, 23, 42"; // --color-ink
const LILAC = "179, 162, 204"; // --color-pink
const CYAN = "8, 145, 178"; // --color-cyan
const COUNT = 140;
const LINK_DIST = 116; // px in projected space

type P = { x: number; y: number; z: number };

function makeCloud(): P[] {
  const pts: P[] = [];
  for (let i = 0; i < COUNT; i++) {
    const t = (i + 0.5) / COUNT;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 0.72 + Math.random() * 0.28;
    pts.push({
      x: Math.sin(phi) * Math.cos(theta) * r,
      y: Math.sin(phi) * Math.sin(theta) * r,
      z: Math.cos(phi) * r,
    });
  }
  return pts;
}

export function HeroField({ reduced = false }: { reduced?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cloud = makeCloud();
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    window.addEventListener("resize", resize);

    let scroll = 0;
    let ay = 0;
    let ax = -0.35;
    let raf = 0;
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(host);

    const render = (snap: boolean) => {
      const target = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      scroll += (target - scroll) * (snap ? 1 : 0.06);

      const radius = Math.min(w, h) * 0.42;
      const bloom = 1 + scroll * 0.55;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      const proj = cloud.map((p) => {
        const rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz * sinX;
        rz = p.y * sinX + rz * cosX;
        const persp = 2.6 / (2.6 - rz);
        return {
          sx: w / 2 + rx * persp * radius * bloom,
          sy: h / 2 + ry * persp * radius * bloom,
          depth: (rz + 1.4) / 2.8,
        };
      });

      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      for (let i = 0; i < proj.length; i++) {
        const a = proj[i];
        for (let j = i + 1; j < proj.length; j++) {
          const b = proj[j];
          const d = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (d > LINK_DIST) continue;
          const fade = (1 - d / LINK_DIST) * 0.25 * Math.min(a.depth, b.depth);
          if (fade < 0.01) continue;
          ctx.strokeStyle = `rgba(${INK}, ${fade})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      for (let i = 0; i < proj.length; i++) {
        const a = proj[i];
        const size = (0.9 + a.depth * 2.4) * (1 + scroll * 0.35);
        ctx.fillStyle = `rgba(${i % 7 === 0 ? CYAN : LILAC}, ${0.24 + a.depth * 0.38})`;
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!snap) {
        ay += 0.0016 + scroll * 0.0042;
        ax += 0.00018;
      }
    };

    if (reduced) {
      render(true);
      return () => {
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("resize", resize);
      };
    }

    // paint one frame straight away so the backdrop is never blank, even if rAF
    // is still suspended (e.g. loaded in a background tab)
    render(false);

    // rAF is already paused by the browser while the tab is hidden; we only need
    // to skip work when the hero itself has scrolled out of view.
    const loop = () => {
      if (visible) render(false);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block size-full" />;
}
