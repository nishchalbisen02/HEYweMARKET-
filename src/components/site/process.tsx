import { PROCESS } from "@/lib/site";
import { SplitHeading } from "./split-heading";

/** Chapter 05 — five-step process timeline (fill + lit steps are driven by <Effects/>). */
export function Process() {
  return (
    <section id="process" className="dark">
      <div className="wrap">
        <div className="chapter rv">
          <b>Chapter 05 — How It Happens</b>
        </div>
        <div style={{ paddingTop: 70, textAlign: "center" }}>
          <SplitHeading>Simple Process. Powerful Results.</SplitHeading>
        </div>
        <div className="timeline" id="timeline">
          <div className="tline" id="tline" aria-hidden="true" />
          {PROCESS.map((step) => (
            <div className="tstep" key={step.n}>
              <span className="dot">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
