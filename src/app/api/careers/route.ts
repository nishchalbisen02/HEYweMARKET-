import { NextResponse } from "next/server";
import {
  validateApplication,
  buildWhatsappMessage,
  EMPTY_APPLICATION,
  RESUME_MIME,
  RESUME_MAX_BYTES,
  SAMPLES_MIME,
  SAMPLES_MAX_BYTES,
  humanFileSize,
  type ApplicationFields,
} from "@/lib/careers";
import { deliverApplication, isWhatsappConfigured } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_FALLBACK = "hello@heywemarket.com";

function checkFile(
  file: File | null,
  { required, mimes, max, label }: { required: boolean; mimes: string[]; max: number; label: string }
): string | null {
  if (!file || file.size === 0) return required ? `${label} is required.` : null;
  if (file.size > max) return `${label} must be under ${humanFileSize(max)}.`;
  // Some browsers send an empty/vague MIME type for .doc — fall back to extension.
  const okMime = mimes.includes(file.type);
  const okExt = /\.(pdf|docx?|png|jpe?g|webp)$/i.test(file.name);
  if (!okMime && !okExt) return `${label} must be one of: ${mimes.join(", ")}.`;
  return null;
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Could not read the submitted form." }, { status: 400 });
  }

  // honeypot — bots fill hidden fields
  if (String(form.get("company") || "").trim()) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const fields = {} as ApplicationFields;
  for (const key of Object.keys(EMPTY_APPLICATION) as (keyof ApplicationFields)[]) {
    fields[key] = String(form.get(key) ?? "").trim();
  }

  const fieldErrors = validateApplication(fields);

  const resume = form.get("resume");
  const samples = form.get("samples");
  const resumeFile = resume instanceof File ? resume : null;
  const samplesFile = samples instanceof File ? samples : null;

  const fileErrors: Record<string, string> = {};
  const rErr = checkFile(resumeFile, {
    required: true,
    mimes: RESUME_MIME,
    max: RESUME_MAX_BYTES,
    label: "Resume / CV",
  });
  if (rErr) fileErrors.resume = rErr;
  const sErr = checkFile(samplesFile, {
    required: false,
    mimes: SAMPLES_MIME,
    max: SAMPLES_MAX_BYTES,
    label: "Work samples",
  });
  if (sErr) fileErrors.samples = sErr;

  if (Object.keys(fieldErrors).length || Object.keys(fileErrors).length) {
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors: { ...fieldErrors, ...fileErrors } },
      { status: 422 }
    );
  }

  const text = buildWhatsappMessage(fields, {
    resumeName: resumeFile?.name,
    samplesName: samplesFile && samplesFile.size > 0 ? samplesFile.name : undefined,
  });

  // Always leave a durable record in the server logs so an application is never
  // lost even if the WhatsApp hand-off fails.
  console.info(
    "[careers] application received",
    JSON.stringify({
      at: new Date().toISOString(),
      name: fields.fullName,
      email: fields.email,
      position: fields.position,
      resume: resumeFile ? { name: resumeFile.name, size: resumeFile.size } : null,
      samples: samplesFile?.size ? { name: samplesFile.name, size: samplesFile.size } : null,
    })
  );

  if (!isWhatsappConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: `Applications aren’t being accepted online just yet. Please email your details to ${CONTACT_FALLBACK}.`,
        code: "not_configured",
      },
      { status: 503 }
    );
  }

  const documents: { data: Blob; type: string; filename: string; caption: string }[] = [];
  if (resumeFile) {
    documents.push({
      data: resumeFile,
      type: resumeFile.type || "application/pdf",
      filename: `Resume — ${fields.fullName}`.slice(0, 60) + fileExt(resumeFile.name),
      caption: `Resume — ${fields.fullName} · ${fields.position}`,
    });
  }
  if (samplesFile && samplesFile.size > 0) {
    documents.push({
      data: samplesFile,
      type: samplesFile.type || "application/pdf",
      filename: `Work samples — ${fields.fullName}`.slice(0, 60) + fileExt(samplesFile.name),
      caption: `Work samples — ${fields.fullName}`,
    });
  }

  const result = await deliverApplication({ text, documents });

  if (result.ok) {
    return NextResponse.json({ ok: true, delivered: true, documents: result.sent.documents });
  }

  return NextResponse.json(
    {
      ok: false,
      error: `We hit a snag delivering your application. Please try again in a minute, or email ${CONTACT_FALLBACK}.`,
      code: result.reason,
    },
    { status: 502 }
  );
}

function fileExt(name: string): string {
  const m = name.match(/\.[a-z0-9]+$/i);
  return m ? m[0].toLowerCase() : "";
}
