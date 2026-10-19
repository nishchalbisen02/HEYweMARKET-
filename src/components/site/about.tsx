import Image from "next/image";
import { COPY, FOUNDERS, SITE_NAME } from "@/lib/site";
import { SplitHeading } from "./split-heading";

/** Chapter 01 — Who we are. The opening sentence leads with the brand name in bold. */
export function About() {
  const { p1 } = COPY.about;
  const startsWithBrand = p1.startsWith(SITE_NAME);
  return (
    <section id="about">
      <div className="wrap">
        <div className="chapter rv">
          <b>Chapter 01 — Who We Are</b>
        </div>
      </div>
      <div className="wrap about-grid" style={{ paddingTop: 70 }}>
        <div>
          <SplitHeading className="left">{COPY.about.title}</SplitHeading>
          <p className="sub rv d2">
            {startsWithBrand ? (
              <>
                <b>{SITE_NAME}</b>
                {p1.slice(SITE_NAME.length)}
              </>
            ) : (
              p1
            )}
          </p>
          <p className="sub rv d3">{COPY.about.p2}</p>
          <div className="about-nofluff rv d4">
            <div>
              <span className="x">✕</span> No fluff.
            </div>
            <div>
              <span className="x">✕</span> No fake promises.
            </div>
            <div>
              <span className="x">✓</span> Just marketing that works.
            </div>
          </div>
        </div>
        <div className="about-card rv right d2 plx" data-speed="0.12">
          <h3>{COPY.about.cardTitle}</h3>
          <p>{COPY.about.cardBody}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", position: "relative" }}>
            {[
              { value: "100+", label: "Brands" },
              { value: "25M+", label: "Views" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "var(--band-fill)",
                  borderRadius: 16,
                  padding: "18px 22px",
                  flex: 1,
                  minWidth: 120,
                }}
              >
                <b className="disp" style={{ fontSize: 26 }}>
                  {s.value}
                </b>
                <br />
                <small style={{ color: "var(--on-band-3)" }}>{s.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Founder-voiced vision statement. */
export function Vision() {
  return (
    <section id="vision">
      <div className="wrap">
        <div className="chapter rv">
          <b>About Hey We Market</b>
        </div>
        <div style={{ paddingTop: 70, maxWidth: 820 }}>
          <SplitHeading>{COPY.vision.title}</SplitHeading>
          <p className="sub rv d1">{COPY.vision.p1}</p>
          <p className="sub rv d2">{COPY.vision.p2}</p>
          <h3 className="rv d3" style={{ marginTop: 34 }}>
            {COPY.vision.headedTitle}
          </h3>
          <p className="sub rv d4">{COPY.vision.p3}</p>
        </div>
      </div>
    </section>
  );
}

/** "Our Promise" — the assurance to clients. */
export function Assurance() {
  return (
    <section id="assurance">
      <div className="wrap">
        <div className="chapter rv">
          <b>Our Assurance to Clients</b>
        </div>
        <div style={{ paddingTop: 70, maxWidth: 820 }}>
          <SplitHeading>{COPY.promise.title}</SplitHeading>
          <p className="sub rv d1">{COPY.promise.body}</p>
        </div>
      </div>
    </section>
  );
}

export function Founders() {
  return (
    <section id="founders">
      <div className="wrap">
        <div className="chapter rv">
          <b>The People Behind The Work</b>
        </div>
        <div style={{ paddingTop: 70 }}>
          <SplitHeading>Meet the Founders</SplitHeading>
          <div className="why-grid" style={{ marginTop: 42 }}>
            {FOUNDERS.map((f, i) => (
              <div key={f.name} className={`why rv scale${i === 1 ? " d1" : ""}`}>
                <figure className="founder-photo">
                  <Image
                    src={f.photo}
                    alt={`${f.name}, ${f.jobTitle.split(",")[0]} of ${SITE_NAME}`}
                    width={900}
                    height={900}
                    sizes="(max-width: 620px) 92vw, 568px"
                    unoptimized
                  />
                </figure>
                <div className="founder-body">
                  <span className="founder-role">{f.role}</span>
                  <h3>{f.name}</h3>
                  <p>{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
