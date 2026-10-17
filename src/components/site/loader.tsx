import Image from "next/image";

/**
 * Page chrome that sits above everything: the scroll-progress bar, the lime
 * intro curtain and the cursor glow. All three are driven by <Effects/>.
 * The curtain also hides itself after a few seconds of pure CSS (see site.css)
 * so a slow or failed script load can never leave the page covered.
 */
export function Loader() {
  return (
    <>
      <div id="progress" aria-hidden="true" />
      <div id="loader" aria-hidden="true">
        <Image src="/logo.jpg" alt="" width={442} height={404} priority sizes="240px" style={{ height: "auto" }} />
        <div className="bar">
          <i />
        </div>
      </div>
      <div id="glow" aria-hidden="true" />
    </>
  );
}
