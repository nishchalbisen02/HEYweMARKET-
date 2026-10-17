import { HeroVideo } from "./hero-video";

/**
 * Second screen: the intro video, edge to edge, and nothing else on top of it.
 * (The headline, paragraph, buttons and chips live in the <Hero/> section above.)
 */
export function LandingVideo() {
  return (
    <section id="intro-video" className="landing-video" aria-label="Hey We Market intro video">
      <HeroVideo />
    </section>
  );
}
