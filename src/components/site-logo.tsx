import { cn } from "cn";

/**
 * Hey We Market lockup: a hand/"hi" mark (orange + lime, from the brand logo)
 * in a brutalist frame + wordmark. To use the real asset instead, drop it at
 * public/logo.svg and swap <HandMark/> for <img src="/logo.svg" .../>.
 */
function HandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g stroke="#DC9750" strokeWidth="4" strokeLinecap="round">
        <line x1="15" y1="18" x2="11" y2="12" />
        <line x1="23" y1="13" x2="21" y2="6" />
        <line x1="32" y1="11" x2="32" y2="4" />
        <line x1="41" y1="13" x2="43" y2="6" />
        <line x1="49" y1="18" x2="53" y2="12" />
      </g>
      <g fill="#DC9750" stroke="#8FA32E" strokeWidth="3" strokeLinejoin="round">
        <rect x="20" y="34" width="24" height="24" rx="9" />
        <rect x="21" y="22" width="7" height="18" rx="3.5" />
        <rect x="28.5" y="17" width="7" height="23" rx="3.5" />
        <rect x="36" y="22" width="7" height="18" rx="3.5" />
        <rect x="13.5" y="31" width="7" height="16" rx="3.5" transform="rotate(-22 17 39)" />
      </g>
    </svg>
  );
}

export function SiteLogo({
  href = "#hero",
  onDark = false,
  className,
}: {
  href?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <a href={href} className={cn("inline-flex items-center gap-2.5", className)} aria-label="Hey We Market — home">
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center border-2 bg-card",
          onDark ? "border-background" : "border-ink"
        )}
      >
        <HandMark className="size-6" />
      </span>
      <span className="inline-flex items-baseline gap-1.5 leading-none">
        <span className="font-heading text-[13px] font-bold uppercase tracking-[0.04em]">hey we</span>
        <span className="font-script text-[26px] font-bold leading-[0.7] text-[#DC9750]">market</span>
      </span>
    </a>
  );
}
