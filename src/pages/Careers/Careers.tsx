import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../../shared/hooks/useReveal";

interface JobOpening {
  id: string;
  title: string;
  department: "Sales" | "Projects" | "Marketing";
  location: "Borivali East" | "Dahisar East";
  type: "Full time";
  experience: string;
  description: string;
  delay: number;
}

interface Step {
  stepNo: string;
  title: string;
  description: string;
  delay: number;
}

const STEPS: Step[] = [
  { stepNo: "01", title: "Apply", description: "Choose a role and send your resume and a short note.", delay: 0 },
  { stepNo: "02", title: "Screen", description: "We review your application and call you within 5 working days.", delay: 120 },
  { stepNo: "03", title: "Interview", description: "A conversation with the team, and a short task where relevant.", delay: 240 },
  { stepNo: "04", title: "Offer", description: "We confirm the role, terms and joining date in writing.", delay: 360 },
];

const OPENINGS: JobOpening[] = [
  {
    id: "sales-executive",
    title: "Sales Executive",
    department: "Sales",
    location: "Borivali East",
    type: "Full time",
    experience: "1-3 years",
    description: "Lead site visits and enquiries for residential projects. Build long-term relationships with families and partners.",
    delay: 0,
  },
  {
    id: "site-engineer",
    title: "Site Engineer",
    department: "Projects",
    location: "Dahisar East",
    type: "Full time",
    experience: "2-5 years",
    description: "Supervise on-site execution, quality checks and schedule tracking for redevelopment projects.",
    delay: 120,
  },
  {
    id: "marketing-associate",
    title: "Marketing Associate",
    department: "Marketing",
    location: "Borivali East",
    type: "Full time",
    experience: "0-2 years",
    description: "Plan digital campaigns, manage the website and social channels, and coordinate project launches.",
    delay: 240,
  },
];

export default function Careers() {
  const [deptFilter, setDeptFilter] = useState("all");
  const [locFilter, setLocFilter] = useState("all");

  // Form states
  const [selectedRole, setSelectedRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [notice, setNotice] = useState("");
  const [employer, setEmployer] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [fileName, setFileName] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const filteredOpenings = useMemo(() => {
    return OPENINGS.filter((job) => {
      const matchDept = deptFilter === "all" || job.department === deptFilter;
      const matchLoc = locFilter === "all" || job.location === locFilter;
      return matchDept && matchLoc;
    });
  }, [deptFilter, locFilter]);

  useReveal([filteredOpenings.length]);

  function handleApplyClick(jobId: string) {
    setSelectedRole(jobId);
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormStatus("error");
        setStatusMsg("File size exceeds 5 MB. Please choose a smaller file.");
        setFileName("");
        return;
      }
      setFileName(`${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
      setFormStatus("idle");
    } else {
      setFileName("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (!selectedRole || !fullName || !email || !phone || !experience || !notice || !consent) {
      setFormStatus("error");
      setStatusMsg("Please fill in all required fields and accept the privacy policy.");
      return;
    }

    // Simulate successful submission
    setFormStatus("success");
    setStatusMsg("Thank you! Your application has been submitted successfully. Our team will get back to you within 5 working days.");

    // Reset form
    setSelectedRole("");
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setExperience("");
    setNotice("");
    setEmployer("");
    setLinkedin("");
    setPortfolio("");
    setFileName("");
    setNote("");
    setConsent(false);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / Careers
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
            {STEPS.map((s) => (
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
                <option value="all">All departments</option>
                <option value="Marketing">Marketing</option>
                <option value="Projects">Projects</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="c-loc">Location</label>
              <select
                id="c-loc"
                value={locFilter}
                onChange={(e) => setLocFilter(e.target.value)}
              >
                <option value="all">All locations</option>
                <option value="Borivali East">Borivali East</option>
                <option value="Dahisar East">Dahisar East</option>
              </select>
            </div>
          </div>

          <div className="job-list" aria-live="polite">
            {filteredOpenings.length === 0 ? (
              <p className="empty">No roles match the selected filters.</p>
            ) : (
              filteredOpenings.map((job) => (
                <article
                  key={job.id}
                  className="job-card reveal"
                  style={{ ["--d" as string]: `${job.delay}ms` }}
                >
                  <div className="job-main">
                    <div className="job-tags">
                      <span>{job.department}</span>
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                    </div>
                    <h3>
                      {job.title} <em className="sample-tag">SAMPLE ROLE</em>
                    </h3>
                    <p>{job.description}</p>
                    <p className="job-meta">Experience: {job.experience}</p>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleApplyClick(job.id)}
                  >
                    Apply for this role &rarr;
                  </button>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="section section--tint" id="apply" aria-labelledby="apply-title">
        <div className="container apply-grid">
          <div className="reveal from-left" style={{ ["--d" as string]: "0ms" }}>
            <span className="eyebrow reveal" style={{ ["--d" as string]: "0ms" }}>
              Apply
            </span>
            <h2 id="apply-title" className="reveal" style={{ ["--d" as string]: "120ms" }}>
              Tell us about yourself.
            </h2>
            <p className="lead reveal" style={{ marginBottom: "1.5rem", ["--d" as string]: "240ms" }}>
              Complete the form and attach your resume. Fields marked * are required.
            </p>
            <ul className="apply-tips">
              <li>Resume in PDF, DOC or DOCX, up to 5 MB.</li>
              <li>Add a portfolio or LinkedIn link if relevant.</li>
              <li>We reply to every application.</li>
            </ul>
          </div>

          <form
            className="card-form reveal from-right"
            onSubmit={handleSubmit}
            style={{ ["--d" as string]: "120ms" }}
          >
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

            <div className="form-section">
              <h3>Role</h3>
              <div className="field full">
                <label htmlFor="job-select">Position *</label>
                <select
                  id="job-select"
                  name="position"
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Select a position</option>
                  <option value="sales-executive">Sales Executive · Borivali East</option>
                  <option value="site-engineer">Site Engineer · Dahisar East</option>
                  <option value="marketing-associate">Marketing Associate · Borivali East</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>Your details</h3>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="a-name">Full name *</label>
                  <input
                    id="a-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="a-email">Email *</label>
                  <input
                    id="a-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="a-phone">Mobile *</label>
                  <input
                    id="a-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="a-city">Current city</label>
                  <input
                    id="a-city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="e.g. Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Experience</h3>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="a-exp">Years of experience *</label>
                  <select
                    id="a-exp"
                    name="experience"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="0 to 1 years">0 to 1 years</option>
                    <option value="1 to 3 years">1 to 3 years</option>
                    <option value="3 to 5 years">3 to 5 years</option>
                    <option value="5 to 10 years">5 to 10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="a-notice">Notice period *</label>
                  <select
                    id="a-notice"
                    name="notice"
                    required
                    value={notice}
                    onChange={(e) => setNotice(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Immediate">Immediate</option>
                    <option value="15 days">15 days</option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                    <option value="90 days">90 days</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="a-employer">Current employer and role</label>
                  <input
                    id="a-employer"
                    name="employer"
                    type="text"
                    placeholder="e.g. ABC Developers, Sales Manager"
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="a-linkedin">LinkedIn URL</label>
                  <input
                    id="a-linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="a-portfolio">Portfolio or website</label>
                  <input
                    id="a-portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Resume and note</h3>
              <div className="field full">
                <label htmlFor="a-resume">Resume *</label>
                <label className="file-drop" htmlFor="a-resume">
                  <span className="file-drop-text">
                    {fileName || "Choose a PDF, DOC or DOCX file (max 5 MB)"}
                  </span>
                  <input
                    id="a-resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="field full">
                <label htmlFor="a-note">Cover note</label>
                <textarea
                  id="a-note"
                  name="note"
                  maxLength={600}
                  placeholder="Why this role, and what you would bring to it?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <span className="char-count">{note.length} / 600</span>
              </div>
            </div>

            <div className="form-section">
              <label className="consent">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  I agree that H. Rishabraj may store and use my details and resume to consider my application. I can ask for them to be deleted at any time. See our{" "}
                  <Link to="/legal#privacy">privacy policy</Link>.
                </span>
              </label>
            </div>

            <button className="btn" type="submit">
              Submit application
            </button>

            {formStatus !== "idle" && (
              <div className={`form-msg ${formStatus === "success" ? "ok" : "err"}`} role="status">
                {statusMsg}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
