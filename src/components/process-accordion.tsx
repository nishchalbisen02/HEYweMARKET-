"use client";

import { useState } from "react";
import { cn } from "cn";
import { PROCESS } from "@/lib/site";

export function ProcessAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="brutal-box" data-reveal="">
      {PROCESS.map((p, i) => {
        const isOpen = open === i;
        return (
          <div key={p.n} className="border-t-2 border-ink first:border-t-0">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={cn(
                "grid w-full grid-cols-[56px_1fr_40px] items-center gap-[clamp(12px,3vw,28px)] px-[clamp(16px,2.5vw,26px)] py-[clamp(18px,2.6vw,26px)] text-left",
                isOpen && "bg-primary"
              )}
            >
              <span className={cn("font-mono text-[14px] font-bold", isOpen ? "text-primary-foreground" : "text-muted-foreground")}>
                {p.n}
              </span>
              <span
                className={cn(
                  "font-heading text-[clamp(1.3rem,3.4vw,2.4rem)]  transition-colors duration-150",
                  isOpen ? "text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {p.title}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "relative size-[26px] justify-self-end",
                  "before:absolute before:left-1/2 before:top-1/2 before:h-[3px] before:w-4 before:-translate-x-1/2 before:-translate-y-1/2",
                  "after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-[3px] after:-translate-x-1/2 after:-translate-y-1/2 after:transition-transform after:duration-150",
                  isOpen ? "before:bg-primary-foreground after:bg-primary-foreground after:scale-y-0" : "before:bg-ink after:bg-ink"
                )}
              />
            </button>
            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="max-w-[60ch] px-[clamp(16px,2.5vw,26px)] pb-7 pt-1 pl-[72px] font-normal leading-[1.7] max-[640px]:pl-[clamp(16px,2.5vw,26px)]">
                  {p.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
