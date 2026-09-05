import { cn } from "cn";
import { Button } from "@/components/ui/button";

type Tone = "primary" | "accent" | "plain" | "on-dark";

const base =
  "inline-flex items-center justify-center gap-2.5 border-[3px] border-ink font-heading font-extrabold uppercase tracking-[0.02em] text-[clamp(13px,1.5vw,15px)] px-6 py-4 min-h-12 shadow-brutal transition-[transform,box-shadow,background-color,color] duration-150 [transition-timing-function:linear] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[6px] active:translate-y-[6px] active:shadow-none [&_svg]:size-5 [&_svg]:shrink-0 whitespace-nowrap";

const tones: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  plain: "bg-card text-foreground",
  "on-dark":
    "bg-accent text-accent-foreground border-night-fg shadow-brutal-pink hover:shadow-[4px_4px_0_#b3a2cc] active:shadow-none",
};

export function brutalButtonClass(tone: Tone = "plain", extra?: string) {
  return cn(base, tones[tone], extra);
}

/** Real <button> element (shadcn Button) styled brutalist. */
export function BrutalButton({
  tone = "plain",
  className,
  ...props
}: React.ComponentProps<typeof Button> & { tone?: Tone }) {
  return <Button className={cn(brutalButtonClass(tone), "rounded-none", className)} {...props} />;
}
