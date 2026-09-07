import { MapPin, Mail, Send, Briefcase } from "lucide-react";

type IconProps = { className?: string };

/* lucide v1 dropped brand logos — inline the ones we need */
function Instagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07c-1.27.06-2.15.26-2.91.56-.79.3-1.46.72-2.12 1.38A5.87 5.87 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.12-1.38 5.87 5.87 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.12A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88" />
    </svg>
  );
}
function Linkedin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function Facebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.48 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "X", href: "#", Icon: XGlyph },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Newsletter", href: "#audit", Icon: Send },
  { label: "Careers", href: "/careers", Icon: Briefcase },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden border-t border-border bg-night text-white">
      <div className="wrap pt-[clamp(56px,9vw,104px)]">
        {/* new business + contact */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[32ch]">
            <h2 className="font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] font-normal tracking-[-0.01em] text-white">
              New business inquiries
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              Let&rsquo;s build something bigger together. We&rsquo;d love to hear from you.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-[15px]">
            <span className="flex items-center gap-2.5 text-white/70">
              <MapPin className="size-[18px] shrink-0 text-[#a892d6]" />
              Bhopal, MP, India
            </span>
            <a
              href="mailto:bhopal@heywemarket.in"
              className="flex items-center gap-2.5 text-[#a892d6] underline decoration-[#a892d6]/50 underline-offset-4 transition-colors duration-150 hover:decoration-[#a892d6]"
            >
              <Mail className="size-[18px] shrink-0" />
              bhopal@heywemarket.in
            </a>
          </div>
        </div>

        <hr className="my-[clamp(36px,6vw,64px)] border-0 border-t border-white/12" />

        {/* about */}
        <div className="max-w-[64ch]">
          <p className="mono-label !text-white/40">About</p>
          <p className="mt-4 font-heading text-[clamp(1.3rem,2.2vw,1.8rem)] font-normal leading-snug text-white">
            AI-first marketplace for a smarter tomorrow.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Hey We Market is an AI-first marketplace, where people, products, and possibilities come together. We combine
            technology, creativity, and community to simplify discovery, empower businesses, and create meaningful
            experiences for a smarter, more connected tomorrow.
          </p>
        </div>

      </div>

      {/* wordmark — stretched edge to edge, full-bleed */}
      <div className="mt-[clamp(20px,4vw,52px)] px-[clamp(10px,1.8vw,24px)]">
        <svg
          viewBox="0 0 1000 246"
          className="block w-full overflow-visible"
          role="img"
          aria-label="Hey We Market"
        >
          <text
            x="0"
            y="176"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="164"
            fontWeight="700"
            className="fill-white font-heading"
          >
            Hey We Market
          </text>
        </svg>
      </div>

      <div className="wrap pb-[clamp(48px,8vw,96px)] pt-[clamp(30px,5vw,60px)]">
        {/* socials */}
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                className="flex items-center gap-2 text-[13px] font-medium text-white/60 transition-colors duration-150 hover:text-white"
              >
                <Icon className="size-4" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* bottom line */}
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.06em] text-white/40">
          <a href="#" className="transition-colors duration-150 hover:text-white/70">
            Privacy Policy
          </a>
          <span className="mx-3 text-white/25">|</span>
          &copy; 2024 &ndash; {year} Hey We Market
        </p>
      </div>
    </footer>
  );
}
