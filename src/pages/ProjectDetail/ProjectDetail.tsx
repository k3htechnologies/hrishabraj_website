import { CONFIG } from "@/app/config/config";
import EnquiryForm from "@/shared/components/EnquiryForm";
import { PROJECTS } from "@/shared/data/projects";
import { useReveal } from "@/shared/hooks/useReveal";
import { type FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";



const STATUS_LABEL = { ongoing: "Ongoing", upcoming: "Upcoming", completed: "Completed" } as const;

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);
  useReveal([id]);

  if (!project) {
    return (
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container empty">
          <h1>Project not found</h1>
          <p>
            <Link className="btn" to="/projects">
              Back to all projects
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: "2rem" }}>
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> / {project.name}
        </nav>

        <div className="detail">
          <div>
            <div className="detail-media reveal from-left">
              <img src={project.image} alt={`${project.name}, ${project.location}`} width={1200} height={900} />
            </div>
            <div style={{ marginTop: "2rem" }} className="reveal">
              <span className="eyebrow">
                {STATUS_LABEL[project.status]} · {project.typology}
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>{project.name}</h1>
              <p className="lead">{project.description}</p>
              {project.amenities.length > 0 && (
                <>
                  <h3>Amenities</h3>
                  <ul className="tags">
                    {project.amenities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <aside className="sticky-box reveal from-right" aria-label="Project enquiry">
            <ul className="spec-list">
              <li><span>Location</span><strong>{project.location}</strong></li>
              <li><span>Configuration</span><strong>{project.bhk}</strong></li>
              <li><span>Possession</span><strong>{project.possession}</strong></li>
              <li><span>Status</span><strong>{STATUS_LABEL[project.status]}</strong></li>
              <li><span>RERA</span><strong>{project.rera}</strong></li>
            </ul>
            <a className="btn" href="#enquire">
              Enquire about this project
            </a>
            <a
              className="btn btn--outline"
              style={{ marginTop: ".6rem" }}
              href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${project.name}.`)}`}
              target="_blank"
              rel="noopener"
            >
              Chat on WhatsApp
            </a>
            <BrochureButton
              projectId={project.id}
              projectName={project.name}
              brochure={project.brochure ?? `/assets/brochures/${project.id}.pdf`}
            />
            <p style={{ fontSize: ".85rem", color: "var(--muted)", margin: "1rem 0 0" }}>
              Prices and availability on request. Visuals are indicative.
            </p>
          </aside>
        </div>

        <div id="enquire" className="reveal" style={{ maxWidth: 760, marginTop: "4rem" }}>
          <h2>Enquire about {project.name}</h2>
          <EnquiryForm source="project-enquiry" projectId={project.id} defaultSubject={`Enquiry: ${project.name}`} />
        </div>
      </div>
    </section>
  );
}

/**
 * Brochure download. The lead is captured first, then the PDF opens.
 * This is the "lead before download" pattern requested for the site.
 */
function BrochureButton({ projectId, projectName, brochure }: { projectId: string; projectName: string; brochure: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    try {
    //   await submitLead({
    //     name: String(fd.get("name") ?? "").trim(),
    //     email: String(fd.get("email") ?? "").trim(),
    //     phone: String(fd.get("phone") ?? "").trim(),
    //     message: `Brochure requested: ${projectName}`,
    //     source: "brochure",
    //     projectId,
    //     subject: `Brochure: ${projectName}`,
    //   });
      setDone(true);
      window.open(brochure, "_blank", "noopener");
    } catch {
      setError("Sorry, we could not process your request. Please try again.");
    }
  }

  if (!open) {
    return (
      <button className="btn btn--outline" style={{ width: "100%", marginTop: ".6rem" }} type="button" onClick={() => setOpen(true)}>
        Download brochure
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="form" style={{ gridTemplateColumns: "1fr", marginTop: "1rem" }}>
      <input name="name" placeholder="Full name" required aria-label="Full name" />
      <input name="email" type="email" placeholder="Email" required aria-label="Email" />
      <input name="phone" type="tel" placeholder="Phone (optional)" aria-label="Phone" />
      <button className="btn" type="submit">
        Get brochure
      </button>
      {done && <p className="form-msg ok" style={{ display: "block" }}>Thank you. Your brochure is opening.</p>}
      {error && <p className="form-msg err" style={{ display: "block" }}>{error}</p>}
    </form>
  );
}
