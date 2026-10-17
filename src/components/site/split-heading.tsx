import { Fragment, type CSSProperties, type ElementType } from "react";

/**
 * Heading whose words slide up one by one when it scrolls into view.
 *
 * The static build split the text into word spans with JavaScript after load;
 * doing it here on the server means the heading is real, complete text in the
 * HTML (good for crawlers and no-JS readers) and never reflows on hydration.
 * The `in` class is added by <Effects/> when the heading enters the viewport.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className = "",
  style,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const words = children.trim().split(/\s+/);
  return (
    <Tag className={`wsplit rv ${className}`.trim()} style={style}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span className="w">
            <i style={{ transitionDelay: `${i * 0.05}s` }}>{word}</i>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
