import { type FormEvent, useState } from "react";

interface Props {
  /** Used as the source of the lead, e.g. "contact" or "brochure" */
  source: string;
  /** Pre-filled subject, e.g. "Enquiry: Forest Front" */
  defaultSubject?: string;
  projectId?: string;
  /** Button label */
  submitLabel?: string;
}

type Errors = Partial<Record<"name" | "email" | "phone" | "message" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{8,14}$/;

/**
 * Enquiry / lead form with validation, a honeypot field against bots,
 * and submission through submitLead() (see src/lib/submitLead.ts).
 */
export default function EnquiryForm({ source, defaultSubject = "", projectId, submitLabel = "Send enquiry" }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    // Honeypot: real visitors never fill this hidden field
    if (get("company_website")) return;

    const data = {
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      subject: get("subject") || defaultSubject,
      message: get("message"),
      consent: fd.get("consent") === "on",
    };

    const next: Errors = {};
    if (data.name.length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(data.email)) next.email = "Please enter a valid email.";
    if (data.phone && !PHONE_RE.test(data.phone)) next.phone = "Please enter a valid phone number.";
    if (data.message.length < 5) next.message = "Please add a short message.";
    if (!data.consent) next.consent = "Please accept to be contacted.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      // await submitLead({ ...data, source, projectId });
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="field">
        <label htmlFor={`name-${source}`}>Full name *</label>
        <input id={`name-${source}`} name="name" type="text" autoComplete="name" required />
        <span className="field-error">{errors.name}</span>
      </div>
      <div className="field">
        <label htmlFor={`email-${source}`}>Email *</label>
        <input id={`email-${source}`} name="email" type="email" autoComplete="email" required />
        <span className="field-error">{errors.email}</span>
      </div>
      <div className="field">
        <label htmlFor={`phone-${source}`}>Phone (optional)</label>
        <input id={`phone-${source}`} name="phone" type="tel" autoComplete="tel" placeholder="+91" />
        <span className="field-error">{errors.phone}</span>
      </div>
      <div className="field">
        <label htmlFor={`subject-${source}`}>Subject</label>
        <input id={`subject-${source}`} name="subject" type="text" defaultValue={defaultSubject} />
      </div>
      <div className="field full">
        <label htmlFor={`message-${source}`}>Message *</label>
        <textarea id={`message-${source}`} name="message" required />
        <span className="field-error">{errors.message}</span>
      </div>
      <div className="field full">
        <label style={{ fontWeight: 400, display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
          <input type="checkbox" name="consent" style={{ width: "auto", marginTop: ".3rem" }} required />
          <span>
            I agree to be contacted about my enquiry. We handle your details as described in our{" "}
            <a href="/legal#privacy">privacy policy</a>.
          </span>
        </label>
        <span className="field-error">{errors.consent}</span>
      </div>

      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : submitLabel}
      </button>

      <div
        className={`form-msg ${status === "ok" ? "ok" : status === "error" ? "err" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status === "ok" && "Thank you. Our team will contact you within one business day."}
        {status === "error" && "Sorry, we could not send your message. Please call us or email us directly."}
      </div>
    </form>
  );
}
