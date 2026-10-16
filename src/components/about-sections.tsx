import { Check, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CONTACT } from "@/lib/site";

/**
 * Who we are · Vision · Promise · Founders.
 * Copy is ported verbatim from the live static site (public_html/index.html) —
 * the vision is written in the founder's own voice, so keep it word-for-word.
 */

const FOUNDERS = [
  {
    name: "Ankita Singh",
    initials: "AS",
    role: "Co Founder · Strategy & Creative",
    bio: "Co founded Hey We Market to build marketing that is strategic first and creative second, helping businesses grow with clarity, consistency, and work that moves the needle.",
  },
  {
    name: "Divyansh Singh",
    initials: "DS",
    role: "Co Founder · Brand & Growth",
    bio: "Works at the intersection of marketing, brand strategy, and business growth.",
  },
];

const lead = "text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.75] text-foreground/85";

export function AboutSections() {
  return (
    <>
      {/* WHO WE ARE */}
      <section id="about" aria-label="Who we are" className="section-pad border-t border-border/60">
        <div className="wrap grid gap-[clamp(28px,5vw,64px)] lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <Reveal as="p" className="mono-label">
              Who we are
            </Reveal>
            <Reveal
              as="h2"
              delay={1}
              className="mt-5 max-w-[18ch] text-balance text-[clamp(2rem,5.6vw,4rem)] leading-[1.06]"
            >
              Not just another digital marketing agency
            </Reveal>
            <Reveal as="p" delay={2} className={`mt-6 max-w-[58ch] ${lead}`}>
              <b className="font-semibold text-foreground">Hey We Market</b> is a full service digital marketing agency in
              Bhopal, Madhya Pradesh. Most marketing feels the same after a while: the same captions, reel formats, and
              promises. We started Hey We Market because businesses deserve better than that.
            </Reveal>
            <Reveal as="p" delay={3} className={`mt-4 max-w-[58ch] ${lead}`}>
              We work as an extension of your team, not a vendor ticking off deliverables. Strategy first, execution
              second, always with a reason behind every post, every campaign, and every decision.
            </Reveal>
            <Reveal as="ul" delay={3} className="mt-8 flex flex-col gap-3 text-[1.05rem] font-medium">
              {[
                { ok: false, t: "No fluff." },
                { ok: false, t: "No fake promises." },
                { ok: true, t: "Just marketing that works." },
              ].map((r) => (
                <li key={r.t} className="flex items-center gap-3">
                  <span
                    className={
                      "grid size-7 place-items-center rounded-full " +
                      (r.ok ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
                    }
                  >
                    {r.ok ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} />}
                  </span>
                  {r.t}
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal delay={2} className="brutal-box p-[clamp(24px,3.5vw,40px)]">
            <h3 className="text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.15]">Built around what makes you different.</h3>
            <p className="mt-4 text-[1.02rem] leading-[1.7] text-foreground/85">
              Backed by {CONTACT.parent.name}, our strategists, designers, video editors, content writers, and performance
              marketers work as one accountable team.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { v: "100+", l: "Brands" },
                { v: "25M+", l: "Views" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-muted px-5 py-4">
                  <b className="block font-heading text-[1.8rem] font-semibold leading-none">{s.v}</b>
                  <span className="mt-1.5 block text-[0.9rem] text-muted-foreground">{s.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION + PROMISE */}
      <section id="vision" aria-label="Our vision and promise" className="section-pad border-t border-border/60">
        <div className="wrap grid gap-[clamp(18px,3vw,36px)] lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal className="brutal-box p-[clamp(26px,4.2vw,52px)]">
            <p className="mono-label">About Hey We Market</p>
            <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.08]">Our vision</h2>
            <p className={`mt-6 max-w-[60ch] ${lead}`}>
              I did not start Hey We Market to run another agency. I started it because I kept seeing good businesses get
              reduced to a templated post or a generic package that could have belonged to anyone.
            </p>
            <p className={`mt-4 max-w-[60ch] ${lead}`}>
              A business is not a category. It is years of someone&rsquo;s effort, risk, and belief, and it deserves
              marketing that actually understands that. We built Hey We Market around a simple idea: get close enough to a
              business to genuinely understand it, then build everything around what makes it different.
            </p>
            <h3 className="mt-9 text-[clamp(1.25rem,2.3vw,1.7rem)]">Where we are headed</h3>
            <p className={`mt-3 max-w-[60ch] ${lead}`}>
              We are growing on purpose. We are going deeper, building real systems, staying ahead of where attention is
              moving across search and AI tools, and growing our team with intent.
            </p>
          </Reveal>

          <Reveal
            delay={1}
            className="brutal-box flex flex-col bg-primary p-[clamp(26px,4vw,44px)] text-primary-foreground"
          >
            <p className="mono-label !text-primary-foreground/75">Our assurance to clients</p>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.8rem)] leading-[1.08]">Our promise</h2>
            <p className="mt-6 text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.75] text-primary-foreground/92">
              Working with us should feel different from working with an agency. We think before we act, tell you the
              truth when something is not working, protect your voice and story, and say no when we cannot genuinely do
              the work justice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="founders" aria-label="Meet the founders" className="section-pad border-t border-border/60">
        <div className="wrap">
          <Reveal as="p" className="mono-label">
            The people behind the work
          </Reveal>
          <Reveal
            as="h2"
            delay={1}
            className="mt-5 max-w-[18ch] text-balance text-[clamp(2rem,5.6vw,4rem)] leading-[1.06]"
          >
            Meet the founders
          </Reveal>
          <div className="mt-[clamp(32px,5vw,56px)] grid gap-[clamp(16px,2.5vw,28px)] md:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal
                key={f.name}
                delay={(i + 1) as 1 | 2}
                className="brutal-box flex items-start gap-5 p-[clamp(22px,3vw,36px)]"
              >
                <span
                  aria-hidden
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-primary font-heading text-[1.1rem] font-semibold text-primary-foreground"
                >
                  {f.initials}
                </span>
                <div>
                  <span className="mono-label">{f.role}</span>
                  <h3 className="mt-2 text-[clamp(1.4rem,2.4vw,1.8rem)]">{f.name}</h3>
                  <p className="mt-3 text-[1.02rem] leading-[1.7] text-foreground/85">{f.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
