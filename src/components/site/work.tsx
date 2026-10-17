import { WORK, WORK_CATEGORIES } from "@/lib/portfolio";
import { SplitHeading } from "./split-heading";
import { LazyVideo } from "./lazy-video";

/** Chapter 04 — the work: a masonry of looping reel previews. */
export function Work() {
  return (
    <section
      id="work"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1400px" }}
      className="dark"
    >
      <div className="wrap">
        <div className="chapter rv">
          <b>Chapter 04 — The Proof</b>
        </div>
        <div style={{ paddingTop: 70 }}>
          <SplitHeading>Work That Speaks For Itself.</SplitHeading>
          <div className="masonry" id="masonry">
            {WORK.map((w) => (
              <div className="tile" data-c={w.category} key={w.slug}>
                <LazyVideo src={`/work/${w.slug}.mp4`} poster={`/work/${w.slug}.webp`} />
                <div className="cap">
                  <b>{w.title}</b>
                  <small>{WORK_CATEGORIES[w.category]}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
