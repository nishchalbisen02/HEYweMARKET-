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
      aria-label={`Apply now for ${role}`}
      className={className ?? "btn btn-primary magnetic"}
    >
      <span className="inline-flex items-center gap-2">
        Apply Now <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </a>
  );
}
