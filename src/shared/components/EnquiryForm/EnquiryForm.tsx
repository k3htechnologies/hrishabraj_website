import { type FormEvent, useState } from "react";
import AsyncDropdown, { type DropdownOption, type LoadOptionsResult } from "../AsyncDropdown";
import type { EnquiryFormData, EnquiryFormErrors } from "./EnquiryForm.types";
import { EnquiryService } from "./EnquiryForm.service";

interface Props {
  prefillData?: EnquiryPrefillData;
  /** Used as the source of the lead, e.g. "contact" or "brochure" */
  source: string;
  projectId?: string;
  /** Button label */
  submitLabel?: string;
}


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface EnquiryPrefillData {
  location: DropdownOption;
  project: DropdownOption;
  locked?: boolean; // whether these fields should be disabled, defaults to true
}

export default function EnquiryForm({ prefillData, source, submitLabel = "Send enquiry" }: Props) {
  const [location, setLocation] = useState<DropdownOption | null>(
    prefillData?.location ?? null
  );
  const [project, setProject] = useState<DropdownOption | null>(
    prefillData?.project ?? null
  );
  const isLocked = prefillData ? (prefillData.locked ?? true) : false;
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    mobile: '',
    countryCode: '+91',
    consent: false
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const loadLocations = async ({
    page,
    pageSize,
    keyword,
  }: {
    page: number;
    pageSize: number;
    keyword: string;
  }): Promise<LoadOptionsResult> => {
    const response = await EnquiryService.apiCallFetchLocations({
      pageNumber: page,
      pageSize,
      villageName: keyword,
    });
    if (response && response.Data && response.Data.length) {
      const data: DropdownOption[] = response?.Data.map((location) => ({
        id: String(location.CityMasterId),
        label: location.CityName,
      }));
      return {
        data,
        totalRecords: response.TotalNumberOfRecord ?? 0,
      };
    }
    return {
      data: [],
      totalRecords: 0,
    };
  };

  const loadProjectsBasedOnLocation = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }): Promise<LoadOptionsResult> => {
    const response = await EnquiryService.apiCallFetchProjectsBasedOnLocation({
      LocationId: Number(location?.id) ?? '',
      pageNumber: page,
      pageSize,
    });
    if (response && response.Data && response.Data.length) {
      const data: DropdownOption[] = response?.Data.map((project) => ({
        id: String(project.ProjectId),
        label: project.ProjectName,
      }));
      return {
        data,
        totalRecords: response.TotalNumberOfRecord ?? 0,
      };
    }
    return {
      data: [],
      totalRecords: 0,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === "mobile") {
      value = value.replace(/\D/g, '').slice(0, 10)
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: EnquiryFormErrors = {};

    if (!(location && location.id)) {
      newErrors.projectLocation = 'Project Location is required';
    }
    if (!(project && project.id)) {
      newErrors.projectName = 'Project name is required';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_RE.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }
    // else if (!MOBILE_REGEX.test(formData.mobile.trim())) {
    //   newErrors.mobile = 'Enter valid mobile number';
    // }
    if (!formData.consent) {
      newErrors.consent = 'Please accept to be contacted.'
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    // Honeypot: real visitors never fill this hidden field
    if (get("company_website")) return;

    const isValid = validateForm();
    if (!isValid) return;
    try {
      setIsSubmitting(true);
      const response = await EnquiryService.apiCallSubmitEnquiry({
        UniqueKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        WebsiteLeadId: 0,
        ProjectLocation: project?.label ?? '',
        ProjectId: project?.id ?? '',
        FullName: formData.fullName,
        MobileNo: `${formData.countryCode} ${formData.mobile}`,
        EmailAddress: formData.email,
      });

      if (!response.IsSuccess) {
        throw new Error('Submission failed');
      }
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        countryCode: '+91',
        consent: false
      });
      setLocation(null);
      setProject(null);
      setStatus("ok")
    } catch (error) {
      setStatus("error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input className="hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="field">
        <label htmlFor={`name-${source}`}>Full name *</label>
        <input id={`name-${source}`} name="fullName" type="text" autoComplete="name" required value={formData.fullName} onChange={handleChange} />
        <span className="field-error">{errors.fullName}</span>
      </div>
      <div className="field">
        <label htmlFor={`email-${source}`}>Email *</label>
        <input id={`email-${source}`} name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} />
        <span className="field-error">{errors.email}</span>
      </div>
      <div className="field">
        <label htmlFor={`phone-${source}`}>Phone (optional)</label>
        <input id={`phone-${source}`} name="mobile" type="tel" autoComplete="tel" placeholder="+91" value={formData.mobile} onChange={handleChange} />
        <span className="field-error">{errors.mobile}</span>
      </div>
      <div className="field">
        <AsyncDropdown
          label="Project Location"
          placeholder="Select location"
          loadOptions={loadLocations}
          value={location}
          onChange={setLocation}
          mandatory={true}
          error={errors.projectLocation}
          defaultValue={location}
          disabled={isLocked}
        />
      </div>
      <div className="field full">
        <AsyncDropdown
          key={location?.id ?? 'empty'}
          label="Project Name"
          placeholder="Enter project name"
          loadOptions={loadProjectsBasedOnLocation}
          value={project}
          onChange={setProject}
          mandatory={true}
          error={errors.projectName}
          defaultValue={project}
          disabled={isLocked || !(location && location.id)}
        />
      </div>
      <div className="field full">
        <label style={{ fontWeight: 400, display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
          <input type="checkbox" name="consent" style={{ width: "auto", marginTop: ".3rem" }} required checked={formData.consent} onChange={handleChange} />
          <span>
            I agree to be contacted about my enquiry. We handle your details as described in our{" "}
            <a href="/legal#privacy">privacy policy</a>.
          </span>
        </label>
        <span className="field-error">{errors.consent}</span>
      </div>

      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : submitLabel}
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
