import { WHY } from "@/lib/site";
import { SplitHeading } from "./split-heading";

const DELAYS = ["", " d1", " d2"] as const;

/** Chapter 03 — why businesses choose us. */
export function Why() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="chapter rv">
          <b>Chapter 03 — Why Us</b>
        </div>
        <div style={{ paddingTop: 70 }}>
          <SplitHeading>Why Businesses Choose Hey We Market</SplitHeading>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={w.n} className={`why rv scale${DELAYS[i % 3]}`}>
                <span className="num">{w.n}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
