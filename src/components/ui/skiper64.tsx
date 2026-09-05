"use client";

// Adapted from Skiper UI — skiper64 "Gooey Effect" (free registry component).
// https://skiper-ui.com/v1/skiper64 — original imports from "framer-motion";
// this project uses the successor package, so it imports from "motion/react".

import { motion } from "motion/react";
import { useRef, type CSSProperties } from "react";

/** Drop once near the root of the tree that uses `filter: url(#SkiperGooeyFilter)`. */
export function SkiperGooeyFilterProvider() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="SkiperGooeyFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}

type Blob = { size: number; x: number; y: number; color: string };

/**
 * A cluster of draggable blobs that visually merge (gooey) when they overlap.
 * Requires <SkiperGooeyFilterProvider/> somewhere in the tree. The wrapper must
 * not have its own background colour.
 */
export function GooeyBlobs({
  blobs,
  className,
  style,
}: {
  blobs: Blob[];
  className?: string;
  style?: CSSProperties;
}) {
  const box = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={box}
      className={className}
      style={{ filter: "url(#SkiperGooeyFilter)", ...style }}
      aria-hidden="true"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          drag
          dragConstraints={box}
          dragElastic={0.15}
          dragMomentum={false}
          whileDrag={{ scale: 1.08 }}
          className="absolute rounded-full will-change-transform"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: b.color,
            cursor: "grab",
          }}
        />
      ))}
    </div>
  );
}
