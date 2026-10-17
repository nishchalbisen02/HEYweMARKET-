import { STATS } from "@/lib/site";

const DELAYS = ["", " d1", " d2", " d3"] as const;

/** Headline numbers. The HTML carries the real values; <Effects/> counts them up on view. */
export function Stats() {
  return (
    <section id="stats" className="dark">
      <div className="wrap">
        <div className="stats">
          {STATS.map((s, i) => (
            <div className={`stat rv scale${DELAYS[i]}`} key={s.label}>
              <b className="count" data-t={s.target} data-s={s.suffix}>
                {s.target}
                {s.suffix}
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
