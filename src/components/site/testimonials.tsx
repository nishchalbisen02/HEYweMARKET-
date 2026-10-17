import { TESTIMONIAL_PLACEHOLDERS } from "@/lib/site";
import { SplitHeading } from "./split-heading";

const DELAYS = ["", " d1", " d2"] as const;

/**
 * Chapter 06. Placeholder cards until real, approved client quotes exist — the
 * stars are decorative (aria-hidden) so assistive tech and crawlers do not read
 * them as five-star reviews, and no review schema is emitted for this section.
 */
export function Testimonials() {
  return (
    <section id="testimonials">
      <div className="wrap">
        <div className="chapter rv">
          <b>Chapter 06 — In Their Words</b>
        </div>
        <div style={{ paddingTop: 70 }}>
          <SplitHeading>What Our Clients Say</SplitHeading>
          <div className="testi">
            {TESTIMONIAL_PLACEHOLDERS.map((t, i) => (
              <div className={`tcard rv${DELAYS[i]}`} key={t.note}>
                <div className="stars" aria-hidden="true">
                  ★★★★★
                </div>
                <p>{t.text}</p>
                <small>{t.note}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
