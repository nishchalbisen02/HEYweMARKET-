"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { UploadCloud, FileText, X, Loader2, Check, ArrowRight } from "lucide-react";
import {
  EMPTY_APPLICATION,
  POSITIONS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  PORTFOLIO_FIELDS,
  RESUME_ACCEPT,
  RESUME_MIME,
  RESUME_MAX_BYTES,
  SAMPLES_ACCEPT,
  SAMPLES_MIME,
  SAMPLES_MAX_BYTES,
  humanFileSize,
  validateApplication,
  type ApplicationFields,
} from "@/lib/careers";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof ApplicationFields | "resume" | "samples", string>>;

const inputBase = "k-input";
const labelBase = "k-label";

function fileError(file: File | null, mimes: string[], max: number, label: string, required: boolean) {
  if (!file) return required ? `${label} is required.` : null;
  if (file.size > max) return `${label} must be under ${humanFileSize(max)}.`;
  const okExt = /\.(pdf|docx?|png|jpe?g|webp)$/i.test(file.name);
  if (!mimes.includes(file.type) && !okExt) return `Unsupported file type for ${label.toLowerCase()}.`;
  return null;
}

export function ApplicationForm() {
  const [fields, setFields] = useState<ApplicationFields>(EMPTY_APPLICATION);
  const [resume, setResume] = useState<File | null>(null);
  const [samples, setSamples] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // preselect the role when arriving from an "Apply Now" button
  useEffect(() => {
    const apply = (role: string) => {
      if (POSITIONS.includes(role)) setFields((f) => ({ ...f, position: role }));
    };
    try {
      const stored = sessionStorage.getItem("careers:role");
      if (stored) {
        apply(stored);
        sessionStorage.removeItem("careers:role");
      }
    } catch {
      /* ignore */
    }
    const onEvent = (e: Event) => apply((e as CustomEvent<string>).detail);
    window.addEventListener("careers:role", onEvent);
    return () => window.removeEventListener("careers:role", onEvent);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (k: keyof ApplicationFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const next: Errors = validateApplication(fields);
    const rErr = fileError(resume, RESUME_MIME, RESUME_MAX_BYTES, "Resume / CV", true);
    const sErr = fileError(samples, SAMPLES_MIME, SAMPLES_MAX_BYTES, "Work samples", false);
    if (rErr) next.resume = rErr;
    if (sErr) next.samples = sErr;
    setErrors(next);

    if (Object.values(next).some(Boolean)) {
      const firstKey = Object.keys(next).find((k) => next[k as keyof Errors]);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      setFormError("Some details need a quick fix before we can send this.");
      return;
    }

    setStatus("submitting");
    try {
      const body = new FormData();
      (Object.keys(fields) as (keyof ApplicationFields)[]).forEach((k) => body.set(k, fields[k]));
      if (resume) body.set("resume", resume);
      if (samples) body.set("samples", samples);

      const res = await fetch("/api/careers", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Errors;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        window.scrollTo({ top: document.getElementById("apply")?.offsetTop ?? 0, behavior: "smooth" });
        return;
      }

      if (data.fieldErrors) setErrors((prev) => ({ ...prev, ...data.fieldErrors }));
      setStatus("error");
      setFormError(data.error || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setFormError("Network error — check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="k-card p-8 text-center sm:p-14">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--lime)] text-black">
          <Check className="size-9" strokeWidth={3} />
        </span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-6 text-[clamp(1.6rem,4vw,2.4rem)]  outline-none"
        >
          Application Received <span className="text-accent">✓</span>
        </h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-relaxed text-mute">
          Thanks for reaching out to Hey We Market. We’ve received your application and our team will review it.
        </p>
        <a
          href="#top"
          onClick={() => setStatus("idle")}
          className="btn btn-primary mt-7"
        >
          <span>Back to Careers</span>
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rv grid gap-8">
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Group title="Personal details">
        <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
          <Field label="Full name" name="fullName" required error={errors.fullName}>
            <input {...bind("fullName", fields, set, errors)} autoComplete="name" placeholder="Your name" />
          </Field>
          <Field label="Email address" name="email" required error={errors.email}>
            <input {...bind("email", fields, set, errors)} type="email" autoComplete="email" placeholder="you@email.com" />
          </Field>
          <Field label="WhatsApp number" name="whatsapp" required error={errors.whatsapp}>
            <input {...bind("whatsapp", fields, set, errors)} inputMode="tel" autoComplete="tel" placeholder="+91 …" />
          </Field>
          <Field label="City" name="city" required error={errors.city}>
            <input {...bind("city", fields, set, errors)} autoComplete="address-level2" placeholder="Where you’re based" />
          </Field>
          <Field label="Date of birth" name="dob" hint="optional" error={errors.dob}>
            <input {...bind("dob", fields, set, errors)} type="date" className={inputBase} />
          </Field>
        </div>
      </Group>

      <Group title="Application details">
        <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
          <Field label="Position applying for" name="position" required error={errors.position}>
            <select {...bind("position", fields, set, errors)}>
              <option value="">Select a role…</option>
              {POSITIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Employment type" name="employmentType" required error={errors.employmentType}>
            <select {...bind("employmentType", fields, set, errors)}>
              <option value="">Select…</option>
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Experience" name="experience" required error={errors.experience}>
            <select {...bind("experience", fields, set, errors)}>
              <option value="">Select…</option>
              {EXPERIENCE_LEVELS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Education / qualification" name="education" error={errors.education}>
            <input {...bind("education", fields, set, errors)} placeholder="e.g. B.Des, 2025" />
          </Field>
        </div>
        <Field label="Skills" name="skills" required error={errors.skills} hint="comma separated">
          <input {...bind("skills", fields, set, errors)} placeholder="Photoshop, Figma, Copywriting…" />
        </Field>
        <Field label="About yourself" name="about" required error={errors.about}>
          <textarea {...bind("about", fields, set, errors)} rows={4} placeholder="A few lines about who you are and what you make." />
        </Field>
        <Field label="Why do you want to join Hey We Market?" name="why" required error={errors.why}>
          <textarea {...bind("why", fields, set, errors)} rows={4} placeholder="What draws you to this team?" />
        </Field>
        <Field label="Availability / notice period" name="availability" error={errors.availability}>
          <input {...bind("availability", fields, set, errors)} placeholder="e.g. Immediate, 30 days" />
        </Field>
      </Group>

      <Group title="Portfolio" hint="Share whatever’s relevant — all optional.">
        <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
          {PORTFOLIO_FIELDS.map(({ name, label }) => (
            <Field key={name} label={label} name={name} error={errors[name]}>
              <input {...bind(name, fields, set, errors)} inputMode="url" placeholder="https://" />
            </Field>
          ))}
        </div>
      </Group>

      <Group title="Files">
        <div className="grid gap-5 sm:grid-cols-2">
          <FileZone
            label="Resume / CV"
            required
            accept={RESUME_ACCEPT}
            hint="PDF, DOC or DOCX · max 5 MB"
            file={resume}
            error={errors.resume}
            onFile={(f) => {
              setResume(f);
              setErrors((p) => ({ ...p, resume: undefined }));
            }}
          />
          <FileZone
            label="Portfolio / work samples"
            accept={SAMPLES_ACCEPT}
            hint="PDF or image · max 10 MB"
            file={samples}
            error={errors.samples}
            onFile={(f) => {
              setSamples(f);
              setErrors((p) => ({ ...p, samples: undefined }));
            }}
          />
        </div>
      </Group>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {formError && (
          <p className="rounded-2xl border border-[var(--error-line)] bg-[var(--error-bg)] px-4 py-3 text-[14px] font-medium text-[var(--error-fg)]">
            {formError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary w-full justify-center sm:w-fit disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="inline-flex items-center gap-2.5">
          {status === "submitting" ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Submit application <ArrowRight className="size-5" aria-hidden="true" />
            </>
          )}
        </span>
      </button>
      <p className="text-[12.5px] leading-relaxed text-mute">
        By submitting, you agree that we may contact you about this application. Your files are shared only with the
        Hey We Market hiring team.
      </p>
    </form>
  );
}

/* ---------- field primitives ---------- */

function bind(
  name: keyof ApplicationFields,
  fields: ApplicationFields,
  set: (k: keyof ApplicationFields) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  errors: Errors
) {
  return {
    name,
    id: `f-${name}`,
    value: fields[name],
    onChange: set(name),
    className: inputBase,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  };
}

function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="k-card grid gap-4 p-5 sm:p-8">
      <legend className="rounded-full bg-[var(--band)] px-4 py-1.5 font-[family-name:var(--font-baloo)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--band-accent)]">
        {title}
      </legend>
      {hint && <p className="-mt-1 text-[13px] text-mute">{hint}</p>}
      {children}
    </fieldset>
  );
}

function Field({
  label,
  name,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={`f-${name}`} className={labelBase}>
        {label} {required ? <span className="text-accent">*</span> : hint ? <span className="text-mute normal-case tracking-normal">({hint})</span> : null}
      </label>
      {children}
      {error && (
        <p id={`e-${name}`} className="mt-1.5 text-[13px] font-medium text-[var(--error-fg)]">
          {error}
        </p>
      )}
    </div>
  );
}

function FileZone({
  label,
  accept,
  hint,
  file,
  error,
  required,
  onFile,
}: {
  label: string;
  accept: string;
  hint: string;
  file: File | null;
  error?: string;
  required?: boolean;
  onFile: (f: File | null) => void;
}) {
  const [drag, setDrag] = useState(false);
  const id = `file-${label.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div>
      <span className={labelBase}>
        {label} {required ? <span className="text-accent">*</span> : <span className="text-mute normal-case tracking-normal">(optional)</span>}
      </span>

      {file ? (
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-[var(--surface)] p-3">
          <FileText className="size-6 shrink-0 text-accent" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold">{file.name}</span>
            <span className="text-[12px] text-mute">{humanFileSize(file.size)}</span>
          </span>
          <button
            type="button"
            onClick={() => onFile(null)}
            aria-label={`Remove ${label}`}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-[var(--surface)] transition-colors hover:bg-[var(--btn-bg)] hover:text-[var(--btn-fg)]"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
          className={
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] border-2 border-dashed border-[rgb(var(--ink-rgb)/0.28)] px-4 py-8 text-center transition-colors " +
            (drag ? "bg-accent/15" : "bg-[var(--surface)] hover:bg-[var(--bg)]")
          }
        >
          <UploadCloud className="size-7 text-ink" />
          <span className="text-[14px] font-semibold">Drag &amp; drop, or click to browse</span>
          <span className="text-[12px] text-mute">{hint}</span>
          <input
            id={id}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
      {error && <p className="mt-1.5 text-[13px] font-medium text-[var(--error-fg)]">{error}</p>}
    </div>
  );
}
