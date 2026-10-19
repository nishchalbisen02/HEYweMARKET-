import { Fragment } from "react";
import { SHOWREEL_COPY } from "@/lib/site";
import { HeroVideo } from "./hero-video";

/**
 * Showreel: a line about what we do, then the agency film — one crisp still with a "Watch our film" button;
 * the 1080p file is only downloaded when it is pressed and then plays with sound (see HeroVideo / HERO_VIDEO).
 */
export function Showreel() {
  return (
    <section id="showreel" className="showreel-section" aria-label="Showreel">
      <div className="wrap">
        <p className="showreel-label">Showreel</p>
        <h2 className="showreel-title">
          {SHOWREEL_COPY.lines.map((line) => (
            <Fragment key={line}>
              <span>{line}</span>{" "}
            </Fragment>
          ))}
        </h2>
        <p className="showreel-sub">{SHOWREEL_COPY.sub}</p>
        <div className="showreel-video-wrap">
          <HeroVideo />
        </div>
        <p className="showreel-meta">Hey We Market agency film &nbsp;//&nbsp; sound on for the full cut</p>
      </div>
    </section>
  );
}
