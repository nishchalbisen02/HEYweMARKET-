"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "cn";
import { NAV } from "@/lib/site";
import { brutalButtonClass } from "@/components/brutal-button";
import { SiteLogo } from "@/components/site-logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] border-b border-border bg-background/80 backdrop-blur-md transition-shadow duration-200",
          scrolled && "shadow-soft"
        )}
      >
        <div className="wrap flex h-[66px] items-center justify-between gap-4">
          <SiteLogo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={cn(
                  "text-[14px] font-medium text-foreground/70 transition-colors duration-150 hover:text-primary",
                  active === n.href.slice(1) && "text-primary"
                )}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className={brutalButtonClass("primary", "min-h-0 rounded-full px-4 py-2 text-[13px]")}
            >
              Start a project <ArrowRight className="size-3.5" />
            </a>
          </nav>
          <button
            className="grid size-11 place-items-center rounded-lg border border-input bg-card lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[66px] z-[110] flex flex-col overflow-y-auto border-t border-border bg-background p-[clamp(20px,7vw,56px)] transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "invisible translate-x-full"
        )}
      >
        {NAV.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={cn(
              "border-b border-border py-5 font-heading text-[clamp(1.6rem,7vw,2.4rem)] font-normal tracking-[-0.01em]",
              i === 0 && "border-t"
            )}
          >
            {n.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className={brutalButtonClass("primary", "mt-8 w-full")}
        >
          Start a project <ArrowRight />
        </a>
      </nav>
    </>
  );
}
