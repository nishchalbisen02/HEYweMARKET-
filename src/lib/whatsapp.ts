/**
 * Thin WhatsApp Cloud API (Graph API) client.
 *
 * Secrets come from environment variables only — never hardcode them:
 *   WHATSAPP_ACCESS_TOKEN     permanent system-user / app token
 *   WHATSAPP_PHONE_NUMBER_ID  the sending business number's ID
 *   WHATSAPP_RECIPIENT_NUMBER destination in international format, digits only (e.g. 919826026029)
 *   WHATSAPP_API_VERSION      optional, defaults to v21.0
 *
 * When the vars are absent `isWhatsappConfigured()` returns false and callers
 * should degrade gracefully rather than throwing.
 *
 * Note on delivery: free-form text/document messages only land if the recipient
 * messaged the business number within the last 24h, otherwise Meta requires an
 * approved template. For an internal recruiting inbox that 24h window is easy to
 * keep open; if you see error code 131047, reply once from the recipient number.
 */

type Env = {
  token: string;
  phoneNumberId: string;
  recipient: string;
  version: string;
};

function readEnv(): Env | null {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER;
  if (!token || !phoneNumberId || !recipient) return null;
  return {
    token,
    phoneNumberId,
    recipient: recipient.replace(/[^\d]/g, ""),
    version: process.env.WHATSAPP_API_VERSION || "v21.0",
  };
}

export function isWhatsappConfigured(): boolean {
  return readEnv() !== null;
}

function base(env: Env, path: string) {
  return `https://graph.facebook.com/${env.version}/${env.phoneNumberId}/${path}`;
}

async function parseError(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { error?: { message?: string; code?: number } };
    if (j?.error?.message) return `${j.error.message}${j.error.code ? ` (code ${j.error.code})` : ""}`;
  } catch {
    /* ignore */
  }
  return `WhatsApp API responded ${res.status}`;
}

/** Upload a document to the WhatsApp Media store. Returns the media id. */
export async function uploadMedia(env: Env, file: { data: Blob; type: string }): Promise<string> {
  const body = new FormData();
  body.set("messaging_product", "whatsapp");
  body.set("type", file.type);
  body.set("file", file.data);

  const res = await fetch(base(env, "media"), {
    method: "POST",
    headers: { Authorization: `Bearer ${env.token}` },
    body,
  });
  if (!res.ok) throw new Error(await parseError(res));
  const j = (await res.json()) as { id?: string };
  if (!j.id) throw new Error("WhatsApp media upload returned no id");
  return j.id;
}

async function send(env: Env, payload: Record<string, unknown>): Promise<void> {
  const res = await fetch(base(env, "messages"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", ...payload }),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function sendText(env: Env, text: string): Promise<void> {
  await send(env, { to: env.recipient, type: "text", text: { preview_url: false, body: text } });
}

export async function sendDocument(
  env: Env,
  mediaId: string,
  filename: string,
  caption?: string
): Promise<void> {
  await send(env, {
    to: env.recipient,
    type: "document",
    document: { id: mediaId, filename, ...(caption ? { caption } : {}) },
  });
}

export type DeliverInput = {
  text: string;
  documents: { data: Blob; type: string; filename: string; caption: string }[];
};

export type DeliverResult =
  | { ok: true; sent: { text: boolean; documents: number } }
  | { ok: false; reason: "not_configured" }
  | { ok: false; reason: "send_failed"; error: string };

/**
 * Best-effort delivery of one application: the structured text first, then each
 * file as a document message. Partial success is reported, not thrown.
 */
export async function deliverApplication(input: DeliverInput): Promise<DeliverResult> {
  const env = readEnv();
  if (!env) return { ok: false, reason: "not_configured" };

  try {
    await sendText(env, input.text);
  } catch (err) {
    return { ok: false, reason: "send_failed", error: err instanceof Error ? err.message : "unknown error" };
  }

  let documents = 0;
  for (const doc of input.documents) {
    try {
      const id = await uploadMedia(env, { data: doc.data, type: doc.type });
      await sendDocument(env, id, doc.filename, doc.caption);
      documents += 1;
    } catch {
      /* keep going — the text message already carries the applicant's details */
    }
  }

  return { ok: true, sent: { text: true, documents } };
}
