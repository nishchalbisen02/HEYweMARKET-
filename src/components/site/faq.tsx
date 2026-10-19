import { FAQS } from "@/lib/site";
import { SplitHeading } from "./split-heading";

const DELAYS = ["", " d1", " d2"] as const;

/**
 * FAQ (answer-engine friendly). Every Q&A rendered here is the same `FAQS`
 * array that feeds the FAQPage JSON-LD, so the schema always matches the page.
 */
export function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="chapter rv">
          <b>Good To Know</b>
        </div>
        <div style={{ paddingTop: 70, textAlign: "center" }}>
          <SplitHeading>Frequently Asked Questions</SplitHeading>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details className={`faq-item rv${DELAYS[i % 3]}`} key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
