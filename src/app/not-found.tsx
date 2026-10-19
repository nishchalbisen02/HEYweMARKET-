import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Branded 404 — shares the site chrome (header, footer, WhatsApp button) from the root layout. */
export default function NotFound() {
  return (
    <section className="ambient" style={{ minHeight: "100svh", display: "flex", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="chapter">
          <b>Error 404</b>
        </div>
        <h1>This page wandered off.</h1>
        <p className="sub" style={{ margin: "24px auto 0" }}>
          The page you are looking for does not exist or has moved. Let&apos;s get you back to the work that matters.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary magnetic">
            <span>Back to home</span>
          </Link>
          <Link href="/#contact" className="btn btn-ghost magnetic">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
