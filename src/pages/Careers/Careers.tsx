import { CONFIG } from "@/app/config/config";
import { useReveal } from "../../shared/hooks/useReveal";
import { CAREERS } from "./data/careers";


export default function Careers() {
  useReveal([]);
  return (
    <>
      <section className="hero" style={{ minHeight: "auto" }}>
        <div className="container hero-inner" style={{ padding: "100px 0 40px" }}>
          <h1 className="reveal" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            Careers
          </h1>
          <p className="lead reveal">Open roles are listed below. Apply directly by email.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "40px" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          {CAREERS.length === 0 ? (
            <p className="empty reveal" style={{ padding: "2rem 0", textAlign: "left" }}>
              No open positions right now. Send your CV to{" "}
              <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> and we will keep it on file.
            </p>
          ) : (
            CAREERS.map((j) => (
              <div key={j.title} className="job reveal">
                <div>
                  <h3 style={{ margin: 0 }}>{j.title}</h3>
                  <p>
                    {j.location} · {j.type}
                    {j.summary ? ` — ${j.summary}` : ""}
                  </p>
                </div>
                <a className="btn btn--small" href={`mailto:${j.applyEmail ?? CONFIG.email}?subject=${encodeURIComponent("Application: " + j.title)}`}>
                  Apply by email
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
