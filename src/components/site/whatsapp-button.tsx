import { WHATSAPP_HREF } from "@/lib/site";

/** Floating WhatsApp button. (The handset path was orange-on-orange in the static build, i.e. invisible; it is white here.) */
export function WhatsAppButton() {
  return (
    <a
      id="wa"
      href={WHATSAPP_HREF}
      aria-label="Chat with Hey We Market on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.5 3.5A11.8 11.8 0 0012.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.6a11.9 11.9 0 005.7 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.2-1.2-6.2-3.5-8.4zM12 21.4a9.4 9.4 0 01-4.8-1.3l-.4-.2-3.7 1 1-3.6-.2-.4a9.5 9.5 0 01-1.5-5c0-5.2 4.3-9.5 9.6-9.5a9.5 9.5 0 016.8 2.8 9.5 9.5 0 012.8 6.8c0 5.2-4.3 9.4-9.6 9.4z"
          fill="#fff"
        />
        <path
          d="M8.2 6.8c-.2-.4-.4-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.1-1.3-.1-.1-.3-.2-.6-.3-.3-.2-1.6-.8-1.8-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2.1z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
