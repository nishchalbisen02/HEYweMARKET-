import { cn } from "cn";
import { Button } from "@/components/ui/button";

type Tone = "primary" | "accent" | "plain" | "on-dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 min-h-[48px] font-sans text-[15px] font-semibold tracking-[0.01em] whitespace-nowrap shadow-soft transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-soft-lg active:translate-y-0 active:shadow-soft [&_svg]:size-[18px] [&_svg]:shrink-0";

const tones: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--color-primary)_88%,#000)]",
  accent: "bg-accent text-accent-foreground hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,#000)]",
  plain: "bg-card text-foreground border border-input hover:bg-muted",
  "on-dark": "bg-background text-foreground hover:bg-white",
};

export function brutalButtonClass(tone: Tone = "plain", extra?: string) {
  return cn(base, tones[tone], extra);
}

/** Real <button> element (shadcn Button) styled for the warm-premium system. */
export function BrutalButton({
  tone = "plain",
  className,
  ...props
}: React.ComponentProps<typeof Button> & { tone?: Tone }) {
  return <Button className={cn(brutalButtonClass(tone), className)} {...props} />;
}
