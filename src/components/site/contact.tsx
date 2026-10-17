import { CONTACT, WHATSAPP_HREF } from "@/lib/site";

/** Contact — all details come from CONTACT so they match the footer and the JSON-LD. */
export function Contact() {
  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <div className="eyebrow rv">Contact</div>
          <h2 className="rv d1">Let&apos;s Build Something Real</h2>
          <p className="sub rv d2">
            If you are tired of marketing that feels generic, let&apos;s talk about what your business actually needs.
          </p>
          <span className="contact-note rv d3">Currently accepting new projects</span>
        </div>
        <div className="contact-panel rv right d2">
          <div className="contact-panel-head">
            <h3>Start a conversation</h3>
            <span>
              Response within
              <br />
              24 hours
            </span>
          </div>
          <div className="c-item">
            <span className="ci">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </span>
            <div>
              <span className="contact-label">Email</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </div>
          <div className="c-item">
            <span className="ci">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 9.9a16 16 0 006.1 6.1l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0122 16.9z" />
              </svg>
            </span>
            <div>
              <span className="contact-label">Phone</span>
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
            </div>
          </div>
          <div className="c-item">
            <span className="ci">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.4" />
              </svg>
            </span>
            <address style={{ fontStyle: "normal" }}>{CONTACT.addressLine}</address>
          </div>
          <div className="contact-action">
            <small>
              Have a brief ready?
              <br />
              Send it our way.
            </small>
            <div className="contact-actions">
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("New project enquiry")}`}
                className="btn btn-primary magnetic"
              >
                <span>Email Us</span>
              </a>
              <a
                href={WHATSAPP_HREF}
                className="btn btn-whatsapp magnetic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
