import { preload } from "react-dom";
import { HERO_VIDEO } from "@/lib/portfolio";
import { HeroVideo } from "./hero-video";

/**
 * First screen of the site: the intro video, and nothing else on top of it.
 * (The headline, paragraph, buttons and chips live in the <Hero/> section below.)
 */
export function LandingVideo() {
  // The poster frame is what paints first (and what reduced-motion / data-saver visitors keep).
  preload(HERO_VIDEO.poster, { as: "image", fetchPriority: "high" });
  return (
    <section id="top" className="landing-video" aria-label="Hey We Market intro video">
      <HeroVideo />
    </section>
  );
}
