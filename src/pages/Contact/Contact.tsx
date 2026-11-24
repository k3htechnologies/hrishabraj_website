import { CONFIG } from "@/app/config/config";
import { PROJECTS } from "@/shared/data/projects";
import { useReveal } from "@/shared/hooks/useReveal";
import { Link, useSearchParams } from "react-router-dom";
import EnquiryForm from "../../shared/components/EnquiryForm";


export default function Contact() {
  const [params] = useSearchParams();
  const project = PROJECTS.find((p) => p.id === params.get("project"));
  useReveal([]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / Contact
          </nav>
          <span className="eyebrow reveal">Get in touch</span>
          <h1 className="reveal">We would love to hear from you</h1>
          <p className="lead reveal">Send an enquiry, book a site visit, or call our team directly.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="info-item reveal from-left">
              <strong>Email</strong>
              <p>
                <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
              </p>
            </div>
            <div className="info-item reveal from-left">
              <strong>Phone</strong>
              <p>
                <a href={`tel:${CONFIG.phoneTel}`}>{CONFIG.phone}</a>
              </p>
            </div>
            <div className="info-item reveal from-left">
              <strong>Head office</strong>
              <p>{CONFIG.address}</p>
            </div>
            <div className="info-item reveal from-left">
              <strong>WhatsApp</strong>
              <p>
                <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noopener">
                  Message us on WhatsApp
                </a>
              </p>
            </div>
            {CONFIG.mapEmbedSrc ? (
              <iframe className="map-frame reveal" src={CONFIG.mapEmbedSrc} loading="lazy" title="Office location on map" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="map-placeholder reveal" role="img" aria-label="Map placeholder">
                Map: add an embed URL in src/config.ts
              </div>
            )}
          </div>

          <div className="contact-card reveal from-right">
            <h2 style={{ fontSize: "1.5rem" }}>Send an enquiry</h2>
            <EnquiryForm
              source="contact"
              defaultSubject={project ? `Enquiry: ${project.name}` : ""}
              projectId={project?.id}
            />
          </div>
        </div>
      </section>
    </>
  );
}
