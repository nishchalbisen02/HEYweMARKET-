"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "cn";
import { NAV } from "@/lib/site";
import { brutalButtonClass } from "@/components/brutal-button";

function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#hero" className={cn("inline-flex items-center gap-2 font-heading text-[19px] font-black uppercase tracking-[-0.02em]", className)}>
      <span className="grid size-[26px] place-items-center border-2 border-ink bg-primary text-[14px] leading-none text-primary-foreground">
        H
      </span>
      Hey We Market
    </a>
  );
}

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
          "fixed inset-x-0 top-0 z-[100] border-b-[3px] border-ink bg-background transition-shadow duration-150",
          scrolled && "shadow-[0_6px_0_rgba(15,23,42,0.14)]"
        )}
      >
        <div className="wrap flex h-[66px] items-center justify-between gap-4">
          <Wordmark />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={cn(
                  "border-2 border-transparent px-2.5 py-2 font-mono text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors duration-150 hover:border-ink hover:bg-primary hover:text-primary-foreground",
                  active === n.href.slice(1) && "border-ink bg-primary text-primary-foreground"
                )}
              >
                {n.label}
              </a>
            ))}
            <a href="#contact" className="ml-1.5 inline-flex items-center gap-2 border-2 border-ink bg-ink px-3 py-2 font-mono text-[12.5px] font-bold uppercase tracking-[0.06em] text-background transition-colors duration-150 hover:bg-accent hover:text-accent-foreground">
              Start a project <ArrowRight className="size-3.5" />
            </a>
          </nav>
          <button
            className="grid size-12 place-items-center border-[3px] border-ink bg-card lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" strokeWidth={3} /> : <Menu className="size-6" strokeWidth={3} />}
          </button>
        </div>
      </header>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[66px] z-[110] flex flex-col overflow-y-auto border-t-[3px] border-ink bg-background p-[clamp(16px,5vw,64px)] transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "invisible translate-x-full"
        )}
      >
        {NAV.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={cn(
              "border-b-2 border-ink py-[18px] font-heading text-[clamp(1.4rem,7vw,2.2rem)] font-extrabold uppercase",
              i === 0 && "border-t-2"
            )}
          >
            {n.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className={brutalButtonClass("primary", "mt-6 w-full")}
        >
          Start a project <ArrowRight />
        </a>
      </nav>
    </>
  );
}
