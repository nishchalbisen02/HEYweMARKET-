"use client";

import { ArrowRight } from "lucide-react";

/**
 * "Apply Now" on an opportunity card. Stashes the chosen role so the form can
 * pre-select it, then smooth-scrolls to the form (also works with plain #apply
 * navigation if JS is unavailable).
 */
export function ApplyButton({ role, className }: { role: string; className?: string }) {
  return (
    <a
      href="#apply"
      onClick={() => {
        try {
          sessionStorage.setItem("careers:role", role);
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new CustomEvent("careers:role", { detail: role }));
      }}
      className={
        className ??
        "inline-flex items-center gap-2 border border-border bg-orange px-5 py-3 font-heading text-[13px]  tracking-[0.02em] text-ink shadow-brutal-sm transition-transform duration-150 hover:-translate-y-[2px] hover:shadow-none"
      }
    >
      Apply Now <ArrowRight className="size-4" />
    </a>
  );
}
