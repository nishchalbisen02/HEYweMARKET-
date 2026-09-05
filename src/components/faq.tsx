import { FAQS } from "@/lib/site";

export function Faq() {
  return (
    <div className="brutal-box" data-reveal="">
      {FAQS.map((f, i) => (
        <details key={i} className="group border-t-2 border-ink first:border-t-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[clamp(16px,2.5vw,26px)] py-[clamp(18px,2.4vw,24px)] font-heading text-[clamp(0.95rem,1.9vw,1.2rem)] font-extrabold uppercase leading-[1.15] group-open:bg-primary group-open:text-primary-foreground [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="relative size-[22px] shrink-0 transition-transform duration-150 group-open:rotate-45 before:absolute before:left-1/2 before:top-1/2 before:h-[3px] before:w-[14px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-primary after:absolute after:left-1/2 after:top-1/2 after:h-[14px] after:w-[3px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-primary group-open:before:bg-primary-foreground group-open:after:bg-primary-foreground"
            />
          </summary>
          <div className="max-w-[74ch] px-[clamp(16px,2.5vw,26px)] pb-6 font-normal leading-[1.7] [&_b]:bg-muted [&_b]:shadow-[0_0_0_2px_var(--color-muted)]">
            {f.a}
          </div>
        </details>
      ))}
    </div>
  );
}
