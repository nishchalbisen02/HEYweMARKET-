import Image from "next/image";
import Link from "next/link";
import { CAREERS_LINK, CONTACT } from "@/lib/site";

const FOOTER_SERVICES = ["Content", "Performance", "Social Media", "Branding", "Shoots", "Websites"] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap foot">
        <div className="footer-brand">
          <span className="logo">
            <Image
              src="/logo.jpg"
              alt="Hey We Market logo — digital marketing agency"
              width={442}
              height={404}
              sizes="38px"
            />
            hey we <em>market!</em>
          </span>
          <p>
            hey we market! is a creative digital marketing agency helping brands grow through strategic content,
            performance marketing, social media, branding, commercial shoots, and high-converting websites. We combine
            creativity, premium execution, and data-driven strategy to build brands that get noticed and deliver real
            business results.
          </p>
          <a className="parent-brand" href={CONTACT.parent.url} target="_blank" rel="noopener noreferrer">
            A part of {CONTACT.parent.name}
          </a>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <div className="flinks">
            {FOOTER_SERVICES.map((label) => (
              <Link key={label} href="/#services">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <span className="footer-title">Connect</span>
          <div className="fsocials">
            <a href={`${CONTACT.instagram}?igsi=Ynlzb21zenpiZ2ph`} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <Link href={CAREERS_LINK.href}>{CAREERS_LINK.label}</Link>
          </div>
        </div>
        <div>
          <span className="footer-title">Contact</span>
          <div className="footer-contact">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            <div>
              {" "}
              Address :- <address style={{ display: "inline", fontStyle: "normal" }}>{CONTACT.addressLine}</address>
            </div>{" "}
            <span>India · Working worldwide</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} Hey We Market. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
