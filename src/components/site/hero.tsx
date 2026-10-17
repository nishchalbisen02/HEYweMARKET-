import { COPY } from "@/lib/site";

/**
 * Intro section — the original hero (headline, paragraph, buttons, floating chips),
 * now the second "page" of the site, right below the full-screen intro video.
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
        <h1 className="rv d1">{COPY.heroTitle}</h1>
        <p className="hero-sub rv d2">{COPY.heroSub}</p>
        <div className="hero-ctas rv d3">
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
