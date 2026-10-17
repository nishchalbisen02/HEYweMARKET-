/**
 * Only one thing on the page may make sound at a time (hero music vs the showreel).
 * Whoever starts sound announces itself; everything else silences itself.
 */
export type SoundSource = "hero" | "showreel";

const EVENT = "hwm:sound";

export function announceSound(source: SoundSource) {
  window.dispatchEvent(new CustomEvent<SoundSource>(EVENT, { detail: source }));
}

/** Subscribe to other sources starting sound. Returns the unsubscribe function. */
export function onOtherSound(self: SoundSource, silence: () => void) {
  const handler = (e: Event) => {
    if ((e as CustomEvent<SoundSource>).detail !== self) silence();
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
