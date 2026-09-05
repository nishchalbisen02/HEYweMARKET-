"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-inview", "true");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    const scan = () =>
      document
        .querySelectorAll("[data-reveal]:not([data-inview])")
        .forEach((el) => io.observe(el));

    scan();

    // catch anything mounted later (e.g. audit result panels)
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
