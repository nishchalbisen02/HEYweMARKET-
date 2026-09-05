import type { ElementType, ReactNode } from "react";

/**
 * Marks an element for scroll-reveal. The actual observing is done once,
 * globally, by <RevealObserver/> (mounted in the root layout), so this stays
 * a plain server component with no per-instance JS.
 * Progressive enhancement: without JS the element is fully visible (see globals.css).
 */
export function Reveal({
  as: Tag = "div",
  delay,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag data-reveal="" data-delay={delay} className={className} {...rest}>
      {children}
    </Tag>
  );
}
