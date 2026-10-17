import { SERVICE_CHIPS } from "@/lib/site";

/** Scrolling chip strip under the showreel (list rendered twice for a seamless CSS loop). */
export function ServiceStrip() {
  return (
    <div className="marquee-sec">
      <div className="marquee" id="mq">
        {[0, 1].map((copy) =>
          SERVICE_CHIPS.map((chip) => (
            <span key={`${copy}-${chip.label}`} aria-hidden={copy === 1 ? true : undefined}>
              <i className="marquee-icon" aria-hidden="true">
                {chip.icon}
              </i>
              {chip.label}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
