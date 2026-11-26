import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useReveal } from "../../shared/hooks/useReveal";
import { createFormData } from "@/shared/utils/createFormData";
import { ROUTES } from "@/app/router/paths";
import type { ApplicationFormState } from "./types/careers.type";
import type { JobOpening } from "./api/careersresponse";
import { HOW_WE_HIRE_STEPS, QUALIFICATION_RANGE_OPTIONS, SALARY_RANGE_OPTIONS, STEPS } from "./constants/careers.constant";
import { ApplicationFormService } from "./service/careers.service";

export default function Careers() {
  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [deptFilter, setDeptFilter] = useState("all");
  const [locFilter, setLocFilter] = useState("all");

  // Stepper state
  const [currentStep, setCurrentStep] = useState(0);
  const [jobOpeningMasterId, setJobOpeningMasterId] = useState("0");
  const [apiError, setApiError] = useState("");

  // Form states matching reference fields
  const [formData, setFormData] = useState<ApplicationFormState>({
    position: "",
    referredBy: "",
    fullName: "",
    address: "",
    mobile: "",
    email: "",
    qualification: "",
    university: "",
    graduationYear: "",
    percentage: "",
    company: "",
    currentRole: "",
    experience: "",
    skills: "",
    reasonForChange: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
  });

  // File states
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  // Honeypot & status
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch job openings from backend API dynamically
  useEffect(() => {
    let isMounted = true;
    async function loadJobListing() {
      try {
        setIsLoadingJobs(true);

        const response = await ApplicationFormService.apiCallFetchJobListing({
          pageNumber: 1,
          pageSize: 50,
        });
        const data = response?.Data;

        if (isMounted && Array.isArray(data)) {
          setOpenings(data);
        }
      } catch (err) {
        console.error("Failed to load job listing from /Career/JobOpenings:", err);
      } finally {
        if (isMounted) setIsLoadingJobs(false);
      }
    }

    loadJobListing();
    return () => {
      isMounted = false;
    };
  }, []);

  const departments = useMemo(() => {
    const set = new Set<string>();
    openings.forEach((j) => {
      if (j.DepartmentName) set.add(j.DepartmentName);
    });
    return ["all", ...Array.from(set)];
  }, [openings]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    openings.forEach((j) => {
      if (j.WorkLocation) set.add(j.WorkLocation);
    });
    return ["all", ...Array.from(set)];
  }, [openings]);

  const filteredOpenings = useMemo(() => {
    return openings.filter((job) => {
      const matchDept = deptFilter === "all" || job.DepartmentName === deptFilter;
      const matchLoc = locFilter === "all" || job.WorkLocation === locFilter;
      return matchDept && matchLoc;
    });
  }, [openings, deptFilter, locFilter]);

  useReveal([filteredOpenings.length, currentStep, isLoadingJobs]);

  function handleApplyClick(masterId: number) {
    const matched = openings.find((j) => j.JobOpeningMasterId === masterId);
    setJobOpeningMasterId(matched ? String(matched.JobOpeningMasterId) : "0");
    setFormData((prev) => ({
      ...prev,
      position: matched ? `${matched.JobRoleName} · ${matched.WorkLocation}` : "",
    }));
    setApiError("");
    setCurrentStep(0);
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let formattedValue = value;
    if (name === "mobile") {
      formattedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "graduationYear") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    } else if (name === "noticePeriod") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    } else if (name === "experience") {
      formattedValue = value
        .replace(/[^\d.]/g, "")
        .replace(/(\..*)\./g, "$1")
        .replace(/^(\d{0,2})(\.\d{0,2})?.*$/, "$1$2");
    } else if (name === "percentage") {
      formattedValue = value
        .replace(/[^\d.]/g, "")
        .replace(/(\..*)\./g, "$1")
        .replace(/^(\d{0,3})(\.\d{0,2})?.*$/, "$1$2");
      if (formattedValue !== "" && Number(formattedValue) > 100) {
        formattedValue = "100";
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formattedValue,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size exceeds 5 MB. Please select a smaller file." }));
        return;
      }
      setResumeFile(file);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.resume;
        return next;
      });
    }
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, photo: "Image size exceeds 5 MB. Please select a smaller image." }));
        return;
      }
      setProfilePhoto(file);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.photo;
        return next;
      });
    }
  }

  function removePhoto() {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setProfilePhoto(null);
    setPhotoPreview("");
  }

  function removeResume() {
    setResumeFile(null);
  }

  function validateCurrentStep(): boolean {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!formData.position.trim()) {
        newErrors.position = "Position applied for is required.";
      }
      if (!resumeFile) {
        newErrors.resume = "Resume is required.";
      }
      if (!profilePhoto) {
        newErrors.photo = "Profile photo is required.";
      }
      if (!formData.referredBy.trim()) {
        newErrors.referredBy = "Source / referred by is required.";
      }
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required.";
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = "Full name must be at least 2 characters.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
        newErrors.email = "Enter a valid email address.";
      }
      const cleanMobile = formData.mobile.replace(/\D/g, "");
      if (!cleanMobile) {
        newErrors.mobile = "Mobile number is required.";
      } else if (cleanMobile.length < 10) {
        newErrors.mobile = "Mobile number must be 10 digits.";
      } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
        newErrors.mobile = "Enter a valid mobile number.";
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required.";
      }
    } else if (currentStep === 1) {
      if (!formData.qualification.trim()) {
        newErrors.qualification = "Qualification is required.";
      }
      if (!formData.university.trim()) {
        newErrors.university = "University is required.";
      }
      const cleanYear = formData.graduationYear.replace(/\D/g, "");
      if (!cleanYear || cleanYear.length < 4) {
        newErrors.graduationYear = "Enter a valid 4-digit graduation year.";
      } else {
        const year = Number(cleanYear);
        const currentYear = new Date().getFullYear();
        if (year < 1970 || year > currentYear + 1) {
          newErrors.graduationYear = `Graduation year must be between 1970 and ${currentYear + 1}.`;
        }
      }
      if (!formData.percentage.trim()) {
        newErrors.percentage = "Percentage / CGPA is required.";
      } else {
        const num = Number(formData.percentage);
        if (isNaN(num)) {
          newErrors.percentage = "Percentage / CGPA is required.";
        } else if (num <= 0 || num > 100) {
          newErrors.percentage = "Percentage must be between 0 and 100.";
        } else if (formData.percentage.includes(".") && formData.percentage.split(".")[1].length > 2) {
          newErrors.percentage = "Maximum 2 decimal places are allowed.";
        }
      }
    } else if (currentStep === 2) {
      if (!formData.company.trim()) {
        newErrors.company = "Company name is required.";
      }
      if (!formData.currentRole.trim()) {
        newErrors.currentRole = "Role is required.";
      }
      if (!formData.experience.trim()) {
        newErrors.experience = "Experience is required.";
      } else {
        const exp = Number(formData.experience);
        if (isNaN(exp)) {
          newErrors.experience = "Enter a valid experience.";
        } else if (exp < 0 || exp > 60) {
          newErrors.experience = "Experience must be between 0 and 60 years.";
        } else if (formData.experience.includes(".") && formData.experience.split(".")[1].length > 2) {
          newErrors.experience = "Only two decimal places are allowed.";
        }
      }
      if (!formData.reasonForChange.trim()) {
        newErrors.reasonForChange = "Reason for change is required.";
      }
      if (!formData.skills.trim()) {
        newErrors.skills = "Skills are required.";
      }
    } else if (currentStep === 3) {
      if (!formData.currentSalary.trim()) {
        newErrors.currentSalary = "Current salary is required.";
      }
      if (!formData.expectedSalary.trim()) {
        newErrors.expectedSalary = "Expected salary is required.";
      }
      if (!formData.noticePeriod.trim()) {
        newErrors.noticePeriod = "Notice period is required.";
      } else {
        const days = Number(formData.noticePeriod);
        if (isNaN(days)) {
          newErrors.noticePeriod = "Enter a valid notice period.";
        } else if (days < 0 || days > 365) {
          newErrors.noticePeriod = "Notice period must be between 0 and 365 days.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function scrollToFirstError() {
    setTimeout(() => {
      const firstEl = document.querySelector<HTMLElement>(".has-error, .field-error");
      if (firstEl) {
        firstEl.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof firstEl.focus === "function") {
          firstEl.focus();
        }
      }
    }, 60);
  }

  function handleNextStep() {
    const isValid = validateCurrentStep();
    if (!isValid) {
      scrollToFirstError();
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handlePreviousStep() {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    const isValid = validateCurrentStep();
    if (!isValid) {
      scrollToFirstError();
      return;
    }

    try {
      setIsSubmitting(true);
      setApiError("");

      const request: FormData = createFormData({
        CareerId: "0",
        UniqueKey: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        JobOpeningMasterId: jobOpeningMasterId || "0",
        ResumeUrl: resumeFile,
        Photograph: profilePhoto,
        SourceId: formData.referredBy,
        FullName: formData.fullName,
        Address: formData.address,
        MobileNo: formData.mobile,
        Email: formData.email,
        HighestQualification: formData.qualification,
        UniversityInstitution: formData.university,
        GraduationYear: formData.graduationYear,
        PercentageCgpa: formData.percentage,
        CurrentCompany: formData.company,
        CurrentRole: formData.currentRole,
        YearsOfExperience: formData.experience,
        ReasonForChange: formData.reasonForChange,
        Skills: formData.skills,
        CurrentSalary: formData.currentSalary,
        ExpectedSalary: formData.expectedSalary,
        NoticePeriod: formData.noticePeriod,
      });

      const response =
        await ApplicationFormService.apiCallApplicationSubmit(request);
      if (response && response.IsSuccess) {
        setSubmitSuccess(true);
        handleReset();
        setCurrentStep(0)
      } else {
        const errorMsg =
          response?.ErrorMessage && response.ErrorMessage.length > 0
            ? response.ErrorMessage.join(", ")
            : "Something went wrong while submitting your application. Please check your details and try again.";
        setApiError(errorMsg);
      }
    } catch (err: any) {
      setApiError(
        err?.message || "Failed to submit application. Please check your network connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData({
      position: "",
      referredBy: "",
      fullName: "",
      address: "",
      mobile: "",
      email: "",
      qualification: "",
      university: "",
      graduationYear: "",
      percentage: "",
      company: "",
      currentRole: "",
      experience: "",
      skills: "",
      reasonForChange: "",
      currentSalary: "",
      expectedSalary: "",
      noticePeriod: "",
    });
    removePhoto();
    removeResume();
    setJobOpeningMasterId("0");
    setApiError("");
    setCurrentStep(0);
    setSubmitSuccess(false);
    setErrors({});
  }

  const progressPercent = Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to={`/${ROUTES.HOMEPAGE}`}>Home</Link> / Careers
          </nav>
          <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
            Careers
          </span>
          <h1 className="reveal" style={{ ["--d" as string]: "120ms" }}>
            Build what Mumbai remembers.
          </h1>
          <p className="lead reveal" style={{ ["--d" as string]: "240ms" }}>
            Join a team that plans carefully, builds with integrity, and delivers on its promises.
          </p>
          <div className="reveal" style={{ marginTop: "2rem", ["--d" as string]: "360ms" }}>
            <a
              className="btn"
              href="#openings"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View open roles
            </a>
          </div>
        </div>
      </section>

      {/* How we hire */}
      <section className="section section--tint" aria-labelledby="hire-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
              How we hire
            </span>
            <h2 id="hire-title" className="reveal" style={{ ["--d" as string]: "120ms" }}>
              Four steps, no surprises.
            </h2>
          </div>
          <ol className="steps">
            {HOW_WE_HIRE_STEPS.map((s) => (
              <li key={s.stepNo} className="reveal" style={{ ["--d" as string]: `${s.delay}ms` }}>
                <span className="step-no">{s.stepNo}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Openings */}
      <section className="section" id="openings" aria-labelledby="openings-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
              Open roles
            </span>
            <h2 id="openings-title" className="reveal" style={{ ["--d" as string]: "120ms" }}>
              Current openings
            </h2>
          </div>

          <div className="filters filters--compact" aria-label="Filter openings">
            <div className="field">
              <label htmlFor="c-dept">Department</label>
              <select
                id="c-dept"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "all" ? "All departments" : dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="c-loc">Location</label>
              <select
                id="c-loc"
                value={locFilter}
                onChange={(e) => setLocFilter(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "All locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="job-list" aria-live="polite">
            {filteredOpenings.length === 0 ? (
              <p className="empty">No roles match the selected filters.</p>
            ) : (
              filteredOpenings.map((job, idx) => (
                <article
                  key={job.JobOpeningMasterId}
                  className="job-card reveal"
                  style={{ ["--d" as string]: `${idx * 120}ms` }}
                >
                  <div className="job-main">
                    <div className="job-tags">
                      <span>{job.DepartmentName}</span>
                      <span>{job.WorkLocation}</span>
                      <span>{job.EmploymentType}</span>
                    </div>
                    <h3>{job.JobRoleName}</h3>
                    <p>{job.JobDescription}</p>
                    <p className="job-meta">Experience: {job.ExperienceYears} years</p>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleApplyClick(job.JobOpeningMasterId)}
                  >
                    Apply for this role
                  </button>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application form with Stepper */}
      <section className="section section--tint" id="apply" aria-labelledby="apply-title">
        <div className="container apply-grid">
          <div className="apply-intro reveal from-left" style={{ ["--d" as string]: "0ms" }}>
            <span className="eyebrow">Apply</span>
            <h2 id="apply-title">Tell us about yourself.</h2>
            <p className="lead" style={{ marginBottom: "1.5rem" }}>
              Complete the {STEPS.length}-step form and attach your documents. Fields marked * are required.
            </p>
            <ul className="apply-tips">
              <li>Upload resume in PDF, DOC or DOCX (max 5 MB).</li>
              <li>Upload a clear professional profile photo.</li>
              <li>Provide accurate educational & salary details.</li>
              <li>We reply to every completed application.</li>
            </ul>

            <div className="step-summary-box">
              <strong>Application Step {currentStep + 1} of {STEPS.length}</strong>
              <p>{STEPS[currentStep]}</p>
            </div>
          </div>

          <div className="card-form reveal from-right" style={{ ["--d" as string]: "120ms" }}>
            {/* Honeypot: hidden from people, bots fill it in */}
            <input
              className="hp"
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Stepper Progress Bar & Tabs */}
            <div className="stepper-header">
              <div className="stepper-progress-track">
                <div
                  className="stepper-progress-bar"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="stepper-steps">
                {STEPS.map((step, idx) => {
                  const isActive = currentStep === idx;
                  const isDone = currentStep > idx;
                  return (
                    <button
                      key={step}
                      type="button"
                      className={`step-tab ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                      onClick={() => {
                        // Allow clicking to previously completed steps
                        if (isDone) {
                          setErrors({});
                          setCurrentStep(idx);
                        }
                      }}
                      title={step}
                    >
                      <span className="step-num">0{idx + 1}</span>
                      <span className="step-label">{step}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {submitSuccess ? (
              <div className="form-success-card">
                <div className="success-icon">&#10003;</div>
                <h3>Application Submitted!</h3>
                <p>
                  Thank you, <strong>{formData.fullName}</strong>. Your application for{" "}
                  <strong>{formData.position.split(" · ")[0] || formData.position || "the role"}</strong> has been submitted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* STEP 0: Personal Details & Uploads */}
                {currentStep === 0 && (
                  <div className="step-pane">
                    <div className="form-section">
                      <h3>Documents Upload</h3>
                      <div className="form-grid">
                        {/* Resume upload */}
                        <div className="field">
                          <label htmlFor="a-resume">Resume (PDF, DOC, DOCX) *</label>
                          <label className={`file-drop ${errors.resume ? "has-error" : ""}`} htmlFor="a-resume">
                            <span className="file-drop-text">
                              {resumeFile
                                ? `${resumeFile.name} (${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)`
                                : "Choose a PDF, DOC or DOCX file (max 5 MB)"}
                            </span>
                            <input
                              id="a-resume"
                              name="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeChange}
                            />
                          </label>
                          {resumeFile && (
                            <button
                              type="button"
                              className="file-remove-btn"
                              onClick={removeResume}
                            >
                              &times; Remove Resume
                            </button>
                          )}
                          {errors.resume && <span className="field-error">{errors.resume}</span>}
                        </div>

                        {/* Profile Photo upload */}
                        <div className="field">
                          <label htmlFor="a-photo">Profile Photo (JPG, PNG, WEBP) *</label>
                          <label className={`file-drop ${errors.photo ? "has-error" : ""}`} htmlFor="a-photo">
                            {photoPreview ? (
                              <div className="photo-preview-wrap">
                                <img src={photoPreview} alt="Preview" className="photo-thumb" />
                                <span className="file-drop-text">
                                  {profilePhoto?.name} ({(profilePhoto ? profilePhoto.size / (1024 * 1024) : 0).toFixed(2)} MB)
                                </span>
                              </div>
                            ) : (
                              <span className="file-drop-text">
                                Choose professional photo (max 5 MB)
                              </span>
                            )}
                            <input
                              id="a-photo"
                              name="photo"
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoChange}
                            />
                          </label>
                          {profilePhoto && (
                            <button
                              type="button"
                              className="file-remove-btn"
                              onClick={removePhoto}
                            >
                              &times; Remove Photo
                            </button>
                          )}
                          {errors.photo && <span className="field-error">{errors.photo}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Position & Referral</h3>
                      <div className="form-grid">
                        <div className="field">
                          <label htmlFor="a-position">Position Applied For *</label>
                          <select
                            id="a-position"
                            name="position"
                            className={errors.position ? "has-error" : ""}
                            value={formData.position}
                            onChange={(e) => {
                              const val = e.target.value;
                              const matched = openings.find(
                                (j) =>
                                  `${j.JobRoleName} · ${j.WorkLocation}` === val ||
                                  j.JobRoleName === val ||
                                  String(j.JobOpeningMasterId) === val
                              );
                              setJobOpeningMasterId(
                                matched ? String(matched.JobOpeningMasterId) : "0"
                              );
                              handleFieldChange(e);
                            }}
                            required
                          >
                            <option value="">Select a position</option>
                            {openings.map((job) => (
                              <option
                                key={job.JobOpeningMasterId}
                                value={`${job.JobRoleName} · ${job.WorkLocation}`}
                              >
                                {job.JobRoleName} · {job.WorkLocation}
                              </option>
                            ))}
                          </select>
                          {errors.position && <span className="field-error">{errors.position}</span>}
                        </div>

                        <div className="field">
                          <label htmlFor="a-referredBy">Sourced Through / Referred By *</label>
                          <input
                            id="a-referredBy"
                            name="referredBy"
                            type="text"
                            className={errors.referredBy ? "has-error" : ""}
                            placeholder="e.g. LinkedIn, Referral, Walk-in, Job Portal"
                            value={formData.referredBy}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.referredBy && <span className="field-error">{errors.referredBy}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Personal Details</h3>
                      <div className="form-grid">
                        <div className="field">
                          <label htmlFor="a-fullName">Full Name *</label>
                          <input
                            id="a-fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            className={errors.fullName ? "has-error" : ""}
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                        </div>

                        <div className="field">
                          <label htmlFor="a-email">Email Address *</label>
                          <input
                            id="a-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={errors.email ? "has-error" : ""}
                            placeholder="you@domain.com"
                            value={formData.email}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        <div className="field">
                          <label htmlFor="a-mobile">Mobile No. *</label>
                          <input
                            id="a-mobile"
                            name="mobile"
                            type="tel"
                            autoComplete="tel"
                            className={errors.mobile ? "has-error" : ""}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            value={formData.mobile}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                        </div>

                        <div className="field">
                          <label htmlFor="a-address">Current City / Residential Address *</label>
                          <input
                            id="a-address"
                            name="address"
                            type="text"
                            autoComplete="address-level2"
                            className={errors.address ? "has-error" : ""}
                            placeholder="e.g. Borivali East, Mumbai"
                            value={formData.address}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.address && <span className="field-error">{errors.address}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: Educational Qualification */}
                {currentStep === 1 && (
                  <div className="step-pane">
                    <div className="form-section">
                      <h3>Highest Educational Qualification</h3>
                      <div className="form-grid">
                        <div className="field">
                          <label htmlFor="a-qualification">Highest Qualification *</label>
                          <select
                            id="a-qualification"
                            name="qualification"
                            className={errors.qualification ? "has-error" : ""}
                            value={formData.qualification}
                            onChange={handleFieldChange}
                            required
                          >
                            <option value="">Select Highest Qualification</option>
                            {QUALIFICATION_RANGE_OPTIONS.map((q) => (
                              <option key={q.value} value={q.value}>
                                {q.label}
                              </option>
                            ))}
                          </select>
                          {errors.qualification && (
                            <span className="field-error">{errors.qualification}</span>
                          )}
                        </div>

                        <div className="field">
                          <label htmlFor="a-university">University / Institution *</label>
                          <input
                            id="a-university"
                            name="university"
                            type="text"
                            className={errors.university ? "has-error" : ""}
                            placeholder="Enter University or Institution name"
                            value={formData.university}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.university && <span className="field-error">{errors.university}</span>}
                        </div>

                        <div className="field">
                          <label htmlFor="a-graduationYear">Passing / Graduation Year *</label>
                          <input
                            id="a-graduationYear"
                            name="graduationYear"
                            type="text"
                            className={errors.graduationYear ? "has-error" : ""}
                            placeholder="e.g. 2024"
                            maxLength={4}
                            value={formData.graduationYear}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.graduationYear && (
                            <span className="field-error">{errors.graduationYear}</span>
                          )}
                        </div>

                        <div className="field">
                          <label htmlFor="a-percentage">Percentage / CGPA *</label>
                          <input
                            id="a-percentage"
                            name="percentage"
                            type="text"
                            className={errors.percentage ? "has-error" : ""}
                            placeholder="e.g. 8.4 CGPA or 78%"
                            value={formData.percentage}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.percentage && <span className="field-error">{errors.percentage}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Professional Experience */}
                {currentStep === 2 && (
                  <div className="step-pane">
                    <div className="form-section">
                      <h3>Employment Details</h3>
                      <div className="form-grid">
                        <div className="field">
                          <label htmlFor="a-company">Current / Last Company *</label>
                          <input
                            id="a-company"
                            name="company"
                            type="text"
                            className={errors.company ? "has-error" : ""}
                            placeholder="e.g. ABC Developers Ltd"
                            value={formData.company}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.company && <span className="field-error">{errors.company}</span>}
                        </div>

                        <div className="field">
                          <label htmlFor="a-currentRole">Current Role / Designation *</label>
                          <input
                            id="a-currentRole"
                            name="currentRole"
                            type="text"
                            className={errors.currentRole ? "has-error" : ""}
                            placeholder="e.g. Senior Site Engineer"
                            value={formData.currentRole}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.currentRole && (
                            <span className="field-error">{errors.currentRole}</span>
                          )}
                        </div>

                        <div className="field">
                          <label htmlFor="a-experience">Years Of Experience *</label>
                          <input
                            id="a-experience"
                            name="experience"
                            type="text"
                            className={errors.experience ? "has-error" : ""}
                            placeholder="Enter Years Of Experience (e.g. 2 or 3.5)"
                            value={formData.experience}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.experience && <span className="field-error">{errors.experience}</span>}
                        </div>

                        <div className="field">
                          <label htmlFor="a-reasonForChange">Reason For Change *</label>
                          <input
                            id="a-reasonForChange"
                            name="reasonForChange"
                            type="text"
                            className={errors.reasonForChange ? "has-error" : ""}
                            placeholder="e.g. Career growth and new challenge"
                            value={formData.reasonForChange}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.reasonForChange && (
                            <span className="field-error">{errors.reasonForChange}</span>
                          )}
                        </div>

                        <div className="field full">
                          <label htmlFor="a-skills">Key Skills &amp; Domain Expertise *</label>
                          <input
                            id="a-skills"
                            name="skills"
                            type="text"
                            className={errors.skills ? "has-error" : ""}
                            placeholder="e.g. AutoCAD, Site Supervision, Quality Control, Client Management"
                            value={formData.skills}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.skills && <span className="field-error">{errors.skills}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Salary & Final */}
                {currentStep === 3 && (
                  <div className="step-pane">
                    <div className="form-section">
                      <h3>Compensation &amp; Notice</h3>
                      <div className="form-grid">
                        <div className="field">
                          <label htmlFor="a-currentSalary">Current CTC *</label>
                          <select
                            id="a-currentSalary"
                            name="currentSalary"
                            className={errors.currentSalary ? "has-error" : ""}
                            value={formData.currentSalary}
                            onChange={handleFieldChange}
                            required
                          >
                            <option value="">Select Current CTC</option>
                            {SALARY_RANGE_OPTIONS.map((sal) => (
                              <option key={sal.value} value={sal.value}>
                                {sal.label}
                              </option>
                            ))}
                          </select>
                          {errors.currentSalary && (
                            <span className="field-error">{errors.currentSalary}</span>
                          )}
                        </div>

                        <div className="field">
                          <label htmlFor="a-expectedSalary">Expected CTC *</label>
                          <select
                            id="a-expectedSalary"
                            name="expectedSalary"
                            className={errors.expectedSalary ? "has-error" : ""}
                            value={formData.expectedSalary}
                            onChange={handleFieldChange}
                            required
                          >
                            <option value="">Select Expected CTC</option>
                            {SALARY_RANGE_OPTIONS.map((sal) => (
                              <option key={sal.value} value={sal.value}>
                                {sal.label}
                              </option>
                            ))}
                          </select>
                          {errors.expectedSalary && (
                            <span className="field-error">{errors.expectedSalary}</span>
                          )}
                        </div>

                        <div className="field">
                          <label htmlFor="a-noticePeriod">Notice Period (in days) *</label>
                          <input
                            id="a-noticePeriod"
                            name="noticePeriod"
                            type="text"
                            className={errors.noticePeriod ? "has-error" : ""}
                            placeholder="Enter Notice Period in days (e.g. 30)"
                            value={formData.noticePeriod}
                            onChange={handleFieldChange}
                            required
                          />
                          {errors.noticePeriod && (
                            <span className="field-error">{errors.noticePeriod}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Navigation Actions */}
                <div className="stepper-actions">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={handlePreviousStep}
                    >
                      &larr; Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  <div>
                    {currentStep < STEPS.length - 1 ? (
                      <button
                        type="button"
                        className="btn"
                        onClick={handleNextStep}
                      >
                        Save &amp; Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting Application..." : "Submit Application"}
                      </button>
                    )}
                  </div>
                </div>

                {apiError && (
                  <div
                    className="form-msg err"
                    style={{ display: "block", marginTop: "1.25rem", textAlign: "center" }}
                    role="alert"
                  >
                    {apiError}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
