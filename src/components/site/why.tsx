import { ChartColumn, Compass, Handshake, ShieldCheck, Target, Users, type LucideIcon } from "lucide-react";
import { WHY } from "@/lib/site";
import { SplitHeading } from "./split-heading";

/** One icon per claim, index-aligned with WHY (the claims are abstract, so they get symbols, not photos). */
const ICONS: readonly LucideIcon[] = [Users, Target, ChartColumn, Handshake, Compass, ShieldCheck];

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
            {WHY.map((w, i) => {
              const Icon = ICONS[i];
              return (
                <div key={w.n} className={`why rv scale${DELAYS[i % 3]}`}>
                  <div className="why-ico" aria-hidden="true">
                    <Icon strokeWidth={1.8} />
                  </div>
                  <span className="num">{w.n}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
