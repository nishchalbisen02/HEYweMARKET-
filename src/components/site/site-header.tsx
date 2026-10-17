"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CAREERS_LINK, NAV } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

/** Floating pill navigation + slide-down mobile menu. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header>
        <nav id="nav" aria-label="Main navigation">
          <Link href="/#top" className="logo" onClick={close}>
            <Image
              src="/logo.jpg"
              alt="Hey We Market logo — digital marketing agency"
              width={442}
              height={404}
              priority
              sizes="38px"
            />
            hey we <em>market!</em>
          </Link>
          <div className="nav-links">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href={CAREERS_LINK.href}>{CAREERS_LINK.label}</Link>
          </div>
          <div className="nav-tools">
            <ThemeToggle />
            <Link href="/#contact" className="nav-cta magnetic">
              Book a Call
            </Link>
            <button
              id="burger"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobileMenu"
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <div id="mobileMenu" role="dialog" aria-label="Menu" className={open ? "open" : undefined}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={close}>
            {item.label}
          </Link>
        ))}
        <Link href={CAREERS_LINK.href} onClick={close}>
          {CAREERS_LINK.label}
        </Link>
        <ThemeToggle variant="row" />
        <Link href="/#contact" className="btn btn-primary" onClick={close}>
          <span>Book a Call</span>
        </Link>
      </div>
    </>
  );
}
