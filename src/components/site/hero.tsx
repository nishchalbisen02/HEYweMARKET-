import { COPY } from "@/lib/site";

/**
 * First screen: the hero (headline, paragraph, buttons, floating chips). The `rv` blocks ship already
 * revealed (`in`) so the headline is visible from the first paint, independent of JavaScript.
 * The full-screen intro video is the second screen, right below.
 */
export function Hero() {
  return (
    <section id="hero" aria-label="Introduction">
      <div className="hero-bg plx" data-speed="-0.15" aria-hidden="true">
        <div className="hero-grid-bg" />
        <div className="blob b1" />
        <div className="blob b2" />
      </div>
      <div className="float-chip plx" data-speed="0.3" style={{ top: "24%", left: "8%" }} aria-hidden="true">
        🎬 Cinematic Ad Shoots
      </div>
      <div
        className="float-chip plx"
        data-speed="0.45"
        style={{ top: "30%", right: "7%", animationDelay: "-3s" }}
        aria-hidden="true"
      >
        🚀 25M+ Views Created
      </div>
      <div
        className="float-chip plx"
        data-speed="0.25"
        style={{ bottom: "22%", left: "12%", animationDelay: "-5s" }}
        aria-hidden="true"
      >
        📈 Performance Marketing
      </div>
      <div
        className="float-chip plx"
        data-speed="0.5"
        style={{ bottom: "26%", right: "11%", animationDelay: "-7s" }}
        aria-hidden="true"
      >
        ✦ 100+ Brands
      </div>
      <div className="wrap hero-inner" id="heroInner">
        <h1 className="rv in d1">{COPY.heroTitle}</h1>
        <p className="hero-sub rv in d2">{COPY.heroSub}</p>
        <div className="hero-ctas rv in d3">
          <a href="#contact" className="btn btn-primary magnetic">
            <span>Let&apos;s Talk</span>
          </a>
          <a href="#services" className="btn btn-ghost magnetic">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}
