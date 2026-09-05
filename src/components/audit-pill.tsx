"use client";

import { useEffect, useRef, useState } from "react";

export function AuditPill() {
  const [show, setShow] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    try {
      dismissed.current = sessionStorage.getItem("hwm_pill") === "1";
    } catch {}
    const onScroll = () => {
      if (dismissed.current) return;
      const contact = document.getElementById("contact");
      const past = window.scrollY > window.innerHeight * 1.4;
      const atEnd = contact ? contact.getBoundingClientRect().top < window.innerHeight : false;
      setShow(past && !atEnd);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "fixed bottom-4 left-4 z-[90] flex max-w-[calc(100vw-2rem)] items-center gap-3 border-[3px] border-ink bg-ink py-2.5 pl-4 pr-2.5 text-background shadow-brutal-pink transition-transform duration-200 " +
        (show ? "translate-y-0" : "translate-y-[160%]")
      }
    >
      <p className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.03em] leading-tight sm:block">
        Free 360&deg; growth audit // 90 sec
      </p>
      <a
        href="#audit"
        className="inline-flex min-h-9 items-center border-2 border-background bg-primary px-3 py-2.5 font-heading text-[11px] font-extrabold uppercase text-primary-foreground"
      >
        Get mine
      </a>
      <button
        aria-label="Dismiss"
        onClick={() => {
          dismissed.current = true;
          setShow(false);
          try {
            sessionStorage.setItem("hwm_pill", "1");
          } catch {}
        }}
        className="min-h-8 min-w-8 p-1.5 font-mono text-base leading-none text-background/60 hover:text-background"
      >
        &times;
      </button>
    </div>
  );
}
