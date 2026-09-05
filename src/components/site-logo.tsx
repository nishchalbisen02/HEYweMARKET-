import { cn } from "cn";

/**
 * Hey We Market logo — the brand lockup (lime tile with "hey we market" +
 * the OK-hand mark), extracted from the original site. Swap public/logo.jpg
 * for an SVG/PNG export if you have a transparent version.
 */
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
    <a href={href} className={cn("inline-flex items-center", className)} aria-label="Hey We Market — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpg"
        alt="Hey We Market"
        width={442}
        height={404}
        className={cn("h-10 w-auto border-2", onDark ? "border-background" : "border-ink")}
      />
    </a>
  );
}
