const GROUPS = [
  { title: "Get Found", links: ["SEO & AEO", "Google Business Profile"] },
  { title: "Get Leads", links: ["Google Ads", "Meta Ads", "Analytics & CRO"] },
  { title: "Get Noticed", links: ["Content & Production", "Social Media", "Commercial Shoots"] },
  { title: "Get Built", links: ["Branding & Design", "Web Development"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink py-[clamp(48px,7vw,80px)] text-background">
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-7 border-b-2 border-background/20 pb-8">
          <a href="#hero" className="inline-flex items-center gap-2 font-heading text-[19px] font-black uppercase tracking-[-0.02em] text-background">
            <span className="grid size-[26px] place-items-center border-2 border-background bg-primary text-[14px] leading-none text-primary-foreground">
              H
            </span>
            Hey We Market
          </a>
          <div className="flex flex-wrap gap-9">
            {GROUPS.map((g) => (
              <div key={g.title} className="flex flex-col gap-2.5">
                <b className="mb-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-primary">{g.title}</b>
                {g.links.map((l) => (
                  <a key={l} href="#services" className="text-[13px] text-background/70 transition-colors duration-150 hover:text-background">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-7 flex flex-wrap justify-between gap-3.5 font-mono text-[10.5px] uppercase tracking-[0.04em] text-background/50">
          <span>&copy; {new Date().getFullYear()} Hey We Market. All rights reserved.</span>
          <span>Independent 360&deg; digital marketing agency // India</span>
        </div>
      </div>
    </footer>
  );
}
