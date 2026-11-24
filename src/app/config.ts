/**
 * COMPANY CONFIGURATION
 * IT edits this file for contact details, the form endpoint, and social links.
 */
export const CONFIG = {
  siteName: "H. Rishabraj",
  legalName: "Rishabraj Estate Developers Private Limited",
  phone: "+91 89897 24545",
  phoneTel: "+918989724545",
  email: "info@hrishabraj.com",
  /** Country code + number, no + or spaces. Used for wa.me links. */
  whatsapp: "918989724545",
  address:
    "13th Floor, H. Rishabraj Chambers, Road No. 10, Daulat Nagar, Borivali (East), Mumbai 400066",
  /** Paste a Google Maps "Embed a map" src URL here (optional). */
  mapEmbedSrc: "",
  /**
   * Where enquiry and brochure leads are sent (JSON POST).
   * Leave empty to fall back to opening the visitor's email app.
   * Can be overridden at build time with VITE_FORM_ENDPOINT.
   */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "",
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },
  stats: [
    { value: 15, suffix: "+", label: "Years of excellence" },
    { value: 75, suffix: "+", label: "Projects delivered" },
    { value: 5000, suffix: "+", label: "Families served" },
  ],
} as const;
